# 本地 AI 图片生成部署经验总结

> 项目：《编神纪》角色/场景图生成
> 记录时间：2026-03-23
> 硬件：NVIDIA GeForce RTX 5060 8GB

---

## 一、硬件环境

### 1.1 配置清单

| 组件 | 规格 |
|------|------|
| GPU | NVIDIA GeForce RTX 5060 |
| VRAM | 8GB |
| CUDA 架构 | sm_120 |
| 系统 | Windows 11 |
| Python | 3.13 |

### 1.2 关键发现：RTX 5060 的特殊性

**⚠️ 重要：RTX 5060 (sm_120) 不被 PyTorch Stable 支持！**

- PyTorch 2.6.0 + CUDA 12.4 → ❌ 报错：`CUDA error: no kernel image is available`
- **解决方案**：必须使用 PyTorch Nightly (cu128)

```bash
# 正确的安装命令
pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128 --upgrade
```

安装后验证：
```python
import torch
print(torch.__version__)  # 2.12.0.dev20260319+cu128
print(torch.cuda.is_available())  # True
```

---

## 二、模型选择

### 2.1 尝试过的方案

| 方案 | 结果 | 原因 |
|------|------|------|
| Fooocus | ❌ 失败 | Python 3.13 + scipy==1.14.0 编译失败，需要 Fortran 编译器 |
| Civitai 模型下载 | ❌ 失败 | 网络问题，大文件下载中断 |
| HuggingFace diffusers | ✅ 成功 | 使用本地缓存，无需重复下载 |

### 2.2 最终方案：SDXL Base + Diffusers

```python
from diffusers import StableDiffusionXLPipeline

pipe = StableDiffusionXLPipeline.from_pretrained(
    'stabilityai/stable-diffusion-xl-base-1.0',
    torch_dtype=torch.float16,
    variant='fp16',
    use_safetensors=True
)
pipe = pipe.to('cuda')
pipe.enable_attention_slicing(1)  # 显存优化
```

**模型特点：**
- 大小：约 6-7GB（FP16）
- 首次加载：需要 HuggingFace 登录/镜像
- 生成速度：RTX 5060 上约 27分钟/张（832x1216, 30 steps）

---

## 三、生成策略

### 3.1 并行 vs 串行

| 模式 | 结果 | 说明 |
|------|------|------|
| 并行生成 | ❌ OOM | 8GB VRAM 同时加载多个 pipeline 必爆 |
| 串行生成 | ✅ 成功 | 一次一张，显存可回收 |

**结论**：8GB VRAM 必须采用串行生成模式。

### 3.2 显存优化技巧

```python
# 1. 使用 FP16 精度
pipe = pipe.to('cuda', dtype=torch.float16)

# 2. 启用 attention slicing
pipe.enable_attention_slicing(1)

# 3. 及时清理缓存（串行模式下）
torch.cuda.empty_cache()
```

### 3.3 生成参数

```python
image = pipe(
    prompt=prompt,
    negative_prompt=negative,
    width=832,              # 竖图适合人物
    height=1216,
    num_inference_steps=30,  # 平衡质量和速度
    guidance_scale=7.0,
    generator=torch.Generator('cuda').manual_seed(42)  # 可复现
).images[0]
```

---

## 四、网络与下载

### 4.1 HuggingFace 镜像

国内访问建议使用镜像：

```python
import os
os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'
```

### 4.2 模型缓存位置

Windows: `C:\Users\<用户名>\.cache\huggingface\hub`

缓存结构：
```
hub/
├── models--stabilityai--stable-diffusion-xl-base-1.0/
│   ├── snapshots/
│   │   └── <hash>/
│   │       ├── unet/
│   │       ├── vae/
│   │       ├── text_encoder/
│   │       └── model_index.json
```

**提示**：模型一旦缓存，后续加载不需要网络。

---

## 五、Prompt 工程

### 5.1 角色图 Prompt 模板

```
masterpiece, best quality, 1girl/1boy, [角色特征],
[服装], [表情], [姿势],
[场景氛围],
anime style, highly detailed, portrait
```

### 5.2 场景图 Prompt 模板

```
masterpiece, best quality, [场景描述],
[光照], [氛围], [风格],
wide shot, landscape, highly detailed, concept art
```

### 5.3 通用负面 Prompt

```
low quality, worst quality, blurry, distorted,
deformed, bad anatomy, bad proportions,
extra limbs, missing fingers, watermark, signature
```

---

## 六、代码结构

### 6.1 核心生成脚本

```python
# generate_remaining.py 核心逻辑
import os
import torch
from diffusers import StableDiffusionXLPipeline
from pathlib import Path

os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'

OUTPUT_DIR = Path('outputs/bianshenji')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# 定义生成任务队列
tasks = [
    ('05_陆隐.png', 'prompt...'),
    ('06_碎页秘境.png', 'prompt...'),
    # ...
]

# 串行生成
for filename, prompt in tasks:
    output_path = OUTPUT_DIR / filename
    if output_path.exists():
        print(f"跳过已存在: {filename}")
        continue

    # 加载模型（首次）或复用
    # ...生成逻辑...

    image.save(output_path)
    print(f"完成: {filename}")
```

### 6.2 输出目录结构

```
outputs/
└── bianshenji/
    ├── 01_叶辰.png      (1.5MB)
    ├── 02_NULL.png      (1.7MB)
    ├── 03_苏沐橙.png    (1.5MB)
    ├── 04_凌幽.png      (1.5MB)
    └── ...
```

---

## 七、踩坑记录

### 7.1 ❌ PyTorch 版本不匹配

**现象**：`CUDA error: no kernel image is available for execution on the device`

**原因**：PyTorch Stable 不支持 RTX 5060 的 sm_120 架构

**解决**：安装 Nightly 版本

### 7.2 ❌ Fooocus 无法启动

**现象**：`scipy==1.14.0` 编译失败

**原因**：Python 3.13 缺少预编译的 scipy wheel

**解决**：改用 diffusers 库直接生成，放弃 Fooocus

### 7.3 ❌ 并行生成 OOM

**现象**：`RuntimeError: CUDA out of memory`

**原因**：8GB VRAM 无法同时运行多个 pipeline

**解决**：改为串行生成，及时释放显存

### 7.4 ❌ 模型下载中断

**现象**：大文件下载到一半 SSL 超时

**原因**：网络不稳定

**解决**：使用 HF 镜像，或预先通过其他方式下载模型到缓存目录

---

## 八、最佳实践

### 8.1 首次部署流程

1. **安装 PyTorch Nightly (cu128)**
   ```bash
   pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128
   ```

2. **安装 diffusers**
   ```bash
   pip install diffusers transformers accelerate
   ```

3. **设置 HF 镜像**（国内）
   ```bash
   set HF_ENDPOINT=https://hf-mirror.com
   ```

4. **首次运行**（会自动下载模型，约 6-7GB）
   ```python
   from diffusers import StableDiffusionXLPipeline
   pipe = StableDiffusionXLPipeline.from_pretrained(
       'stabilityai/stable-diffusion-xl-base-1.0',
       torch_dtype=torch.float16,
       variant='fp16'
   )
   ```

### 8.2 日常生成流程

1. 确保没有残留的 Python 进程占用显存
2. 运行生成脚本：`python generate_remaining.py`
3. 监控 GPU 使用率确认正常运行
4. 等待串行生成完成（每张约 27 分钟）

### 8.3 监控命令

```bash
# 查看 GPU 状态
nvidia-smi

# 查看文件生成进度
ls -lh outputs/bianshenji/

# 查看 Python 进程
ps aux | grep python
```

---

## 九、时间估算

| 任务 | 预估时间 |
|------|----------|
| 环境安装 | 10-20 分钟 |
| 模型首次下载 | 30-60 分钟（视网络） |
| 单张图片生成 | 25-30 分钟 |
| 9 张图片总计 | 约 4 小时 |

---

## 十、参考资源

- PyTorch Nightly: https://download.pytorch.org/whl/nightly/cu128
- HuggingFace Diffusers: https://github.com/huggingface/diffusers
- SDXL Model: https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0
- HF Mirror: https://hf-mirror.com

---

## 十一、总结

**8GB VRAM 本地 AI 生成是可行的，但需要：**

1. ✅ 使用 PyTorch Nightly (cu128) 支持新显卡
2. ✅ 采用串行生成避免 OOM
3. ✅ 使用 diffusers 而非 Fooocus 等 GUI 工具
4. ✅ 合理设置 HF 镜像加速下载
5. ✅ 耐心（每张 27 分钟）

**替代方案**：
- Google Colab Pro (A100/V100)
- 在线 API (Replicate, Stability AI)
- 租用 GPU 服务器 (AutoDL, Vast.ai)

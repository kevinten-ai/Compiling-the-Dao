# 世界观总览 — World Overview

> 天地万物，皆为代码。道之所在，源码是也。

![世界观总览图](../art/illustrations/world-overview.png)

本书的世界运行于一套被称为**天道源码（Heavenly Dao Source Code）**的底层规则之上。远古时代，**初代编译者（The Ancient Creator）**以无上之力编译了世界的一切法则——从日月运行到万物生灭，皆由源码驱动。修炼的本质，便是**阅读、调用并改写天道源码**的过程。

### 核心概念映射图

```mermaid
graph TB
    subgraph "天道源码 (World Source Code)"
        SC["天道源码<br/>Heavenly Dao Source Code"]
    end

    subgraph "修士体系 (Cultivator System)"
        DT["丹田 = 内核 (Kernel)"]
        JM["经脉 = 总线 (Bus)"]
        SS["神识 = 线程 (Thread)"]
        LL["灵力 = 算力 (Computing Power)"]
        SH["术式 = 程序 (Program)"]
    end

    SC -->|"调用/改写"| SH
    DT -->|"存储调度"| LL
    JM -->|"传输"| LL
    SS -->|"操控"| SH
    LL -->|"驱动"| SH

    style SC fill:#eab308,color:#000
    style DT fill:#dc2626,color:#fff
    style JM fill:#2563eb,color:#fff
    style SS fill:#7c3aed,color:#fff
    style LL fill:#059669,color:#fff
    style SH fill:#ea580c,color:#fff
```

---

## 核心映射体系

本世界的修炼体系与计算机科学（Computer Science）概念深度映射，构成了独特的世界观基础：

| 修炼概念 | 对应CS概念 | 说明 |
|---------|-----------|------|
| 灵力 | **算力（Computing Power）** | 修士的力量来源，衡量一切术式运行的基础资源。算力越高，可执行的术式越强大、越复杂。 |
| 丹田 | **内核（Kernel）** | 修士体内存储与调度算力的核心器官，如同操作系统的内核，管理一切资源分配。 |
| 经脉 | **总线（Bus）** | 连接丹田与四肢百骸的灵力通道，负责算力的传输与数据交换。经脉越通畅，算力传输效率越高。 |
| 神识 | **线程（Thread）** | 修士的精神意识，可并发执行多项任务。神识越强，可同时操控的术式越多。 |
| 术式 | **程序/函数（Program/Function）** | 修士施展的各类法术，本质上是对天道源码的调用与执行。 |
| 天道源码 | **世界底层代码（World Source Code）** | 构成世界一切规则的根本代码，由初代编译者所写。修炼到极致，便可触及并改写这些代码。 |

---

## 世界运行法则

- **天道即编译器**：世界本身便是一台运行中的超级计算机，天道源码时刻编译、执行着万物的存在。
- **修炼即编程**：修士通过感知、理解、调用天道源码来获取力量。境界越高，能读写的源码层级越深。
- **万物皆对象**：世间一切——山川、灵兽、法宝——本质上都是天道源码中的**对象实例（Object Instance）**，拥有属性与方法。
- **因果即调用栈**：因果报应的本质是天道源码中的**调用栈（Call Stack）**，一切行为都会被记录在栈中，层层回溯，无法逃避。

---

## 六大势力关系

![六大势力关系图](../art/illustrations/faction-relationship.png)

```mermaid
graph TB
    OS["开源宗<br/>Open Source Sect<br/>🏔️ 大道至公，源码共享"]
    CS["闭源阁<br/>Closed Source Pavilion<br/>🔒 技术垄断，授权付费"]
    AU["审计圣殿<br/>Audit Temple<br/>⚖️ 天道执法，维护秩序"]
    HK["黑客暗盟<br/>Hacker Alliance<br/>🕶️ 信息自由，灰色地带"]
    CP["编译学院<br/>Compiler Academy<br/>📚 学术中立，技术研究"]
    FR["自由修士<br/>Free Cultivators<br/>🌊 无门无派，行走江湖"]

    OS <-->|"理念对立"| CS
    AU -->|"监管审查"| OS
    AU -->|"监管审查"| CS
    AU -->|"追捕打击"| HK
    HK -.->|"渗透窃取"| CS
    HK -.->|"情报交易"| OS
    CP <-->|"学术交流"| OS
    CP <-->|"技术合作"| CS
    FR -.->|"松散合作"| OS
    FR -.->|"灰色往来"| HK

    style OS fill:#22c55e,color:#fff
    style CS fill:#6366f1,color:#fff
    style AU fill:#eab308,color:#000
    style HK fill:#1e293b,color:#fff
    style CP fill:#0ea5e9,color:#fff
    style FR fill:#78716c,color:#fff
```

详见 [factions/](factions/) 目录下各势力独立文档。

---

## 第一卷地理路线图

```mermaid
graph TD
    subgraph "赤渊城 Stack City"
        A1["下城区·缓存区<br/>万象标注坊"] --> A2["北门"]
    end

    A2 -->|"叶辰出城"| B["荒野·远古服务器遗迹<br/>遇苏沐橙 / 陆隐指导"]
    B -->|"向北行进"| C["开源宗·源峰山门<br/>Fork the Dao, Commit the Truth"]

    subgraph "开源宗内部"
        C --> C1["源码碑林<br/>Open Source Repository"]
        C --> C2["外门弟子区"]
        C --> C3["裂谷调试场<br/>Debug Canyon"]
    end

    C3 -->|"谷底传送阵"| D["碎页密境<br/>Fragmented Page Realm"]

    E["审计圣殿"] -.->|"沈无漏出发调查"| C

    style A1 fill:#64748b,color:#fff
    style C fill:#22c55e,color:#fff
    style C1 fill:#16a34a,color:#fff
    style C3 fill:#dc2626,color:#fff
    style D fill:#7c3aed,color:#fff
    style E fill:#eab308,color:#000
```

---

## 人物关系图（第一卷）

```mermaid
graph TB
    YC["叶辰<br/>码农境→调试境"]
    NULL["NULL<br/>AI伴生灵"]
    SM["苏沐橙<br/>码农境七→九阶"]
    ZK["赵空明<br/>码农境九阶"]
    LY_m["陆隐<br/>重构境·隐藏"]
    QL["青岚长老<br/>重构境三阶"]
    SW["沈无漏<br/>调试境六阶"]
    LY_i["凌幽<br/>码农境九阶"]

    YC <-->|"宿主⇔伴生灵"| NULL
    YC <-->|"搭档 / 盟友"| SM
    YC <-->|"对手 / 冲突"| ZK
    YC <-.->|"师徒"| LY_m
    SM -->|"敬重"| QL
    ZK -->|"伪装恭敬"| QL
    SM <-.->|"同门 / 警惕"| ZK
    SW -.->|"追查目标"| YC
    LY_i -.->|"灰色交易"| YC
    LY_i <-.->|"天然对立"| SW

    style YC fill:#3b82f6,color:#fff
    style NULL fill:#10b981,color:#fff
    style SM fill:#f59e0b,color:#000
    style ZK fill:#ef4444,color:#fff
    style LY_m fill:#8b5cf6,color:#fff
    style SW fill:#eab308,color:#000
    style LY_i fill:#475569,color:#fff
```

---

## 时代背景

传说中，初代编译者在创世之后留下了天道源码的碎片散布于世间。数万年来，修士们通过研究这些碎片逐渐建立起修炼体系。然而，天道源码的核心部分至今无人能完全解读，那里隐藏着世界的终极秘密——也是一切纷争的根源。

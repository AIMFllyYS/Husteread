# 📚 HUSTERead 项目文档目录

本目录包含华中科技大学读书会展示平台的所有项目文档、活动资料与规划文件。

---

## 📁 目录结构

```
docs/
├── README.md                          ← 本文件
├── security-assessment.md             # 安全评估报告
├── performance-baseline.md            # 性能基线指标
├── performance-gate.md                # 性能门禁标准
│
├── source/                            # 原始活动资料（已整理为 Markdown）
│   ├── reading-club-meeting-2026-03-29.md   # 2026.3.29 读书会活动规划会议纪要
│   ├── 社团文化节（春招）.md                   # 2025 第22届社团文化节策划书
│   ├── Tonight读书会.md                      # Tonight 读书会通用策划模板
│   ├── 童心拾梦主题活动.md                     # 童心拾梦六一征文活动文案
│   └── 童心拾梦活动策划.md                     # 童心拾梦活动策划书
│
├── plan/                              # 项目规划文档
│   ├── README.md                      # 规划目录说明
│   ├── current/
│   │   └── master-plan-2026-q2.md     # 2026 Q2 总体规划
│   └── archive/                       # 历史规划存档
│       ├── architecture/
│       │   └── architecture-report.md # 架构设计报告
│       ├── meeting/
│       │   └── website-planning-from-meeting-2026-03-29.md  # 会议推导的网站规划
│       └── migration/
│           └── future-database-migration.md  # 数据库迁移计划
│
└── 最新读书会资料！/                    # 读书会原始活动资料归档
    ├── 智能纪要：读书会活动规划与分工讨论_2026年3月29日.docx/md
    ├── 2025tonight观影会策划 (秋季第1期).docx/md
    │
    └── 2026年上半学期读书会后期工作/
        ├── 实操版2026春季学期读书会工作计划.docx/md
        │
        ├── 2021童心拾忆/               # 童心拾梦六一征文活动资料
        │   ├── 童心拾梦策划.docx/md
        │   ├── 童心拾梦——六一线下征文活动文案.docx/md
        │   └── *.jpg                  # 13张征文投稿截图（已重命名）
        │
        ├── 2026读书会春社团文化节-策划/  # 社团文化节 / 游园会资料
        │   ├── 2025读书会第二十二届学生社团文化节 策划.docx/md
        │   ├── 2023读书会春季游园会活动策划书.docx/md
        │   ├── 游园会实操版筹备分工.docx/md
        │   ├── 百团书海寻踪游戏策划.docx/md
        │   ├── 百团当天简要说明.docx/md
        │   └── 2021游园会照片/         # 26张游园会现场照片（已重命名）
        │
        └── tonight读书会/              # Tonight 读书会历届活动资料
            ├── 策划/                   # 7份活动策划书（.docx/md）
            ├── 文学中的意难平2022.10.30/  # 含策划、宣传文案、海报、活动记录
            ├── 游戏与文学2022.11.19/      # 含策划、宣传文案、海报、活动记录
            ├── 生活中重要的小事儿2023.4.1/ # 含策划、宣传文案、海报、活动记录
            └── 海报合集/               # 6张历届活动海报（已重命名）
```

---

## 📄 核心文档说明

### 项目技术文档

| 文件 | 说明 |
|------|------|
| `security-assessment.md` | 平台安全评估报告，涵盖数据合规、隐私保护、基础设施安全等 |
| `performance-baseline.md` | 性能基线数据，记录各页面加载时间、Core Web Vitals 等指标 |
| `performance-gate.md` | CI/CD 性能门禁规则，定义性能回归的阈值标准 |

### 项目规划文档

| 文件 | 说明 |
|------|------|
| `plan/current/master-plan-2026-q2.md` | 当前季度总体规划，包含功能优先级和里程碑 |
| `plan/archive/architecture/architecture-report.md` | 技术架构设计报告 |
| `plan/archive/meeting/website-planning-from-meeting-2026-03-29.md` | 从会议纪要推导的网站功能规划 |
| `plan/archive/migration/future-database-migration.md` | 未来数据库迁移方案 |

### 活动原始资料

`source/` 目录下为已整理的 Markdown 版本活动资料，`最新读书会资料！/` 目录下保留了原始 `.docx` 文件及对应的 `.md` 转换版本。

---

## 🔄 文档整理记录

- **2026-04-30**：完成文档整理
  - 22 个 `.docx` 文件转换为 `.md` 格式
  - 3 个 `.doc` 文件（Word 97-2003 格式）保留原始文件，暂无法自动转换
  - 45 张图片基于视觉内容重命名（征文截图 13 张、游园会照片 26 张、海报 6 张）

---

## 📝 备注

- 所有 `.docx` 文件旁均有同名 `.md` 文件，内容一致，推荐阅读 `.md` 版本
- 3 个未转换的 `.doc` 文件位于 `tonight读书会/` 各期活动子目录下，为活动记录文档
- 图片文件已从 hash 值 / QQ 自动命名改为描述性中文名称

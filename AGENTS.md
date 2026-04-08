# LLM Wiki - AGENTS.md

## 目录结构

```
source/_posts/
├── wiki/                    # LLM 生成的 wiki（由 LLM 完全拥有）
│   ├── 🗂️ index.md       # 内容索引（按类别）
│   ├── 📋 log.md          # 操作日志（时间线）
│   ├── entities/          # 实体页（人、项目、公司等）
│   ├── concepts/           # 概念页（技术点、想法等）
│   ├── synthesis/          # 综合分析
│   └── summaries/         # 来源摘要
├── raw/                    # 原始资料（不可变）
│   └── [来源文件...]
└── [现有 Hexo 文章...]   # 现有文章
```

## Wiki 页面规范

### Frontmatter
```yaml
---
title: 标题
date: YYYY-MM-DD
tags: [tag1, tag2]
category: 类别
sources: 来源数量
---
```

### 实体页结构
- 定义（一句话概括）
- 属性表
- 相关实体 [[链接]]
- 来源笔记 [[summaries/xxx]]

### 概念页结构
- 定义
- 核心要点（3-5 条）
- 相关概念 [[链接]]
- 来源

## 操作流程

### Ingest（摄入来源）
当用户给一个来源时：
1. 读取来源内容
2. 讨论key takeaways
3. 写入 `wiki/summaries/来源名.md`
4. 更新 `wiki/🗂️ index.md`
5. 更新相关实体/概念页
6. 追加到 `wiki/📋 log.md`

### Query（查询）
1. 先读 `wiki/🗂️ index.md` 定位相关页面
2. 读取相关页面
3. 合成答案
4. 好的答案可归档为新 wiki 页面

### Lint（检查）
定期检查：
- 矛盾信息
- 过时内容
- 孤立页面（无 inbound 链接）
- 缺失交叉引用
- 可补充的概念

## 特殊文件

### wiki/🗂️ index.md
格式：
```markdown
## 实体
- [[entities/xxx]] - 一句话描述

## 概念
- [[concepts/xxx]] - 一句话描述

## 来源
- [[summaries/xxx]] - 来源摘要
```

### wiki/📋 log.md
格式：
```markdown
## [YYYY-MM-DD] ingest | 标题
## [YYYY-MM-DD] query | 问题概要
## [YYYY-MM-DD] lint | 检查结果
```
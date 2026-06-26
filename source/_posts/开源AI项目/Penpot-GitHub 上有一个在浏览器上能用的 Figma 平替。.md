这篇文章主要介绍了开源设计协作平台 **Penpot**，帮你提炼要点如下：

---

## 🎨 Penpot 是什么

- 开源、浏览器端运行的 UI 设计与原型工具（Figma 平替），由西班牙 Kaleidos 公司开发，GitHub 超 5 万 Star，迭代已 5 年。
    
- 支持**官方在线使用**，也支持 **Docker 自部署**（适合金融/政府等有数据合规和内网私有化需求的团队）。
    

## ✨ 核心特点

- **设计即代码**：底层用 SVG / CSS / HTML 等 Web 标准表达设计，非专有格式；Inspect 模式可直接查看复制代码；原生支持 CSS Grid 和 Flex 响应式布局。
    
- **W3C Design Tokens**：完整支持标准设计令牌（颜色/字号/间距等），改一处全局联动，设计与开发共用同一套变量。
    
- **内置 MCP（Model Context Protocol）**：AI Agent（如 Claude Code）可直接读取设计文件中的组件、Tokens、图层结构，**不是靠截图猜 UI**，可双向同步代码与设计稿。
    

## 🚀 快速使用方式

- **在线版**：访问 `design.penpot.app`，注册即用（免费）。
    
- **自部署**：下载官方 `docker-compose.yaml`，执行 `docker compose up -d`，访问 `http://IP:9001`初始化即可。
    

> 开源地址：[https://github.com/penpot/penpot](https://github.com/penpot/penpot)

如果你感兴趣，我也可以帮你整理 Docker 自部署的完整配置步骤或 MCP 接入 AI 的用法～
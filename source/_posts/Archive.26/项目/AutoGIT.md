# AutoGit 快速开始指南

## 🚀 快速启动

### 1. 安装依赖
```bash
pnpm install
```

### 2. 编译插件
```bash
pnpm run compile
```

### 3. 启动调试
在 VS Code 中按 `F5` 启动扩展宿主实例。

---

## 🎯 核心功能演示

### 自动 Pull（打开项目时）
1. 在 VS Code 中打开一个 Git 仓库
2. 插件会自动检测并执行 `git pull`
3. 观察状态栏显示最新状态

### 自动 Commit（停止编辑后）
1. 修改文件内容
2. 停止编辑（等待 60 秒，默认配置）
3. 插件自动执行 `git commit`
4. 观察状态栏倒计时和提交完成提示

### 自动 Push（长时间停止编辑后）
1. 启用自动推送（首次需要手动确认）
2. 停止编辑（等待 1 小时，默认配置）
3. 插件自动执行 `git push`
4. 观察状态栏推送倒计时

---

## ⌨️ 快捷键

| 功能 | 快捷键 | 说明 |
|------|--------|------|
| Pull | `Ctrl+Alt+P` | 手动拉取远程更改 |
| Commit | `Ctrl+Alt+C` | 手动提交（带输入框） |
| Push | `Ctrl+Alt+U` | 手动推送 |

---

## ⚙️ 常用配置

### 基础配置
```json
{
  "autogit.enabled": true,
  "autogit.autoPullOnOpen": true,
  "autogit.autoCommitEnabled": true,
  "autogit.autoPushEnabled": false
}
```

### 时间配置（秒）
```json
{
  "autogit.commitTimeout": 60,      // 自动提交超时
  "autogit.pushTimeout": 3600       // 自动推送超时
}
```

### 提交消息模板
```json
{
  "autogit.commitMessageTemplate": "自动提交: {time}"
}
```
可用变量：
- `{time}`: 当前时间
- `{date}`: 当前日期
- `{branch}`: 当前分支

### 路径排除
```json
{
  "autogit.excludedPaths": [
    ".obsidian/",
    "node_modules/",
    ".git/",
    "dist/",
    "build/"
  ]
}
```

---

## 🛠️ 命令面板

按 `Ctrl+Shift+P`（Windows/Linux）或 `Cmd+Shift+P`（macOS），输入 `AutoGit` 查看所有命令：

- `AutoGit: Pull` - 手动拉取
- `AutoGit: Commit` - 手动提交
- `AutoGit: Push` - 手动推送
- `AutoGit: Toggle Auto Commit` - 切换自动提交
- `AutoGit: Toggle Auto Push` - 切换自动推送
- `AutoGit: Show Status` - 显示详细状态
- `AutoGit: Clear Timers` - 清除定时器
- `AutoGit: Configure` - 打开设置

---

## 🔍 状态栏说明

### 状态图标
- `$(source-control) AutoGit` - 正常状态
- `$(source-control) AutoGit: No Git` - 不是 Git 仓库
- `$(loading~spin) AutoGit: Working...` - 正在执行操作
- `$(source-control) AutoGit: X↑ Y→` - 有未提交更改
- `$(check) AutoGit: Clean` - 无未提交更改

### 状态信息
- `↑`: 未暂存的更改
- `→`: 已暂存的更改
- `[分支名]`: 当前分支
- `+X`: 领先远程 X 个提交
- `-X`: 落后远程 X 个提交
- `[Xs]`: 自动提交倒计时（X 秒）
- `[推送:Xs]`: 自动推送倒计时（X 秒）

---

## 📊 日志查看

### 查看操作日志
1. 打开 "输出" 面板 (`Ctrl+Shift+U` 或 `Cmd+Shift+U`)
2. 选择 "AutoGit" 通道
3. 查看详细的操作日志

### 日志级别
- `DEBUG`: 调试信息
- `INFO`: 一般信息
- `WARN`: 警告信息
- `ERROR`: 错误信息

---

## ⚠️ 安全提示

### 自动推送
⚠️ **自动推送功能默认禁用**，因为：
- 可能推送未审查的代码
- 可能覆盖远程分支
- 可能暴露敏感信息

启用前请确认：
- ✅ 代码已通过审查
- ✅ 没有敏感信息
- ✅ 远程分支配置正确

### 自动提交
⚠️ **自动提交功能谨慎使用**，因为：
- 可能提交临时文件
- 可能提交编译产物
- 可能提交调试文件

建议：
- 配置 `excludedPaths` 排除不需要的文件
- 设置 `maxAutoCommitFiles` 限制文件数量
- 定期检查提交历史

---

## 🐛 故障排除

### 问题：插件不工作
**解决方案**:
1. 确认当前项目是 Git 仓库
2. 检查 `autogit.enabled` 是否为 `true`
3. 查看 "输出" 面板中的错误信息

### 问题：自动提交不触发
**解决方案**:
1. 检查 `autogit.autoCommitEnabled` 是否为 `true`
2. 确认文件有实际修改
3. 检查是否被 `excludedPaths` 排除
4. 查看状态栏倒计时是否正常

### 问题：自动推送不工作
**解决方案**:
1. 确认已启用自动推送（需要手动确认）
2. 检查是否有远程分支
3. 确认网络连接正常
4. 查看是否有未提交的更改

### 问题：状态栏不更新
**解决方案**:
1. 检查 `autogit.showStatusBar` 是否为 `true`
2. 重新打开项目
3. 查看 "输出" 面板是否有错误

### 问题：合并冲突
**解决方案**:
1. 插件会自动检测合并冲突
2. 冲突时会跳过自动提交
3. 手动解决冲突后继续

---

## 💡 最佳实践

### 1. 项目设置
```json
{
  "autogit.commitTimeout": 120,      // 2分钟
  "autogit.pushTimeout": 7200,       // 2小时
  "autogit.excludedPaths": [
    "node_modules/",
    "dist/",
    "build/",
    ".cache/",
    "*.log"
  ],
  "autogit.maxAutoCommitFiles": 20
}
```

### 2. 开发工作流
1. 打开项目 → 自动 pull
2. 编辑代码 → 自动 commit（2分钟后）
3. 长时间离开 → 自动 push（2小时后）
4. 需要立即同步 → 使用快捷键

### 3. 团队协作
- 每个成员配置自己的提交消息模板
- 协商自动推送的时间间隔
- 统一排除的路径模式

---

## 📚 更多资源

- [完整测试报告](./TEST_REPORT.md)
- [项目文档](./README.md)
- [配置参考](./CLAUDE.md)

---

## 🎉 开始使用

现在你已经了解了 AutoGit 的所有功能，可以开始使用了！

1. 在 VS Code 中打开一个 Git 仓库
2. 按 `F5` 启动插件
3. 修改文件并观察自动提交
4. 享受自动化的 Git 工作流！

---

*需要帮助？查看 [README.md](./README.md) 或 [CLAUDE.md](./CLAUDE.md)*
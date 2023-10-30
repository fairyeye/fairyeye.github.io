---
title: Mac使用记录
description: 记录使用的软件、环境配置等
---
## 软件

###  ttygif

- 终端录制工具

#### 安装教程

```bash
brew install ttygif
```

#### 使用

```bash 命令行提示符 command:("[root@localhost] $":1,9-10||"[admin@remotehost] #":4-6)
ttyrec myrecording
```






## Flutter

#### 环境安装：

[官方说明](https://docs.flutter.dev/get-started/install/macos)

[入门](https://blog.csdn.net/duoduo_11011/article/details/125776650)

```
// 依赖冲突 使用as来解决
import 'package:pure_live/modules/search/search_controller.dart' as CustomController;

```

- 运行 `flutter packages get` 命令，让 Flutter 获取并安装依赖
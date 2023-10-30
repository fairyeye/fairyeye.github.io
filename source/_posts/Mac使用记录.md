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
[打包](https://blog.csdn.net/duoduo_11011/article/details/125988124)

```
// 依赖冲突 使用as来解决
import 'package:pure_live/modules/search/search_controller.dart' as CustomController;

```

- 运行 `flutter packages get` 命令，让 Flutter 获取并安装依赖

[# 解决Flutter运行一直卡在 Running Gradle task ‘assembleDebug‘.](https://blog.csdn.net/zhangyiminsunshine/article/details/111137877?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-5-111137877-blog-128835228.235%5Ev38%5Epc_relevant_sort_base2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-5-111137877-blog-128835228.235%5Ev38%5Epc_relevant_sort_base2&utm_relevant_index=6)
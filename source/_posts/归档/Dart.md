---
title: Dart
hidden: true
description: 记录
---




```

```


[# Flutter学习-打包和发布](https://blog.csdn.net/yong_19930826/article/details/122249934?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-122249934-blog-108727289.235%5Ev38%5Epc_relevant_sort_base2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-122249934-blog-108727289.235%5Ev38%5Epc_relevant_sort_base2&utm_relevant_index=2)

[Flutter实战](https://book.flutterchina.club/chapter1/mobile_development_intro.html#_1-1-1-%E5%8E%9F%E7%94%9F%E5%BC%80%E5%8F%91%E4%B8%8E%E8%B7%A8%E5%B9%B3%E5%8F%B0%E6%8A%80%E6%9C%AF)

[入门](https://blog.csdn.net/duoduo_11011/article/details/125776650)
[打包](https://blog.csdn.net/duoduo_11011/article/details/125988124)

```
// 依赖冲突 使用as来解决
import 'package:pure_live/modules/search/search_controller.dart' as CustomController;

```

- 运行 `flutter packages get` 命令，让 Flutter 获取并安装依赖

[# 解决Flutter运行一直卡在 Running Gradle task ‘assembleDebug‘.](https://blog.csdn.net/zhangyiminsunshine/article/details/111137877?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-5-111137877-blog-128835228.235%5Ev38%5Epc_relevant_sort_base2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-5-111137877-blog-128835228.235%5Ev38%5Epc_relevant_sort_base2&utm_relevant_index=6)




- [*] 在更新 `_progress` 时，如果每次更新都会进入一个新的 `setState`，但最终更新的值几乎相同，那么确实会导致仅进行一次更新。
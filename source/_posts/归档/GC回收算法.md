---
title: GC
date: 2020/4/24
tags: work
hidden: true
---

#### 引用计数算法

​	原理：是否有对象引用。

​	![Reference counting](D:\workspace\gitee\StaticFile\image\Reference counting.png)

​	缺点：如果两个对象互相引用，会造成内存泄漏。

11


#### 可达性分析法

​	
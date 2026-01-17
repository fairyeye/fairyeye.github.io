---
title: Go笔记
date: 2020-04-20 11:00:50
categories: "学习笔记"
---
```java
// 当标识符（包括常量、变量、类型、函数名、结构字段等等）以一个大写字母开头，如：Group1，那么使用这种形式的标识符的对象就可以被外部包的代码所使用（客户端程序需要先导入这个包），这被称为导出（像面向对象语言中的 public）；标识符如果以小写字母开头，则对包外是不可见的，但是他们在整个包的内部是可见并且可用的（像面向对象语言中的 protected ）。
```

报错：`The 'main' file has the non-main package or does not contain the 'main' function`

main函数需要再main包下
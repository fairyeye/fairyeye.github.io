---
title: Hello Algo
description: 算法
tags:
  - 学习
date: 2023-12-25 16:04:09
---


二分搜索、插入排序、贪心



迭代、递归


```
# n >= 1 时
T(n) = 3+2n <= 3n+2n = 5n
T(n) <= c * f(n)
T(n) = O(f(n))
```




### KMP

```
next[]：找出一个以0下标(必须0下标)开始，以j-1下标结束的两个相同子串
=>next[j-1] => k-1
```

![](https://s3.bmp.ovh/imgs/2023/12/28/114225dc0dc58919.png)

求`next[]`
```
哈哈               k        x     j            
下标k       0   1  2  3  4  5  6  7  8  9  10 11 12 13
数组p       a   b  a  b  c  a  b  c  d  a  b  c  d  e
next数组    -1  0  0  1  2  0  1  2  0  0  1  2  0  0

j++
下标0 = a
当 j = 3:
	下标j-1=2 -> a     可以找到 a、aba、a  但是aba不满足条件     =>  1
当 j = 4:
	下标j-1=3 -> b     可以找到 ab、abab   但是abab不满足条件   =>  2
当 j = 5:
	下标j-1=4 -> c     可以找到 ababc   不满足条件  =>  0


p[0]..p[k-1] = p[x]..p[j-1]
=> k-1-0 = j-1-x 
=> k = j-x
=> x = j-k
==> p[0]..p[k-1] = p[j-k]..p[j-1]
假设：p[j] = p[k]
=> p[0]..p[k] = p[j-k]..p[j]
因为：next[j-1] => k-1
=> next[j+1] = k+1 => next[j] = k






哈哈               k        x     j            
下标k       0   1  2  3  4  5  6  7  8  9  10 11 12 13
数组p       a   b  a  b  c  a  b  a  d  a  b  c  d  e
next数组    -1  0  0  1  2  0  1  2  3  0  1  2  0  0
```
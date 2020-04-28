---
title: MySQL连接问题
date: 2020-04-28 18:15:49
tags: dairy
---









今天接了一个任务，把之前写好的`Mapper` 中的SQL多连接一张表，

然后中间出现了一个问题

```sql
SELECT ui.name FROM school s,user u LEFT JOIN user_info ui ON u.id = ui.id;
```

这样是没错的，但是如果把表的顺序换一下

```
SELECT ui.name FROM user u,school s LEFT JOIN user_info ui ON u.id = ui.id;
```

就会出问题，理论上来说这样是正常的，但是刚开始的时候确实忽略的这个问题

毕竟有前辈写的代码，实战中都是很多张表关联。
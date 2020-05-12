---
title: Easy Code使用问题
date: 2020年5月11日
tags: "Java"
description: 记录一下Easy Code
---











`Mapper`接口要加上`@Mapper`注解。

`application.yml`要加上

```yaml
mybatis:
  mapper-locations: classpath:/mapper/*Dao.xml
```


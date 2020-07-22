---
title: 'fastJson使用'
date: 2020年7月22日 15点59分
tags: "utils"
---





`syntax error, expect {, actual [, pos 0, fastjson-version 1.2.50`

```java
// 转换一个map对象
List<Map<String, Object>> maps = jdbcTemplate.queryForList("select * from user");
		maps.forEach(stringObjectMap -> {
			User user = JSON.parseObject(JSON.toJSONString(stringObjectMap), User.class);
		});
```
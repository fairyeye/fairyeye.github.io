---
title: List 通过某一字段排序
date: 2020年5月19日
tags: java
---









通过`workOrederNum`字段排序

```
List<ProduceOrderDTO> collect = list.stream().sorted(Comparator.comparing(ProduceOrderDTO::getWorkOrderNum)).collect(Collectors.toList());
```
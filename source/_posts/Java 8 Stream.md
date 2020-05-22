---
title: List stream
date: 2020年5月19日
tags: java
---









通过`workOrederNum`字段排序

```Java
List<ProduceOrderDTO> collect = list.stream().sorted(Comparator.comparing(ProduceOrderDTO::getWorkOrderNum)).collect(Collectors.toList());
```



查出`InstructionPoDTO`中`InstructionDocNum`作为list

```java
// 筛选出不重复的 instructionDocNum
List<String> instructionDocNums = read.stream().map(InstructionPoDTO::getInstructionDocNum).distinct().collect(Collectors.toList());
```



筛选所有`instructionDocNum = 123`的对象 

```java
List<InstructionPoDTO> instructionPoDTOS = read.stream().filter(instructionPoDTO ->
     instructionPoDTO.getInstructionDocNum().equals("123")).collect(Collectors.toList());
```



查询出第一个

```java
String instructionDocId = instructionDocs.stream().findFirst().get();
```



设置`typeCode`为key，`list`的对象为`value`

```java
Map<String, MtGenType> typesMap = types.stream().collect(Collectors.toMap(t -> t.getTypeCode(), t -> t));
```


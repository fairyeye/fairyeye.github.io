---
title: List stream
date: 2020年5月19日
tags: "Java"
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

// 通过字段去重

```
instructionSapStockDTOS.stream().collect(Collectors.collectingAndThen(Collectors.toCollection(()-> new TreeSet<>(Comparator.comparing(o -> o.getMaterial()+";"+o.getPlant()+";"+o.getStorage()+";"+o.getBatch()+";"+o.getSpecialStock()))), ArrayList::new));
```

GROUP BY

```
Map<String, List<WmsIqcRecord>> map = records.stream().collect(Collectors.groupingBy(iqcRecord -> {
                    if (StringUtils.equals("TO_DO", iqcRecord.getStatus())) {
                        switch (iqcRecord.getDealMethod()) {
                            case "RELEASE":
                                return "TO_RELEASE";
                            case "FREEZE":
                                return "TO_FREEZE";
                            case "RETURN":
                                return "TO_RETURN";
                            default:
                                return "TO_DO";
                        }
                    } else if (StringUtils.equals("DONE", iqcRecord.getStatus())) {
                        switch (iqcRecord.getDealMethod()) {
                            case "RELEASE":
                                return "RELEASE_DONE";
                            case "FREEZE":
                                return "FREEZE_DONE";
                            case "RETURN":
                                return "RETURN_DONE";
                            default:
                                return "DONE";
                        }
                    } else {
                        return "DEAL";
                    }
                }));
```


```
//        List<LocalDate> collect = localDates.stream().sorted((var1, var2) -> {
//            if (var1.isBefore(var2)) {
//                return -1;
//            }
//            return 1;
//        }).collect(Collectors.toList());
//        System.out.println(localDates.stream().sorted().collect(Collectors.toList()));
```

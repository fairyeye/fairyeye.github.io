---
title: 'RE:5UserService&Fegin'
date: 2020-04-26 15:25:10
tags: "store"
---






#### Fegin



```java
package com.fairyeye.feign;

@FeignClient(name = "goods-service")
public interface GoodsFeign {
    /**
     *
     * @param id
     * @return
     */
    @GetMapping("/goods/selectOne")
    public Goods selectOne(@RequestParam(value = "id") Long id);
}
```

`@FeignClient(name = "goods-service")`:服务名称

` @GetMapping("/goods/selectOne")`：是goods-service中该接口的完整路由。



**注册中心：**

| Application       | AMIs        | Availability Zones | Status                                                       |
| :---------------- | :---------- | :----------------- | :----------------------------------------------------------- |
| **GOODS-SERVICE** | **n/a** (1) | (1)                | **UP** (1) - [your ip:port](http://localhost:8080/actuator/info) |
| **USER-SERVICE**  | **n/a** (1) | (1)                | **UP** (1) - [your ip:port](http://localhost:8080/actuator/info) |



#### UserService

https://github.com/fairyeye/store











1+1+1+1+1+1+1 = 7

6+5+4+3+2+1 = 
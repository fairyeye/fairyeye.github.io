---
title: Nacos
date: 2020年9月17日18:59:55
categories: "中间件"
---

### 配置中心

##### 1.添加依赖
```xml
<dependency>  
    <groupId>com.alibaba.boot</groupId>  
    <artifactId>nacos-config-spring-boot-starter</artifactId>  
    <version>0.2.1</version>  
</dependency>
```

##### 2.启动类注解 @NacosPropertySource

```java
@SpringBootApplication  
// dataId 对应配置管理-配置列表-dataId
@NacosPropertySource(dataId = "nacosDemo", autoRefreshed = true)  
public class NacosDemoApplication {  
  
    public static void main(String[] args) {  
        SpringApplication.run(NacosDemoApplication.class, args);  
    }  
  
}
```
##### 3.配置nacos地址

```yml
spring:  
    application:  
        name: nacos-demo
```

##### 4.使用配置

```java
@RestController  
public class CacheController {  
  
   @NacosValue(value = "${useLocalCache:false}", autoRefreshed = true)  
   private boolean useLocalCache;  
  
   private static final String template = "useLocalCache is %s!";  
  
   @GetMapping("/cache")  
   public String cache() {  
      // 默认返回false
      return String.format(template, useLocalCache);  
   }  
}
// 此时返回结果 ：useLocalCache is false!
```

-  增加配置并发布

![](https://s3.uuu.ovh/imgs/2022/11/30/d17d85b8702c1cc8.png)

```java
// 返回结果 ：useLocalCache is true!
```
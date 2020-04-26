---
title: 'RE:2网关'
date: 2020-04-26 15:25:10
tags: "store"
---



##### 错误的依赖



正确的依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-netflix-eureka-client</artifactId>
</dependency>
```

##### 使用IP注册到注册中心

```xml
eureka:
  instance:
    hostname: ${spring.cloud.client.ip-address}
    instance-id: ${eureka.instance.hostname}:${server.port}
    # 使用IP注册到注册中心
    prefer-ip-address: true
```



http://www.ityouknow.com/springcloud/2018/12/12/spring-cloud-gateway-start.html
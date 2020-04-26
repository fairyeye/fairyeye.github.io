---
title: store
date: 2020-04-26 14:25:50

---







#### 基础依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

![image-20200426143308709](C:\Users\huapeng.zhang\AppData\Roaming\Typora\typora-user-images\image-20200426143308709.png)





#### 注解

启动类上加`@EnableEurekaServer`注解



store需要pom



`application.yml`

```xml
spring:
  application:
    name: store-eureka
server:
  port: 8000
eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
    serviceUrl:
      defaultZone: http://dev.store.local:${server.port}/eureka/
```







```
register-with-eureka: false  // 注释之后才可以看到 available instance
```



参考：

http://www.ityouknow.com/springcloud/2017/05/10/springcloud-eureka.html







### MySQL

 版本：8.0.19
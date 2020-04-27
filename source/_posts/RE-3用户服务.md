---
title: 'RE:3-UserService'
date: 2020-04-26 15:25:10
tags: "store"
---


#### 依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.2</version>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```

#### 配置

```yaml
spring:
  application:
    name: goods-service
  datasource:
    url: jdbc:mysql://dev.store.local:3306/store_goods?useUnicode=true&characterEncoding=utf-8&useSSL=false
    username: root
    password: root
    driver-class-name: com.mysql.jdbc.Driver
```





#### TIPS

通过easyCode 生成的代码  需要在application配置文件中添加：

```xml
mybatis:
  mapper-locations: classpath:/mapper/*Dao.xml
```



#### 报错：

```java
java.sql.SQLException: The server time zone value '?й???????' is unrecognized or represents more
```

在数据库连接后添加：`&serverTimezone=GMT`
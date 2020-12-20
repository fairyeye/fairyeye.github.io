---

---



---





---





---





----





---

---

---







---





---





---





---





---





---





---



**Date：2020-12-20 22:12:30**

##### Intellij IDEA Live Templete 

![image-20201220221405385](/Users/li/Library/Application Support/typora-user-images/image-20201220221405385.png)

Preferences/Editor/Live Templates -> Java

```
Abbreviation: 输入代码即可快速打印代码。比如常用的sout->System.out.print();
Description: 描述。
Template text: 模板内容。
```

实际上是通过`XML` 实现，右键`copy`粘贴之后可以看到。

```xml
<template name="lo" value="private static final Logger LOGGER = LoggerFactory.getLogger($Class$.class);" description="Generate Logger Slf4j" toReformat="false" toShortenFQNames="true">
  <variable name="Class" expression="className()" defaultValue="String" alwaysStopAt="true" />
  <context>
    <option name="JAVA_CODE" value="true" />
  </context>
</template>
```







---



**Date:2020-12-19 10:20:18**

数据分发，HZERO每个业务节点连接各自数据库





---



**Date : 2020-12-09 19:29:18**

```
src/main/resources
banner.txt
自定义banner
生成banner网站：network-science.de/ascii/
```

```
Optional 抛异常
Optional.ofNullable(object<T> ).orElseThrow(() -> new Exception());
```





```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
</dependency>
```


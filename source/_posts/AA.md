---
title: 拉勾训练营5期
tags:
  - 学习
date: 2024-03-20 16:15:40
---

# JDBC

需要手动引入Mysql的jar包

```java
public class JDBCDemo {  
    public static void main(String[] args) throws ClassNotFoundException, SQLException {  
        // 加载驱动  
        Class.forName("com.mysql.jdbc.Driver");  
        // 建立连接  
        Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "12345678");  
        // 定义SQL语句  
        String sql = "select * from db_account where id = 4";  
        // 获取预处理prepareStatement  
        PreparedStatement preparedStatement = connection.prepareStatement(sql);  
        // 设置参数  
        // preparedStatement.setInt(1, 4);  
        // 执行查询 得到结果  
        ResultSet resultSet = preparedStatement.executeQuery(sql);  
        // 处理结果  
        while (resultSet.next()) {  
            System.out.println("id:" + resultSet.getInt("id"));  
            System.out.println("email:" + resultSet.getString("email"));  
        }  
    }  
}
```


1. 为什么要有ORM框架
- 驱动uri、数据库地址、账号密码，硬编码，不灵活
- 重复的建立连接
- 处理结果集麻烦


## 自定义

### 创建两个工程

- IPersistence、IPersistence_Test

#### IPersistence_Test  使用端



#### IPersistence  自定义框架

##### 根据配置文件的路径，将配置文件加载成字节输入流，存储在内存中

```java
Resources.getResourceAsStream(String path)
```



1. 获得sqlSession对象

sqlSession通过sqlSessionFatory.open获得
sqlSessionFatory通过sqlSessionFatoryBuilder.build(configuration)获得
	build需要获取数据库信息

- 创建SqlSessionFactoryBuilder
- 通过SqlSessionFatoryBuilder.build()获得SqlSessionFatory
- 通过DefaultSqlSessionFactory.open()获得SqlSession
- 创建DefaultSqlSession 实现基础方法 selectAll，selectList

2. 执行JDBC逻辑

创建Executor、Executor实现类，执行CURD



3. 处理返回结果

通过反射或内省+SQLID上的resultType全路径，处理返参

- 问题1：数据库类型与实体类型不一致
```log
Exception in thread "main" java.lang.IllegalArgumentException: argument type mismatch at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method) at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) at java.lang.reflect.Method.invoke(Method.java:498)
```
- 问题2：数据库版本与驱动版本不一致

无法获取数据库连接，报错信息和获取连接方法有关

使用C3P0连接池是报错：
```log
java.sql.SQLException: Connections could not be acquired from the underlying database!
```

使用DriverManager直接连接时：
```
Client does not support authentication protocol requested by server; consider upgrading MySQL client

```


4. 持久层实现

通过mapper接口，数据库的交互

SqlSession中创建一个getMapper方法，获取mapper的代理类，执行被代理类的方法 


# Mybatis

### 概念
基于ORM的`半自动`轻量级持久层框架。

### 缓存

**底层数据结构：** 就是一个HashMap。

`先去缓存中查，然后到数据库中，如果缓存中有，就直接返回，不再去数据库查询。`

#### **一级缓存-SqlSession级别**


**是否启用：** 默认开启

`cacheKey: org.apache.ibatis.executor.BaseExecutor#createCacheKey`

增删改操作时，会刷新缓存（**全部缓存**）

#### **二级缓存-NameSpace级别**

**是否启用：** 默认关闭，需要手动开启

- [I] 二级缓存是在SqlSession事务提交时写入的

- [!] 二级缓存在分布式的情况下，可能有问题。

```java 
@Test  
public void secondLevelCacheTest() throws IOException {  
    InputStream inputStream = Resources.getResourceAsStream("sqlMapConfig.xml");  
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);  
  
    SqlSession sqlSession1 = sqlSessionFactory.openSession();  
    SqlSession sqlSession2 = sqlSessionFactory.openSession();  
  
    IUserMapper mapper1 = sqlSession1.getMapper(IUserMapper.class);  
    IUserMapper mapper2 = sqlSession2.getMapper(IUserMapper.class);  
  
    User user1 = mapper1.selectByPrimaryKey(1);  
    // 这样是不会查到二级缓存的，需要事务提交或者关闭后才可以
    // sqlSession1.commit();  
    // sqlSession1.close();  
  
    User user2 = mapper2.selectByPrimaryKey(1);  
  
    System.out.println(user1==user2);  
}
```


**结论：** 节省了数据库的交互

**Q:** 
```java
@Test  
public void firstLevelCacheTest3() throws IOException {  
    InputStream inputStream = Resources.getResourceAsStream("sqlMapConfig.xml");  
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);  
  
    SqlSession sqlSession = sqlSessionFactory.openSession(true);  
    SqlSession sqlSession2 = sqlSessionFactory.openSession(true);  
  
    IUserMapper mapper = sqlSession.getMapper(IUserMapper.class);  
    IUserMapper mapper2 = sqlSession2.getMapper(IUserMapper.class);  
  
    User user = mapper.selectByPrimaryKey(1);  
    System.out.println(user);  
    mapper2.updateUserByPrimaryKey(new User(1, "gaga"));  
    User user1 = mapper.selectByPrimaryKey(1);  
    System.out.println(user1); 
    System.out.println("user == user1: " + (user == user1)); 
    sqlSession.close();  
    sqlSession2.close();  
}


// User{id=1, name='haha'}
// User{id=1, name='haha'}
// user == user1: true

```

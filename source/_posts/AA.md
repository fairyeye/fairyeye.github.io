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


### 插件

- [I]  需要在SqlMapConfig.xml中启用

```xml
<plugins>  
    <plugin interceptor="com.li.plugin.MyPlugin"></plugin>  
</plugins>
```

#### 分页插件

**拦截器实现**

- [*] `com.github.pagehelper.PageHelper`

- [*] 入口：`com.github.pagehelper.SqlUtil#_processPage`

- [*] 增加COUNTSQL：`com.github.pagehelper.MSUtils#processCountMappedStatement(MappedStatement ms, SqlSource sqlSource, Object[] args)`

- countSql返回结果大于0时，执行分页，将总数设置到page对象中

- 替换参数 `com.github.pagehelper.MSUtils#processPageMappedStatement(MappedStatement ms, SqlSource sqlSource, Page page, Object[] args)`

- 创建新的mapperStatement，执行分页SQL

- 设置分页参数：`com.github.pagehelper.MSUtils#setPageParameter`


#### 通用Mapper




### 架构原理

#### 架构设计

##### 接口

- 通过sqlSession.method(statementId)或者Mapper代理类调用方法，执行主句的增删改查。
- 调用接口修改配置信息等。

##### 数据处理

- 请求参数处理(@Param)：ParameterHandler
- SQL解析(处理占位符、Mapper标签)：SqlSource
- SQL执行(JDBC)：Executor
- 返回结果处理(类型转换等)：ResultSetHandler

##### 框架支撑

- 事务管理
- 连接池管理
- 缓存机制

#### 主要构件

- SqlSession：session表示与数据库的连接

- Executor：执行器

- StatementHandler：

- ParameterHandler：

- BoundSql：

- ResultSetHander：

- TypeHandler：数据库类型与JavaBean类型的转换

- MappedStatement：

- SqlSource：

#### 总体流程

1. SqlSessionFactoryBuilder获取SqlSessionFactory
2. SqlSessionFactory.openSession获取SqlSession对象
3. 通过getMapper获取Mapper代理对象
4. 执行代理Mapper的方法
5.  => Executor Mybatis的执行器
6.  => StatementHandler 与JDBC Statement的交互
7.  => ParameterHandler 处理方法中携带的参数，拼接到Sql中
8.  => 执行JDBC流程（加载驱动、建立连接、定义Sql、获取预处理对象、处理参数、执行、处理返回结果）
9.  => 处理Java类型和数据库类型映射


### 源码分析

#### getMapper

扫描@Mapper注解、从sqlMapConfigXml中读取Mapper包名，或者Mapper接口，将其存到MapperRegistry.knownMappers中
```java 
Map<Class<?>, MapperProxyFactory<?>> knownMappers = new HashMap<>();
```

value值存储的是一个工厂类，有个`Class<T>`的变量，和`newInstance(SqlSession sqlSession)`方法，用于给Mapper创建代理对象

- [*] `Proxy.newProxyInstance(mapperInterface.getClassLoader(), new Class[]{mapperInterface}, mapperProxy);`


```java 
// JDK动态代理 生成代理对象
/**
 * loader 类加载器
 * interfaces 代理对象类型
 * h InvocationHandler接口的实现类，需要实现invoke方法
 */
newProxyInstance(ClassLoader loader,  
                                      Class<?>[] interfaces,  
                                      InvocationHandler h)
```


#### 二级缓存

- [*] `org.apache.ibatis.executor.CachingExecutor#flushCacheIfRequired`

- [*] `org.apache.ibatis.builder.MapperBuilderAssistant#addMappedStatement(java.lang.String, org.apache.ibatis.mapping.SqlSource, org.apache.ibatis.mapping.StatementType, org.apache.ibatis.mapping.SqlCommandType, java.lang.Integer, java.lang.Integer, java.lang.String, java.lang.Class<?>, java.lang.String, java.lang.Class<?>, org.apache.ibatis.mapping.ResultSetType, boolean, boolean, boolean, org.apache.ibatis.executor.keygen.KeyGenerator, java.lang.String, java.lang.String, java.lang.String, org.apache.ibatis.scripting.LanguageDriver, java.lang.String)`


- [?] 二级缓存需要再事务提交后或者关闭后生效

`org.apache.ibatis.executor.CachingExecutor#query(org.apache.ibatis.mapping.MappedStatement, java.lang.Object, org.apache.ibatis.session.RowBounds, org.apache.ibatis.session.ResultHandler, org.apache.ibatis.cache.CacheKey, org.apache.ibatis.mapping.BoundSql)`

=>  使用`CachingExecutor.query()`
=>  清空缓存
=> 
```
// 从二级缓存中，获取结果
List<E> list = (List<E>) tcm.getObject(cache, key);
getObject => TransactionalCacheManager.transactionalCaches.delegate中获取缓存

// 如果没有取到 去一级缓存中取


// 缓存查询结果  
tcm.putObject(cache, key, list);

=> 实际是存到了entriesToAddOnCommit中

transactionalCaches中有一个：
private final Map<Object, Object> entriesToAddOnCommit;

public void putObject(Cache cache, CacheKey key, Object value) {  
    // 存入TransactionalCache的缓存中  
    getTransactionalCache(cache).putObject(key, value);  
}
=> 
entriesToAddOnCommit.put(key, object);

transactionalCaches中有一个flushPendingEntries方法，该方法会在事务提交、关闭时会调用，这也是二级缓存需要在事务提交或者关闭后才能查到的原因
// 将 entriesToAddOnCommit、entriesMissedInCache 刷入 delegate(cache) 中  
flushPendingEntries();

```

- [?] 二级缓存为什么使用的是`CachingExecutor`

sqlSessionFactory.openSession()时会new Executor
`org.apache.ibatis.session.defaults.DefaultSqlSessionFactory#openSessionFromDataSource`

`org.apache.ibatis.session.Configuration#newExecutor(org.apache.ibatis.transaction.Transaction, org.apache.ibatis.session.ExecutorType)`


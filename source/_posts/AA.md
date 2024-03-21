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


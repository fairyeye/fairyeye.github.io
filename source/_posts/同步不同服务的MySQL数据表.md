#### 1.查询数据库是否启用 **FEDERATED**引擎

```
SHOW ENGINES;
```

![](https://i.loli.net/2020/10/26/NmkbpSugEsld1rJ.png)

如果`Support` 为`NO`需要改为`YES` ，只需要修改自己的数据库，目标数据库无需修改。



#### 2.建立数据库

自建表引擎一般为`InnoDB`，建立远程数据表示需要修改为`FEDERATED`

建立与目标 表一样的表结构  替换引擎为`FEDERATED`

```
ENGINE=FEDERATED CONNECTION='mysql://#{userName}:#{passwd}@#{IP}:#{PORT}/#{数据库}/#{表}'
```


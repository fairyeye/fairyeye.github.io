---
title: MySQL
date: 2020年9月17日18:59:55
categories: "数据库"
---
```mysql
SELECT
	swid.OPERATION,
	swid.DELIVERY_METHOD,
	GROUP_CONCAT( DISTINCT( swid.WORK_ORDER_ID ) ) WORK_ORDER_ID 
FROM
	SSME_WO_ISSUE_DETAIL swid 
WHERE
	swid.TENANT_ID = 4 
	AND swid.WORK_ORDER_ID IN ( '42717.1','42719.1' ) 
GROUP BY
	swid.OPERATION,
	swid.DELIVERY_METHOD
```


https://www.cnblogs.com/minqiliang/p/16577102.html

https://blog.csdn.net/z15711187787/article/details/124986309

https://blog.csdn.net/weixin_45994575/article/details/123071909?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-123071909-blog-123821186.t0_edu_mix&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-123071909-blog-123821186.t0_edu_mix&utm_relevant_index=1

部署记录

#### JDBCTemplete批处理
```
// sql语句
String sql = "INSERT INTO ssme_iqc_change(TENANT_ID, KID) VALUE (?, ?);";

List<String> kids = new ArrayList<>();

// BatchPreparedStatementSetter 通过循环取出数据填充到SQL中
jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                ps.setLong(1, 4L);
                ps.setString(2, kids.get(i));
            }

            @Override
            public int getBatchSize() {
                return kids.size();
            }
        });
```

#### MySQL数据删除恢复

```
# 数据库中运行
# 判断binlog是否开启
show variables like '%log_bin%';

# 找到数据库data位置
show variables like 'datadir';
```

- data目录下数据  找到当天的binlog
![](https://s3.uuu.ovh/imgs/2022/11/28/9c0f7495a6838922.png)

```
# 转换为SQL 只转换操作时间内的数据即可
root@VM-4-10-ubuntu:/var/lib/mysql# mysqlbinlog --base64-output=decode-rows -v --database=smart-admin-dev --start-datetime="2022-11-28 10:50:00" --stop-datetime="2022-11-28 11:00:00" binlog.000018 > 000018.sql
```

- 000018.sql
![](https://s3.uuu.ovh/imgs/2022/11/28/09e65127e32811f6.png)

```
# 将SQL转换为insert语句
root@VM-4-10-ubuntu:/var/lib/mysql# cat 000018.sql | sed -n '/###/p' | sed 's/### //g;s/\/\*.*/,/g;s/DELETE FROM/;INSERT INTO/g;s/WHERE/SELECT/g;' |sed -r 's/(@17.*),/\1;/g' | sed 's/@1=//g'| sed 's/@[1-9]=/,/g' | sed 's/@[1-9][0-9]=/,/g' > 000018OK.sql
```

- 000018OK.sql
![](https://s3.uuu.ovh/imgs/2022/11/28/070cfb64cc8045dc.png)

最后将数据导入数据库即可。


### Group

```mysql
-- 修改 group_concat 长度限制
SET GLOBAL group_concat_max_len=102400;
SET SESSION group_concat_max_len=102400;
```


### Mapper空指针

count sql resultType为对象，导致报错


###  Waiting for table metadata lock
https://blog.csdn.net/jianlong727/article/details/111877226

---
title: JdbcTemplete批处理
date: 2020年10月9日
tags: "utils"
categories: "速率优化"
description: 批处理-速率优化

---





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


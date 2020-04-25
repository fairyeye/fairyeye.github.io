
---
title: 2020-04-08
date: 2020-04-08 09:54:30

tags: Java
---

当做实体类入参时，可以通过mapper接口的`@param`绑定入参。

### Exception：

```
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.binding.BindingException
```





**子查询：**

```
    <select id="queryList" resultType="org.hdgp.mdm.domain.entity.DataPermission">
        SELECT
            ddp.*
        FROM dmdm_data_permission ddp
        WHERE 1=1
        <if test="permission.attrName!=null">
            AND ddp.attr_code in (
            SELECT hda.attr_code
            FROM hdpm_data_attribute hda
            WHERE hda.attr_name LIKE CONCAT(CONCAT('%',#{permission.attrName},'%'))
            )
        </if>
        <if test="permission.attrValue!=null">
            AND ddp.attr_value LIKE CONCAT(CONCAT('%',#{permission.attrValue},'%'))
        </if>
        <if test="permission.meaning!=null">
            AND ddp.attr_value IN (
            SELECT hlv.value
            FROM hpfm_lov_value hlv
            WHERE hlv.meaning like CONCAT(CONCAT('%',#{permission.meaning},'%'))
            )
        </if>
    </select>
```

**换成连接查询：**

```

```

---
title: 供应商导出SQL
hidden: true
---


``` 
# 联系人 -需解密
select
  ses.supplier_num '本地供应商编码',
  sesc.name '名称',
  hlv.meaning '证件类型',
  sesc.id_number '证件号码',
  hlv2.meaning '联系人类型',
  sesc.position '职位',
  sesc.mobilephone '电话',
  sesc.mail '邮箱',
  if(sesc.default_flag=1,'是','否') '默认联系人'
from
  sslm_ext_supplier_contact sesc
  left join sslm_external_supplier ses on sesc.supplier_id = ses.supplier_id
  left join hpfm_lov_value hlv on hlv.value = sesc.id_type and hlv.tenant_id = 0 and hlv.lov_code = 'SPFM.ID_TYPE'
  left join hpfm_lov_value hlv2 on hlv2.value = sesc.contact_type and hlv2.tenant_id = 0 and hlv2.lov_code = 'SSLM.CONTACT_TYPE'
where
  sesc.tenant_id = 61618
  order by sesc.supplier_id
```



```
# 地址
select
  ses.supplier_num '本地供应商编码',
  t.country_name '国家',
  t.region_name '地区',
  t.city_name '城市',
  t.zip_code '邮政编码'
from
  sslm_ext_supplier_address t
  left join sslm_external_supplier ses on t.supplier_id = ses.supplier_id
where
  t.tenant_id = 61618
order by
  t.supplier_id
```


```
# 银行账户 -需解密
SELECT
  ses.supplier_num,
  hc.country_name,
  sb.bank_code,
  sb.bank_name,
  t.bank_firm '联行行号',
  t.deposit_bank '开户行名称',
  t.bank_account_name '账户名称',
  t.bank_account_num '银行账户',
  if(t.main_account_flag=1,'是','否') '主账号',
  if(t.enabled_flag=1,'是','否') '启用'
FROM
  sslm_ext_sup_bank_acct t
  LEFT JOIN smdm_bank sb ON t.bank_id = sb.bank_id
  LEFT JOIN hpfm_country hc ON hc.country_id = t.country_id
  left join sslm_external_supplier ses on t.supplier_id = ses.supplier_id
where
  t.tenant_id = 61618 
```


```
# 地点层
SELECT
	ses.supplier_num '本地供应商编码',
	t.supplier_site_code '地点编码',
	t.supplier_site_name '地点名称',
	hou.ou_code '业务实体编码',
	hou.ou_name '业务实体名称',
	if(t.enabled_flag=1,'是','否') '启用'
FROM
	sslm_ext_supplier_site t
	LEFT JOIN sslm_external_supplier ses ON t.supplier_id = ses.supplier_id
	LEFT JOIN hpfm_operation_unit hou ON hou.ou_id = t.ou_id 
	AND hou.tenant_id = t.tenant_id 
WHERE
	t.tenant_id = 61618
```
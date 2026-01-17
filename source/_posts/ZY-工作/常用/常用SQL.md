---
hidden: true
tags:
  - 常用
---
## 本地/公有云 数据库连接

```
// 鱼 数据库 命令
mysql -h `echo $SPRING_DATASOURCE_URL|awk -F "/" '{print $3}'|awk -F ":" '{print $1}'` -u$SPRING_DATASOURCE_USERNAME -p$SPRING_DATASOURCE_PASSWORD -A
```

# 供应商

## 供货能力

```sql

SELECT
	hc.company_name '供货能力清单所属公司',
	hc2.company_name '供应商名称',
	ssal.item_code '物料编码',
	si.item_name '物料名称',
	ssal.item_category_code '品类代码',
	sic.category_name '品类名称',
	ssal.supply_flag '是否可供 1:可供 0:不可供'
FROM
	sslm_supply_ability_line ssal
	LEFT JOIN sslm_supply_ability ssa ON ssa.supply_ability_id = ssal.supply_ability_id
	LEFT JOIN hpfm_company hc ON hc.company_id = ssa.company_id
	LEFT JOIN hpfm_company hc2 ON hc2.company_id = ssa.supplier_company_id
	LEFT JOIN smdm_item si ON ssal.item_id = si.item_id
	LEFT JOIN smdm_item_category sic ON sic.category_id = ssal.item_category_id
WHERE
	ssa.tenant_id = 1
	AND ssal.tenant_id = 1
	AND ssal.item_code LIKE '5%'
```

## 重复注册

```Sql
select * from hpfm_company where company_num = 'CO00247789'; -- 3690
select * from spfm_company_basic where company_num = 'CO00247789'; -- 3690
select * from sslm_supplier_basic where supplier_company_id = 3690;
select * from spfm_enterprise_register_index where company_name = 'Nasdaq Corporate Solutions International Limited';


UPDATE spfm_company_basic SET last_update_date=NOW(),company_name='Nasdaq Corporate Solutions International Limited(废弃)',duns_code='733541812(废弃)' WHERE tenant_id=3610 AND company_basic_id in (3847);

UPDATE spfm_company_basic_tl SET company_name='Nasdaq Corporate Solutions International Limited(废弃)' WHERE company_basic_id in (3847) and lang='zh_CN';

UPDATE hpfm_company SET last_update_date=NOW(),company_name='Nasdaq Corporate Solutions International Limited(废弃)',duns_code='733541812(废弃)' WHERE tenant_id=3610 AND company_id=3690;

UPDATE sslm_supplier_basic set last_update_date=NOW(),company_name='Nasdaq Corporate Solutions International Limited(废弃)',duns_code='733541812(废弃)' WHERE tenant_id=119 AND supplier_company_id=3690;

UPDATE sslm_supplier_basic set last_update_date=NOW(),company_name='Nasdaq Corporate Solutions International Limited(废弃)' WHERE supplier_basic_id = 3671;

UPDATE spfm_enterprise_register_index SET last_update_date=NOW(),company_name='Nasdaq Corporate Solutions International Limited(废弃)',duns_code='733541812(废弃)' WHERE id=3709;
```

## 主数据（本地供应商）导出

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

## 采购财务

```Sql


```

## 采购方的供应商的子账户

```
SELECT
	iu.real_name '名称',
	iu.login_name '账号',
	iu.phone '手机号',
	iu.email '邮箱',
	ht.tenant_name '所属租户',
	iu.creation_date '创建日期'
FROM
	iam_user iu
	LEFT JOIN iam_member_role imr ON imr.member_id = iu.id
	LEFT JOIN iam_role ir ON ir.id = imr.role_id
	left join hpfm_tenant ht on ht.tenant_id = iu.organization_id
WHERE
	iu.organization_id IN (
		SELECT DISTINCT
			sp.partner_tenant_id
		FROM
			spfm_partner sp
		WHERE
			sp.tenant_id = 520267
	)
	AND iu.organization_id != 520267
	AND ir.h_tenant_id = 520267;
```

## 欧姆龙

```

SELECT
	sp.supplier_basic_id,
	hc.company_num '公司',
	hc.company_name '公司名称',
	hs.company_num '供应商',
	hs.company_name '供应商名称',
	ssb.attribute_varchar7,
	'-',
	sss.supplier_sync_id '采购财务-supplierSyncId',
	sss.term_id '采购财务-付款方式ID',
	spt.term_code '采购财务-付款方式',
	'--',
	sso.supplier_other_id '其他信息-supplierOtherId',
	sso.attribute_varchar1 '其他信息-attributeVarchar1-集采/非集采',
	sso.attribute_varchar3 '其他信息-attributeVarchar3-直接材/间接材',
	'---',
	ssba.supplier_bank_account_id '银行账户-supplierBankAccountId',
	concat('%&',ssba.bank_firm) bank_firm,
	ssba.bank_account_num,
	ssba.attribute_varchar6,
	ssba.attribute_varchar4,
	ssba.attribute_varchar5,
	ssba.attribute_varchar2,
	ssba.currency_id,
	sc.currency_code,
	ssba.attribute_varchar10,
	ssba.attribute_varchar11,
	ssba.attribute_varchar9,
	ssba.attribute_varchar13,
	ssba.attribute_varchar8,
	ssba.attribute_varchar12
FROM
	spfm_partner sp
	LEFT JOIN sslm_supplier_basic ssb ON sp.supplier_basic_id = ssb.supplier_basic_id
	LEFT JOIN hpfm_company hc ON hc.company_id = sp.company_id
	LEFT JOIN hpfm_company hs ON hs.company_id = sp.partner_company_id
	LEFT JOIN sslm_supplier_sync sss ON sss.company_id = sp.company_id
	AND sss.supplier_company_id = sp.partner_company_id
	AND sss.tenant_id = sp.tenant_id
	LEFT JOIN smdm_payment_term spt ON spt.term_id = sss.term_id
	AND spt.tenant_id = 526080
	LEFT JOIN sslm_supplier_other sso ON sso.tenant_id = 526080
	AND sso.company_id = sp.company_id
	AND sso.supplier_company_id = sp.partner_company_id
	AND sso.supplier_tenant_id = sp.partner_tenant_id
	LEFT JOIN sslm_supplier_bank_account ssba ON ssba.supplier_basic_id = sp.supplier_basic_id
	AND ssba.tenant_id = sp.tenant_id
	LEFT JOIN smdm_currency sc ON sc.tenant_id = sp.tenant_id
	AND sc.currency_id = ssba.currency_id
WHERE
	sp.tenant_id = 526080
	AND ssb.tenant_id = 526080
```


## 携程子账户SQL

```Sql

SELECT
	iu.real_name '名称',
	iu.login_name '账号',
	iu.phone '手机号',
	iu.email '邮箱',
	ht.tenant_name '所属租户',
	hc.company_num '供应商',
	hc.company_id,
	iu.creation_date '创建日期'
FROM
	iam_user iu
	LEFT JOIN iam_member_role imr ON imr.member_id = iu.id
	LEFT JOIN iam_role ir ON ir.id = imr.role_id
	LEFT JOIN hpfm_tenant ht ON ht.tenant_id = iu.organization_id
	left join hpfm_company hc on hc.tenant_id = ht.tenant_id
WHERE
	iu.organization_id IN (
		SELECT DISTINCT
			sp.partner_tenant_id
		FROM
			spfm_partner sp
		WHERE
			sp.tenant_id = 24997
			and partner_tenant_id in (select tenant_id from hpfm_company where company_num in ('CO00098927','CO00588704'))
	)
	AND iu.organization_id != 24997
	AND ir.h_tenant_id = 24997
	and iu.real_name != '期初导入'
```

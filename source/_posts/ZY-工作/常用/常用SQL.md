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


# 常用查询

## Table Plus

```sql

select * from hpfm_tenant where tenant_name like '%高标%' AND core_enterprise = 1; -- 26446
select * from hpfm_tenant where tenant_num = 'SRM-HASCO';



select * from iam_user where organization_id = 21443;
select * from sprm_pr_header where tenant_id = 17552;

select * From sprm_pr_line where pr_header_id = 1008507037668022;


select * from hpfm_purchase_agent  where tenant_id = 17552;



delete from sslm_supply_ability where tenant_id = 55771;
DELETE from sslm_supply_ability_line where tenant_id = 55771;
DELETE from sslm_external_supplier where tenant_id = 55771;
delete from sslm_external_supplier_req where tenant_id = 55771;

DELETE from sslm_supplier_es where external_system_code = 'AKBL_RQNV1BYPL0';

-- 亿咖通修账号：
update iam_user set email='fengyan@yoocar.com',phone='13567176851' where login_name='56380426';
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


update hpfm_company set domestic_foreign_relation=1,unified_social_code='12330700MB0M75926T',organizing_institution_code=null,certification_region_id=47,certification_type='1',last_update_date=now() where company_id=436072 and tenant_id=421636;
update spfm_company_basic set domestic_foreign_relation=1,unified_social_code='12330700MB0M75926T',organizing_institution_code=null,certification_region_id=47,certification_type='1',last_update_date=now() where company_id=669983 and tenant_id=421636;
update sslm_supplier_basic set domestic_foreign_relation=1,unified_social_code='12330700MB0M75926T',organizing_institution_code=null,certification_region_id=47,certification_type='1',last_update_date=now() where supplier_basic_id=1796788 and tenant_id=408641;


select * from hpfm_company where company_name = '中国电信（泰国）有限公司';

select * from spfm_company_basic where business_registration_number = '0105556087406';


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

## 主数据 聚合明细


```sql
SELECT DISTINCT
	ssb.supplier_company_id,
	ssb.supplier_basic_id,
	ssb.company_num '供应商编码',
	ssb.company_name '供应商名称',
	CASE
		WHEN (
			(
				SELECT
					count(1)
				FROM
					sslm_external_supplier ses
				WHERE
					ses.tenant_id = slc.tenant_id
					AND slc.supplier_company_id = ses.link_id
					AND ses.supplier_num IS NOT NULL
			) > 0
		) THEN '是'
		ELSE '否'
	END 'ERP供应商',
	CONCAT(IFNULL(CONCAT(hr3.region_name, '|'), ''), IFNULL(CONCAT(hr2.region_name, '|'), ''), IFNULL(CONCAT(hr1.region_name, '|'), ''), IFNULL(hr.region_name, '')) '注册地区',
	CONCAT_WS(
		' ',
		IF(scb.manufacturer_flag = 1, '制造商', NULL),
		IF(scb.trader_flag = 1, '贸易商', NULL),
		IF(scb.servicer_flag = 1, '服务商', NULL),
		IF(scb.agent_flag = 1, '代理商', NULL),
		IF(scb.integration_flag = 1, '集成商', NULL),
		IF(scb.contractor_flag = 1, '承包商', NULL),
		IF(scb.dealer_flag = 1, '经销商', NULL)
	) AS '经营性质',
	CASE slc.blacklist_flag
		WHEN 0 THEN '否'
		WHEN 1 THEN '是'
		ELSE '否'
	END AS '黑名单',
	slcs.stage_description '生命阶段',
	hpa.purchase_agent_name '采购员',
	ssb.unified_social_code '统一社会信用代码',
	(
		SELECT
			GROUP_CONCAT(i.industry_name)
		FROM
			hpfm_industry i
		WHERE
			i.industry_id IN (
				SELECT
					t.industry_id
				FROM
					sslm_supplier_main_industry t
				WHERE
					t.tenant_id = 105513
					AND t.supplier_basic_id = ssb.supplier_basic_id
			)
	) AS '行业类型',
	CASE ssb.taxpayer_type
		WHEN 'GT' THEN '一般纳税人'
		WHEN 'T' THEN '小规模纳税人'
		WHEN 'NT' THEN '非增值税纳税人'
		ELSE '未知'
	END AS '纳税人类型',
	ssc.`name` AS '联系人姓名',
	ssc.mail '邮箱',
	ssc.mobilephone '手机号码',
	ssb.legal_rep_name '法定代表人',
	ssa.address_detail '详细地址',
	ssba.bank_firm '联行号',
	ssi.receive_address '税务登记地址',
	ssi.receive_phone '收票人手机号'
FROM
	sslm_life_cycle slc
	LEFT JOIN sslm_life_cycle_stages slcs ON slcs.stage_id = slc.stage_id
	LEFT JOIN spfm_partner sp ON sp.tenant_id = slc.tenant_id
	AND sp.company_id = slc.company_id
	AND sp.partner_company_id = slc.supplier_company_id
	AND sp.partner_tenant_id = slc.supplier_tenant_id
	LEFT JOIN sslm_supplier_basic ssb ON ssb.supplier_basic_id = sp.supplier_basic_id
	LEFT JOIN sslm_supplier_business scb ON scb.supplier_basic_id = ssb.supplier_basic_id
	LEFT JOIN hpfm_purchase_agent hpa ON ssb.purchase_agent_id = hpa.purchase_agent_id
	LEFT JOIN sslm_supplier_contact ssc ON ssc.supplier_basic_id = ssb.supplier_basic_id
	AND ssc.default_flag = 1
	AND ssc.enabled_flag = 1
	LEFT JOIN sslm_supplier_address ssa ON ssa.supplier_basic_id = ssb.supplier_basic_id
	AND ssa.enabled_flag = 1
	LEFT JOIN sslm_supplier_bank_account ssba ON ssba.supplier_basic_id = ssb.supplier_basic_id
	AND ssba.master_flag = 1
	AND ssba.enabled_flag = 1
	LEFT JOIN sslm_supplier_invoice ssi ON ssi.supplier_basic_id = ssb.supplier_basic_id
	LEFT JOIN hpfm_region hr ON hr.region_id = ssb.registered_region_id
	LEFT JOIN hpfm_region hr1 ON hr.parent_region_id = hr1.region_id
	LEFT JOIN hpfm_region hr2 ON hr1.parent_region_id = hr2.region_id
	LEFT JOIN hpfm_region hr3 ON hr2.parent_region_id = hr3.region_id
	LEFT JOIN hpfm_country hc ON hc.country_id = hr.country_id
WHERE
	slc.tenant_id = 105513;
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


## 省市区 平台数据导出

```sql
SELECT
	hc.country_code '国家编码',
	hc.country_name '国家',
	hr3.region_code '省编码',
	hr3.region_name '省',
	hr2.region_code '市编码',
	hr2.region_name '市',
	hr1.region_code '区编码',
	hr1.region_name '区',
	hr.region_code '街道编码',
	hr.region_name '街道',
	CONCAT(IFNULL(CONCAT(hr3.region_name, '|'), ''), IFNULL(CONCAT(hr2.region_name, '|'), ''), IFNULL(CONCAT(hr1.region_name, '|'), ''), IFNULL(hr.region_name, '')) region_name4
FROM
	hpfm_region hr
	LEFT JOIN hpfm_region hr1 ON hr.parent_region_id = hr1.region_id
	LEFT JOIN hpfm_region hr2 ON hr1.parent_region_id = hr2.region_id
	LEFT JOIN hpfm_region hr3 ON hr2.parent_region_id = hr3.region_id
	LEFT JOIN hpfm_country hc ON hc.country_id = hr.country_id
WHERE
	hr.tenant_id = 0
order by hr.region_code
```
## 采购财务、其他信息

```sql
-- 其他信息
INSERT INTO sslm_supplier_other (tenant_id, company_id, supplier_company_id, supplier_tenant_id)
SELECT sp.tenant_id, sp.company_id, sp.partner_company_id, sp.partner_tenant_id
FROM spfm_partner sp
WHERE sp.tenant_id = 526080
    and sp.company_id = 595090
  AND sp.partner_company_id in (1976)
  and not exists (
 select *
 from sslm_supplier_other sso
 where sso.supplier_company_id = sp.partner_company_id
 and sso.tenant_id = 526080
 and sp.company_id = sso.company_id
);

-- 采购财务
INSERT INTO sslm_supplier_sync (tenant_id, company_id, supplier_company_id, supplier_company_name, term_id)
SELECT sp.tenant_id, sp.company_id, sp.partner_company_id, hc.company_name, 46421 
FROM spfm_partner sp
     JOIN sslm_supplier_basic hc on hc.supplier_basic_id = sp.supplier_basic_id
WHERE sp.tenant_id = 526080
    and sp.company_id = 595090
  AND sp.partner_company_id in (1976)
  and not exists (
 select *
 from sslm_supplier_sync sso
 where sso.supplier_company_id = sp.partner_company_id
 and sso.tenant_id = 526080
 and sp.company_id = sso.company_id
);
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

```sql
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



```mysql

SELECT
	t.invite_id,
	t.registration_status '状态',
	t.company_id,
	t.company_num '供应商编码',
	t.company_name '供应商名称',
	t.login_name '账号',
	t.sales_person_name '用户名',
	t.sales_person_phone '手机',
	t.sales_person_email '邮箱'
FROM
	(
		SELECT
			spi.invite_id,
			spi.invite_id AS display_invite_id,
			spi.last_update_date registration_date,
			spi.invite_company_id company_id,
			hc.company_num,
			hc.company_name,
			(
				CASE
					WHEN spi.process_status = 'REGISTERED' THEN 'REGISTERED'
					WHEN spi.process_status = 'APPROVED' THEN 'APPROVED'
					WHEN spi.process_status = 'REJECT' THEN 'REJECT'
					WHEN spi.process_status = 'DISABLED' THEN 'DISABLED'
					ELSE 'INVITEING'
				END
			) registration_status,
			spi.level_type_flag,
			iu.login_name,
			iu.real_name sales_person_name,
			ifnull(iu.phone, spi.sales_person_phone) sales_person_phone,
			ifnull(iu.email, spi.sales_person_email) sales_person_email
		FROM
			spfm_partner_invite spi
			LEFT JOIN srm.hpfm_company hc ON hc.company_id = spi.invite_company_id
			LEFT JOIN srm.iam_user iu ON spi.sales_person_id = iu.id
		WHERE
			spi.invite_type = 'SUPPLIER'
			AND (
				spi.invite_id = spi.relation_invite_id
				OR spi.relation_invite_id IS NULL
			)
			AND spi.tenant_id = 24997
		UNION ALL
		SELECT
			spi.invite_id,
			spi.invite_id AS display_invite_id,
			spi.last_update_date registration_date,
			ifnull(spi.invite_company_id, suac.company_id) company_id,
			hc.company_num,
			IFNULL(suac.company_name, hui.company_name) company_name,
			(
				CASE
					WHEN sfcr.req_status = 'APPROVING' THEN 'APPROVING'
					WHEN sfcr.req_status = 'SUBMIT' THEN 'APPROVING'
					WHEN sfcr.req_status = 'REJECT' THEN 'REG_REJECT'
					WHEN sfcr.req_status = 'WFL_REJECT' THEN 'REG_REJECT'
					WHEN sfcr.req_status = 'SUCCESS' THEN 'CERTIFICATED'
					WHEN spi.process_status = 'CERTIFICATION' THEN 'CERTIFICATION'
					WHEN spi.process_status = 'CERTIFICATED' THEN 'CERTIFICATED'
					WHEN spi.process_status = 'REJECT' THEN 'REG_REJECT'
					WHEN spi.process_status = 'DISABLED' THEN 'DISABLED'
					WHEN spi.process_status = 'REISSUED' THEN 'REISSUED'
					WHEN suac.invitation_code IS NULL THEN 'UNREGISTERED'
					ELSE 'INVITEING'
				END
			) registration_status,
			spi.level_type_flag,
			iu.login_name,
			iu.real_name sales_person_name,
			ifnull(iu.phone, spi.sales_person_phone) sales_person_phone,
			ifnull(iu.email, spi.sales_person_email) sales_person_email
		FROM
			spfm_partner_invite spi
			LEFT JOIN spfm_supplier_invite_reg sir ON sir.invitation_code = spi.invitation_code
			LEFT JOIN srm.hiam_user_info hui ON hui.invitation_code = spi.invitation_code
			AND hui.user_id = spi.invited_user_id
			LEFT JOIN srm.iam_user iu ON spi.invited_user_id = iu.id
			LEFT JOIN spfm_user_association_company suac ON iu.id = suac.user_id
			AND suac.purchase_tenant_id = 24997
			LEFT JOIN sslm_firm_change_req sfcr ON suac.change_req_id = sfcr.change_req_id
			LEFT JOIN hpfm_company hc ON hc.company_id = IFNULL(spi.invite_company_id,suac.company_id)
			AND hc.company_id IS NOT NULL
		WHERE
			spi.invite_type = 'REGISTER'
			AND (
				spi.invite_id = spi.relation_invite_id
				OR spi.relation_invite_id IS NULL
			)
			AND spi.tenant_id = 24997
	) t
WHERE
	t.sales_person_name != '期初导入' and sales_person_name != '注销账户'
```


## 携程修子账户SQL

### 根据供应商查询关联的数据

```sql
SELECT DISTINCT
	hc.company_name,
	hc.company_id,
	sp.supplier_basic_id,
	ssc.supplier_contact_id,
	ssc.`name`,
	ssc.mail,
	ssc.mobilephone
FROM
	spfm_partner sp
	LEFT JOIN hpfm_company hc ON hc.company_id = sp.partner_company_id
	LEFT JOIN sslm_supplier_contact ssc ON ssc.supplier_basic_id = sp.supplier_basic_id
WHERE
	sp.tenant_id = 24997
	AND ssc.tenant_id = 24997
	AND sp.partner_company_id IN (590764, 598543)
	AND sp.supplier_basic_id IS NOT NULL;

```


## 建立合作但是没有生成主数据 补发MQ

```sql

select * from spfm_partner where supplier_basic_id is null; 

select * from spfm_event_message where event_Code='SSLM_LIFECYCLESYNC' and data like '%318027%' and data like '%105552%' 

curl --location 'https://isrm.going-link.com/spfm/v1/event-messages/appoint-resend' \ 

--header 'Authorization: bearer b3ae9c58-be2d-4cff-bbc3-26f68eb26d61' \ 

--header 'Content-Type: application/json' \ 

--header 'Cookie: HWWAFSESID=6ed37c15462e0b1c2a; HWWAFSESTIME=1703730127205' \ 

--data '[{"eventMessageId":553727991}]'
```


## 建立合作但是没有生成主数据 也没有发MQ

```sql
select distinct partner_company_id from spfm_partner where supplier_basic_id is null; 

-- 1309,1310,1311

select company_num,company_name from hpfm_company where company_id in (1309,1310,1311);

select partner_id,supplier_basic_id from spfm_partner where tenant_id = 1 and partner_company_id in  (1309,1310,1311);
select id,organization_id,login_name,real_name from iam_user where real_name in ('CÔNG TY TNHH KHKT TIẾN PHÁT-进发科技有限责任公司', '创富责任有限公司CÔNGTYTNHHCHUANGFU', 'BYD新能量叉车贸易责任公司-CôngtyTNHHthươngmạinănglượngmớiBYD');
select id,company_name,unified_social_code from spfm_enterprise_register_index where company_name in ( 'CÔNG TY TNHH KHKT TIẾN PHÁT-进发科技有限责任公司', '创富责任有限公司CÔNGTYTNHHCHUANGFU', 'BYD新能量叉车贸易责任公司-CôngtyTNHHthươngmạinănglượngmớiBYD');
-- 3029,3028,3027
select supplier_id,supplier_num,supplier_name,link_id from sslm_external_supplier where supplier_name in ( 'CÔNG TY TNHH KHKT TIẾN PHÁT-进发科技有限责任公司', '创富责任有限公司CÔNGTYTNHHCHUANGFU', 'BYD新能量叉车贸易责任公司-CôngtyTNHHthươngmạinănglượngmớiBYD');

select company_basic_id,company_id,company_num,company_name from spfm_company_basic where company_name in ( 'CÔNG TY TNHH KHKT TIẾN PHÁT-进发科技有限责任公司', '创富责任有限公司CÔNGTYTNHHCHUANGFU', 'BYD新能量叉车贸易责任公司-CôngtyTNHHthươngmạinănglượngmớiBYD');

select * from spfm_company_basic_es where company_basic_id in (3029,3028,3027);
select * from spfm_company_basic_tl where company_basic_id in (3029,3028,3027);

select company_basic_id,com_basic_req_id,change_req_id from spfm_com_basic_req where company_name in ( 'CÔNG TY TNHH KHKT TIẾN PHÁT-进发科技有限责任公司', '创富责任有限公司CÔNGTYTNHHCHUANGFU', 'BYD新能量叉车贸易责任公司-CôngtyTNHHthươngmạinănglượngmớiBYD');

select * from spfm_user_association_company where company_name in ('CÔNG TY TNHH KHKT TIẾN PHÁT-进发科技有限责任公司', '创富责任有限公司CÔNGTYTNHHCHUANGFU', 'BYD新能量叉车贸易责任公司-CôngtyTNHHthươngmạinănglượngmớiBYD');
-- 查到userid  删除

update sslm_external_supplier set link_id = null where supplier_name in ( 'CÔNG TY TNHH KHKT TIẾN PHÁT-进发科技有限责任公司', '创富责任有限公司CÔNGTYTNHHCHUANGFU', 'BYD新能量叉车贸易责任公司-CôngtyTNHHthươngmạinănglượngmớiBYD');

delete from iam_user where real_name in ('CÔNG TY TNHH KHKT TIẾN PHÁT-进发科技有限责任公司', '创富责任有限公司CÔNGTYTNHHCHUANGFU', 'BYD新能量叉车贸易责任公司-CôngtyTNHHthươngmạinănglượngmớiBYD');

delete from hpfm_company where company_id in (1309,1310,1311); 
delete from spfm_enterprise_register_index where company_name in ( 'CÔNG TY TNHH KHKT TIẾN PHÁT-进发科技有限责任公司', '创富责任有限公司CÔNGTYTNHHCHUANGFU', 'BYD新能量叉车贸易责任公司-CôngtyTNHHthươngmạinănglượngmớiBYD');
delete from spfm_partner where tenant_id = 1 and partner_company_id in  (1309,1310,1311);
delete from spfm_company_basic where company_name in ( 'CÔNG TY TNHH KHKT TIẾN PHÁT-进发科技有限责任公司', '创富责任有限公司CÔNGTYTNHHCHUANGFU', 'BYD新能量叉车贸易责任公司-CôngtyTNHHthươngmạinănglượngmớiBYD');
delete from spfm_company_basic_tl where company_basic_id in (3029,3028,3027);
delete from spfm_company_basic where company_name in ( 'CÔNG TY TNHH KHKT TIẾN PHÁT-进发科技有限责任公司', '创富责任有限公司CÔNGTYTNHHCHUANGFU', 'BYD新能量叉车贸易责任公司-CôngtyTNHHthươngmạinănglượngmớiBYD');


delete from spfm_company_address where company_id in (1309,1310,1311);
delete from spfm_company_attachment where company_id in (1309,1310,1311);
delete from spfm_company_bank_account where company_id in (1309,1310,1311);
delete from spfm_company_business where company_id in (1309,1310,1311);
delete from spfm_company_contacts where company_id in (1309,1310,1311);
delete from spfm_company_finance where company_id in (1309,1310,1311);
delete from spfm_company_invoice where company_id in (1309,1310,1311);
delete from spfm_company_main_business where company_id in (1309,1310,1311);
delete from spfm_company_main_industry where company_id in (1309,1310,1311);
```


## 刷新调查表模板

```sql
-- 1.根据模板编码查全部的调查表模板;2.查最新的模板;3.把sslm_supplier_investg_sum表所有旧模板id全部算成新模板id;
select group_concat(t.investigate_template_id) from sslm_investigate_tmpl t where t.tenant_id = 64913 and t.template_code = 'QT001752'; -- (27636,27682,27683,27684,27685,28156,28157,28214,28286,28466,28467,28588,28589,28714,30573,31427,31465,27635)
select t.investigate_template_id from sslm_investigate_tmpl t where t.tenant_id = 64913 and t.template_code = 'QT001752' AND t.latest_flag = 'Y' and t.release_flag = 1; -- 31465

select investg_summary_id,investigate_template_id from sslm_supplier_investg_sum where tenant_id = 64913 and investigate_template_id in (27636,27682,27683,27684,27685,28156,28157,28214,28286,28466,28467,28588,28589,28714,30573,31427,31465,27635);

update sslm_supplier_investg_sum set last_update_date=now(),investigate_template_id=31465 where tenant_id=64913 and investigate_template_id in (27636,27682,27683,27684,27685,28156,28157,28214,28286,28466,28467,28588,28589,28714,30573,31427,31465,27635) and partner_company_id = 71803;

select * from hpfm_company where company_name = '敦化市丰达农牧业开发有限公司';
```



## 需求关联SQL

```
select
  ses.link_id '平台供应商ID',
  hc.company_num '平台供应商编码',
  ses.supplier_id '老本地供应商ID',
  ses.supplier_num '老本地供应商编码',
  ses.supplier_name '老本地供应商名称',
  t.supplier_id '新本地供应商ID',
  t.supplier_num '关联的新供应商编码',
  t.supplier_name '关联的新供应商名称',
  case
    when t.supplier_id is not null then '已关联新供应商'
    else '未关联新本地供应商'
  end '关联状态'
from
  sslm_external_supplier ses
  left join hpfm_company hc on hc.company_id = ses.link_id
  left join sslm_external_supplier t on t.link_id = ses.link_id
  and t.tenant_id = 35988
  and t.supplier_id != ses.supplier_id
  and t.supplier_num like 'CO%'
where
  ses.tenant_id = 35988
  and ses.supplier_num like '20%' AND t.supplier_id is not null
  and ses.link_id is not null
```

```
SELECT
	hc.company_num '平台供应商编码',
	hc.company_id,
	t.supplier_id '新本地供应商ID',
	t.supplier_num '新本地供应商编码',
	t.supplier_name '新本地供应商名称',
	ses.supplier_id '老本地供应商ID',
	ses.supplier_num '老本地供应商编码',
	ses.supplier_name '老本地供应商名称'
FROM
	sslm_external_supplier t
	LEFT JOIN hpfm_company hc ON hc.company_id = t.link_id
	INNER JOIN sslm_external_supplier ses ON ses.supplier_name = t.supplier_name
	AND ses.supplier_num LIKE '20%'
	AND ses.link_id IS NULL
	AND ses.tenant_id = t.tenant_id
WHERE
	t.tenant_id = 35988
	AND t.supplier_num LIKE 'CO%'
	AND t.link_id IS NOT NULL

```



## 佳通修数据：

```sql
SELECT
	group_concat(investigate_template_id)
FROM
	sslm_investigate_tmpl
WHERE
	tenant_id = 1
	AND template_code = 'QT000414'
	AND version_number < 4; -- 110

SELECT
	group_concat(investigate_template_id)
FROM
	sslm_investigate_tmpl
WHERE
	tenant_id = 1
	AND template_code IN ('QT000401', 'QT000402', 'QT000400', 'QT000403');
	-- 开了预留字段的四张调查表的所有版本的ID：2,9,12,19,33,38,52,58,65,68,69,72,114,1,4,5,8,13,16,18,31,32,37,39,40,57,59,66,70,71,73,81,82,3,7,10,11,14,15,17,20,21,22,23,24,25,26,27,28,29,30,34,41,43,44,47,48,51,53,55,64,76,80,6,36,42,45,46,49,50,54,56,63,77,79,35
SELECT
	sih.partner_company_id
FROM
	sslm_investg_header sih
WHERE
	sih.tenant_id = 1
	AND sih.investigate_template_id IN (107, 108, 109, 110)
	AND NOT EXISTS (
		SELECT
			1
		FROM
			sslm_investg_header t
		WHERE
			t.tenant_id = 1
			and t.investigate_template_id IN (2,9,12,19,33,38,52,58,65,68,69,72,114,1,4,5,8,13,16,18,31,32,37,39,40,57,59,66,70,71,73,81,82,3,7,10,11,14,15,17,20,21,22,23,24,25,26,27,28,29,30,34,41,43,44,47,48,51,53,55,64,76,80,6,36,42,45,46,49,50,54,56,63,77,79,35)
	);
	-- 发过110调查表且发过别的调查表的供应商ID：3,6,6,7,8,9,10,11,12,13,14,15,15,16,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,51,52,53,54,55,56,57,58,59,60,61,62,65,66,67,69,70,71,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,87,88,89,90,91,91,92,93,94,95,96,97,98,99,100,101,102,103,104,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,186,187,188,189,190,191,192,193,194,195,196,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,228,229,231,232,233,234,235,235,236,237,238,239,240,241,242,242,243,244,245,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,291,292,293,294,295,296,297,298,300,301,302,303,304,305,306,307,310,311,312,313,314,315,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,329,330,331,332,333,334,335,336,337,338,339,341,342,343,344,345,346,347,348,349,350,351,352,354,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,390,391,392,393,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,414,415,416,417,419,420,421,422,423,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,437,438,440,441,442,443,444,445,447,449,450,451,451,452,453,454,455,456,457,458,459,460,460,461,462,464,465,466,467,468,469,470,471,472,473,473,474,475,476,477,478,479,481,482,483,484,485,486,487,488,495,500,500,517,526,527,530,535,535,552,558,559,560,561,562,563,564,565,566,567,567,568,569,570,571,572,573,574,576,577,578,579,580,581,582,583,671,672,673,674,675,676,677,678,679,680,682,682,683,683,684,685,687,688,689,691,692,693,695,696,697,698,698,700,701,702,703,704,705,705,706,707,707,708,710,711,713,714,715,716,717,718,720,722,723,724,726,727,728,729,730,732,733,734,735,736,737,737,739,740,742,743,744,744,745,746,747,748,750,751,752,754,755,756,758,760,761,762,763,764,765,766,767,767,768,769,771,772,774,776,777,778,780,781,782,783,786,790,791,792,793,794,795,796,797,798,799,800,802,803,804,805,806,808,809,812,814,816,816,816,818,819,820,821,822,823,827,828,829,829,830,833,835,837,838,840,841,841,843,844,848,852,857,882,886,886,887,904,905,906,908,918,958,999,1027,1027,1027,1039,1067,1097,1099,1115,1121,1131,1159,1212,1244,1247,1248,1255,1256,1265,1267,1321,1327,1329,1334,1334,1336,1337,1340,1342,1343,1347,1348,1349,1361,1370,1372,1390,1398,1401,1401,1403,1415,1420,1422,1425,1432,1447,1449,1450,1475,1504,1517,1518,1519,1522,1537,1539,1575,1609,1628
```

#### 当前主数据 关联的调查表

```sql
SELECT
	*
FROM
	sslm_supplier_investg_sum t
WHERE
	t.tenant_id = 1
	AND t.investigate_template_id = 110
	AND t.partner_company_id IN (3,6,6,7,8,9,10,11,12,13,14,15,15,16,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,51,52,53,54,55,56,57,58,59,60,61,62,65,66,67,69,70,71,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,87,88,89,90,91,91,92,93,94,95,96,97,98,99,100,101,102,103,104,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,186,187,188,189,190,191,192,193,194,195,196,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,228,229,231,232,233,234,235,235,236,237,238,239,240,241,242,242,243,244,245,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,291,292,293,294,295,296,297,298,300,301,302,303,304,305,306,307,310,311,312,313,314,315,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,329,330,331,332,333,334,335,336,337,338,339,341,342,343,344,345,346,347,348,349,350,351,352,354,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,390,391,392,393,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,414,415,416,417,419,420,421,422,423,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,437,438,440,441,442,443,444,445,447,449,450,451,451,452,453,454,455,456,457,458,459,460,460,461,462,464,465,466,467,468,469,470,471,472,473,473,474,475,476,477,478,479,481,482,483,484,485,486,487,488,495,500,500,517,526,527,530,535,535,552,558,559,560,561,562,563,564,565,566,567,567,568,569,570,571,572,573,574,576,577,578,579,580,581,582,583,671,672,673,674,675,676,677,678,679,680,682,682,683,683,684,685,687,688,689,691,692,693,695,696,697,698,698,700,701,702,703,704,705,705,706,707,707,708,710,711,713,714,715,716,717,718,720,722,723,724,726,727,728,729,730,732,733,734,735,736,737,737,739,740,742,743,744,744,745,746,747,748,750,751,752,754,755,756,758,760,761,762,763,764,765,766,767,767,768,769,771,772,774,776,777,778,780,781,782,783,786,790,791,792,793,794,795,796,797,798,799,800,802,803,804,805,806,808,809,812,814,816,816,816,818,819,820,821,822,823,827,828,829,829,830,833,835,837,838,840,841,841,843,844,848,852,857,882,886,886,887,904,905,906,908,918,958,999,1027,1027,1027,1039,1067,1097,1099,1115,1121,1131,1159,1212,1244,1247,1248,1255,1256,1265,1267,1321,1327,1329,1334,1334,1336,1337,1340,1342,1343,1347,1348,1349,1361,1370,1372,1390,1398,1401,1401,1403,1415,1420,1422,1425,1432,1447,1449,1450,1475,1504,1517,1518,1519,1522,1537,1539,1575,1609,1628)
```

#### 指定模板  每个供应商最新审批通过的调查表

```sql
-- 最新审批通过调查表不是110的供应商ID：458,454,449,429,456,455,471,472,437,453,475,443,452,473,457,481,482,438,483,485,486,487,488,495,500,527,535,558,561,562,565,566,567,568,569,570,572,574,576,577,579,580,581,582,583,671,672,673,674,675,676,678,680,682,683,684,687,689,692,695,696,697,698,700,701,702,703,704,705,707,711,713,714,715,716,717,718,722,723,724,726,727,728,730,732,733,735,736,737,742,743,744,745,746,747,748,754,755,761,762,765,767,769,771,780,781,790,793,794,795,796,797,802,816,819,822,841,844,848,301,325,465,470,357,358,355,341,390,203,226,130,177,25,343,129,258,160,411,423,245,210,171,277,191,127,76,170,436,166,393,275,15,6,265,335,318,337,161,223,886,887,362,354,196,235,205,350,339,194,297,367,381,338,269,365,334,375,397,43,253,61,402,416,94,904,905,906,32,908,918,189,1027,1039,1097,1131,272,1159,1212,1247,1248,1255,1256,1265,833,157,1321,1327,1334,1336,1337,1340,1347,1348,1349,1361,1390,1398,1401,1403,1415,1420,1425,1432,1450,1475,1517,1519,404,1537,827,1244,791,460,451,840,829,804,1575,168,281,169,305,204,321,150,379,123,158,396,37,431,217,173,342,92,273,266,310,212,264,49,395,193,348,407,279,229,280,33,82,467,372,128,1628,254,1342


```
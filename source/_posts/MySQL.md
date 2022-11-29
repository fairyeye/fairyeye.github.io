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
---

---





```
int a = bigdemical.compareTo(bigdemical2)
//a = -1,表示bigdemical小于bigdemical2；
//a = 0,表示bigdemical等于bigdemical2；
//a = 1,表示bigdemical大于bigdemical2；


//加减乘除：
BigDecimal bignum1 = new BigDecimal("10");  
BigDecimal bignum2 = new BigDecimal("5");  
BigDecimal bignum3 = null;  
  
//加法  
bignum3 =  bignum1.add(bignum2);       
System.out.println("和 是：" + bignum3);  
  
//减法  
bignum3 = bignum1.
(bignum2);  
System.out.println("差  是：" + bignum3);  
  
//乘法  
bignum3 = bignum1.multiply(bignum2);  
System.out.println("积  是：" + bignum3);  
  
//除法  
bignum3 = bignum1.divide(bignum2);  
System.out.println("商  是：" + bignum3);
```



##### BigDecimal 去除小数点后的0

```
BigDecimal bigDecimal = new BigDecimal("10.100000");
bigDecimal = bigDecimal.stripTrailingZeros();// 10.1
String str = bigDecimal.toPlainString();//转成字符串
```


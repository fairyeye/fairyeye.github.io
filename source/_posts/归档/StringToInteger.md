---
title: StringToInteger
date: 2020年9月17日18:59:55
categories: "java"
---

# String 转 Integer

## 1.Integer的parseInt方法

```
String string = "123";
int value = Integer.parseInt(string);
System.out.println("stringToInt---------->"+value);

结果：StringToInt---------->123
```

## 2.Integer的valueOf方法

```
String string = "123";
Integer value = Integer.valueOf(string);
System.out.println("stringToInt1---------->"+value);

结果：StringToInt1---------->123
```

以上两种方法都是可行的。



但是会有特殊的情况，比如：

```
String string = "abc";
int value = Integer.parseInt(string);
System.out.println("stringToInt---------->"+value);

结果：
Exception in thread "main" java.lang.NumberFormatException: For input string: "abc"
	at java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)
	at java.lang.Integer.parseInt(Integer.java:580)
	at java.lang.Integer.parseInt(Integer.java:615)
	at com.hand.todo.infra.util.StringToInt.stringToInt(StringToInt.java:16)
	at com.hand.todo.infra.util.StringToInt.main(StringToInt.java:10)
```

使用stringToInt1()也会返回同样的错误。

```
public static Integer valueOf(String s) throws NumberFormatException {
    return Integer.valueOf(parseInt(s, 10));
}
```

valueOf()调用了parseInt()，所以返回同样的错误是正常的。

按照正常的逻辑来说，我们需要对这个错误进行处理，比如：

```
String string = "abc";
int value = 0;
try {
    value = Integer.parseInt(string);
} catch (NumberFormatException e) {
    e.printStackTrace();
}
System.out.println("StringToInt---------->"+value);

结果：
java.lang.NumberFormatException: For input string: "abc"
	at java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)
	at java.lang.Integer.parseInt(Integer.java:580)
	at java.lang.Integer.parseInt(Integer.java:615)
	at com.hand.todo.infra.util.StringToInt.stringToInt(StringToInt.java:18)
	at com.hand.todo.infra.util.StringToInt.main(StringToInt.java:10)
StringToInt---------->0
```

可以看到，虽然依然报错，但是程序还是继续执行了。

然后回到主题。

## 3.Guava 的 Ints 结合 Java8 的 Optional

```
String string = "abc";
Integer value = Optional.ofNullable(string)
        .map(Ints::tryParse)
        .orElse(0);
 System.out.println("StringToInt2---------->" + value);
 
 结果：StringToInt2---------->0
```

可以在转换失败的时候为他设置默认值：

```
String string = "abc";
Integer value = Optional.ofNullable(string)
        .map(Ints::tryParse)
        .orElse(100);
 System.out.println("StringToInt2---------->" + value);
 
 结果：StringToInt2---------->100
```



**写在末尾：之所以写这么详细是因为最开始的时候我很菜，看别人写的文档都很简单，虽然可以解决问题，但是却不解其意，所以写的啰嗦一点，对新手比较友好。**



​	</body>

</html>
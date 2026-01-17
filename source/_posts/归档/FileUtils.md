

---
title: 工具类
date: 2020-04-20 11:00:50
categories: "工具类"
---

### 数组转文件
```java
/**
 * @param bfile
 * @param filePath
 * @param fileName
 *
 * 根据byte数组，生成文件
 */
public static void getFile(byte[] bfile, String filePath,String fileName) {
    BufferedOutputStream bos = null;
    FileOutputStream fos = null;
    File file = null;
    try {
        File dir = new File(filePath);
        if(!dir.exists()&&dir.isDirectory()){//判断文件目录是否存在
            dir.mkdirs();
        }
        file = new File(filePath+"\\"+fileName);
        fos = new FileOutputStream(file);
        bos = new BufferedOutputStream(fos);
        bos.write(bfile);
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        if (bos != null) {
            try {
                bos.close();
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        }
        if (fos != null) {
            try {
                fos.close();
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        }
    }
}
```
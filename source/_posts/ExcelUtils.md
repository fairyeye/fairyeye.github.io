```
// 对应Excel头与实体类字段 通过HeaderAlias
int rowCount = reader.getRowCount();
reader.setHeaderAlias(DataReadVO.getHeaderAlias());
List<DataReadVO> read = reader.read(0, 1, rowCount, DataReadVO.class);
```





```
public class DataReadVO {

    private boolean status = false;
    private Long lineNum;
    private String materialId;
    private String materialCode;
    private Double qty;
    public Map<String, String> map;

    public static Map<String, String> getHeaderAlias(){
        Map<String, String> map = new HashMap<>();
        map.put("行号", "lineNum");
        map.put("物料编码", "materialCode");
        map.put("数量", "qty");
        return map;
    }
}
```
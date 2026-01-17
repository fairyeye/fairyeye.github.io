
### 2171 拿出最少得魔法豆


![](https://s3.bmp.ovh/imgs/2024/01/19/2f204f7d3bbeef18.png)




二分法：

```java
class Solution {  
    public int search(int[] nums, int target) {  
        if (nums.length == 0) return -1;  
        if (nums.length == 1) return nums[0] == target ? 0 : -1;  
        int index = -1;  
        int lfet = 0;  
        int right = nums.length - 1;  
  
        return search(lfet, right, nums, target);  
    }  
  
    public int search(int left, int right, int[] nums, int target) {  
        if (left > right) {  
            return -1;  
        }  
        int center = (left + right) / 2;  
        if (nums[center] == target) {  
            return center;  
        } else if (nums[center] > target) {  
            return search(left, center - 1, nums, target);  
        } else {  
            return search(center + 1, right, nums, target);  
        }  
    }  
}
```

# 效果如下

![](./GIF.gif)


## 插件结构
```
new compression({
    domId: "img", // 上传图片的Dom 目前只支持id；
    type: "jpg", // 压缩后保存图片的类型，目前支持 jpeg , png   参数：jpeg png
    fidelity: 1, // 压缩比例 (0,1]
    imgFile: function(base64) {
        alert(base64) // 压缩好的回调
    }
})
```

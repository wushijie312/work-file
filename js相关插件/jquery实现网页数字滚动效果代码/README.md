![](./logo.png)

使用方法：
1、head引入css文件
```
<link href="css/style.css" rel="stylesheet" type="text/css"/>
```
2、head引入js文件
```
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.num.js"></script>
```
3、body引入HTML代码
```
<div class="product-num-box">
    <div class="product-num-content">
        <div class="product-num-title">全线产品免费开放，等你加入</div>
        <div class="product-num-text">我们致力于构建最全面、最开放、最前沿的AI开放平台</div>
        <div class="product-num-text">提供最易用的API、SDK等开发组件，助力您快速高效地实现产品升级</div>
        <div class="product-num-head">
            <div class="product-num-item">
                <span class="timer product-num-nub count-title" id="count-number" data-to="102" data-speed="102">0</span>
                <span class="product-num-add">项</span>
                <span class="product-num-inf">技术能力</span>
            </div>
            <div class="product-num-item">
                <span class="timer product-num-nub count-title" id="count-number" data-to="24" data-speed="24">0</span>
                <span class="product-num-add">小时</span>
                <span class="product-num-inf">快速集成</span>
            </div>
            <div class="product-num-item">
                <span class="timer product-num-nub count-title" id="count-number" data-to="54" data-speed="54">0</span>
                <span class="product-num-wan">w</span>
                <span class="product-num-add" style="font-size:32px; right:35px;">+</span>
                <span class="product-num-inf">开发者正在使用</span>
            </div>
        </div>
        <a href="#" class="product-num-jus">立即体验</a>
    </div>
</div>
```
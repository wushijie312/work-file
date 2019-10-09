<template>
   <div class="wrap_foot">
      <p>Copyright2010-2019 EasyPNP, All Rights Reserved 阳光印网 版权所有 京ICP备14011154号</p>
    </div>
</template>

<script>
export default {
  name: "footGuide",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
@import "../../assets/css/index.less";
.wrap_foot {
    width: 100%;
    font-size: 12px;
    background: @headColor;
    height: 60px;
    margin-top: -60px;
    line-height: 60px;
    color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
  }
</style>
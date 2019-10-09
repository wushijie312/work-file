<template>
  <div class="wrap_header">我是头部</div>
</template>

<script>
export default {
  name: "headGuide",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
@import "../../assets/css/index.less";
.wrap_header {
  padding: 15px;
  position: relative;
  width: 100%;
  color: #fff;
  line-height: 30px;
  background: @headColor;
  z-index: 999;
}
</style>
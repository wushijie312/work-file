<template>
    <div>
       <img src="../assets/img/loading.gif" />  
       <h3 class="home_tit">hello</h3>
       <p>hello  in  the  world!</p>
       <div class="btn_gray">ddd</div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "register",
  data () {
      return {
            
      }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
@import '../assets/css/index.less';
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

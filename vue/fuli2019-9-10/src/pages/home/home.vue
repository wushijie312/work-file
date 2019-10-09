<template>
  <div class="home">
    <div class="wrap_main">
      <HeadGuide/>
      <div class="wrap_content" style="height:1900px;">
        <div class="menu">woskad</div>
      </div>
    </div>
    <FootGuide/>
  </div>
</template>

<script>
import { mapState } from "vuex";
const HeadGuide = () => import("@/components/headGuide/headGuide");
const FootGuide = () => import("@/components/footGuide/footGuide");
export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    HeadGuide,
    FootGuide
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
@import "../../assets/css/index.less";
.home {
  height: 100%;
  width: 100%;
  .wrap_main {
    min-height: 100%;
    .wrap_content {
      padding: 0px 0 60px;
      background: #f5f5f5;
    }
  }
}
</style>

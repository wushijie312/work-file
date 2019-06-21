
<template>
  <el-container>
    <div class="t_head " :class="[!isCollapse?'width180':'']">
        <navmenu ></navmenu>
    </div>
    <div class="r_main">
      <div class="main_header">
        <vheader/>
      </div>
      <div class="main_cont">
        <router-view></router-view>
      </div>
    </div>
  </el-container>
</template>

<script>
import Header from "@/components/Header";
import NavMenu from "@/components/NavMenu";
import { mapState } from "vuex";
export default {
  name: "tables",
  computed: {
    // isCollapse() {
    //   return this.$store.state.isCollapse;
    // },
    // ...mapState(["isCollapse"])
    ...mapState({"isCollapse":state=>state.basic.isCollapse})
  },
  components: {
    navmenu: NavMenu,
    vheader: Header
  },
  mounted() {
    var _this = this;
    window.onresize = function() {
      //改变左侧窗口大小
      var screenWidth =
        document.documentElement.clientWidth || document.body.clientWidth; //窗口宽度
      screenWidth > 800
        ? _this.$store.commit("change_width", false)
        : _this.$store.commit("change_width", true);
        
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.t_head {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: rgb(105, 89, 205);
  width: 64px;
  transition: all 0.2s;
}

.r_main {
  width: 100%;
  height: 100vh;
  background: #f1f1f1;
  overflow: auto;
}
.width180 {
  width: 180px;
}
.main_cont {
  padding-top: 60px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  height: 100%;
}
.main_header {
  height: 60px;
  margin-bottom: -60px;
}
</style>



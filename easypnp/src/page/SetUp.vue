
<template>
  <div class="s_bg">
    <div class="s_box">
      <div class="s_head" v-bind:style="{ background:change_bg_color  }">
        <!-- <navmenu ></navmenu> -->
        <div class="p_t10 p_b10" v-bind:style="{ background:change_head_color  }">
          <h3 class="s_head_h3" @click="back_home($router)">{{$t('setup.backhome')}}</h3>
        </div>
        <ul class="s_head_nav">
          <li @click="gotothemeColor()">{{$t('setup.themeColor')}}</li>
          <li @click="gotolanguage()">{{$t('setup.language')}}</li>
        </ul>
      </div>
      <div class="s_main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// import Header from "@/components/Header";
// import NavMenu from "@/components/NavMenu";
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    // isCollapse() {
    //   return this.$store.state.isCollapse;
    // },
    // ...mapState(["isCollapse"])
    ...mapState({
      isCollapse: state => state.basic.isCollapse,
      change_bg_color: state => state.themeColor.change_bg_color,
      change_head_color: state => state.themeColor.change_head_color
    })
  },
  components: {
    // navmenu: NavMenu,
    // vheader: Header
  },
  methods: {
    gotothemeColor() {
      this.$router.push("/setup/themecolor");
    },
    gotolanguage() {
      this.$router.push("/setup/language");
    },
    ...mapMutations(["back_home"])
  },
  mounted() {
    // var _this = this;
    // window.onresize = function() {
    //   //改变左侧窗口大小
    //   var screenWidth =
    //     document.documentElement.clientWidth || document.body.clientWidth; //窗口宽度
    //   screenWidth > 800
    //     ? _this.$store.commit("change_width", false)
    //     : _this.$store.commit("change_width", true);
    // };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.s_box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 100vh;
  background: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.s_head {
  min-width: 150px;
  max-width: 200px;
}
.s_head_h3 {
  font-size: 16px;
  line-height: 36px;
  color: #fff;
  padding: 0px 5px;
  text-align: center;
  border: 1px solid #fff;
  margin: 0 12px;
  border-radius: 30px;
  cursor: pointer;
}
.s_head_nav li {
  font-size: 14px;
  line-height: 24px;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 1px solid #fff;
}
.s_head_nav li:hover {
  background: #fff;
  color: #333;
}
.s_head_nav li:last-child {
  border-bottom: none;
}
.s_main {
  width: 100%;
  padding: 80px 100px;
}
</style>



`    HEGTH 9L96
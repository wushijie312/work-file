<template>
  <div class="head_wrap clearfix">
    <div class="clearfix fl" @click="change_collapse">
      <div class="fl m_t20 m_r20 c_hand">
        <img :class="!isCollapse?'trans_90':''" src="@/assets/img/head/shu_line.png" alt>
        <!-- <img v-else src="@/assets/img/head/heng_line.png" alt=""> -->
      </div>
      <!-- <div class="fl m_t15">
        <el-tag class="m_r20 c_hand">{{$t("mainSite.yangguangqicai")}}</el-tag>
        <el-tag class="m_r20 c_hand">{{$t("mainSite.yangguangxunjian")}}</el-tag>
        <el-tag class="c_hand">{{$t("mainSite.other")}}</el-tag>
      </div> -->
    </div>
    <div class="fr m_t20 clearfix">
      <!-- <div class="fl">
        <el-switch v-model="change_zh_en" active-text="中文" inactive-text="英文"></el-switch>
      </div> -->
      <div class="fr">
        <!-- <router-link class="login" v-if="!login_true" :to="{path:'/login'}">登录</router-link> -->
        <el-dropdown v-if="userInfo.userId">
          <span class="el-dropdown-link head_person">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{$t('my.persons')}}</el-dropdown-item>
            <el-dropdown-item  @click.native="gotosetup()">{{$t('my.sets')}}</el-dropdown-item>
            <!-- <el-dropdown-item @click.native="gotothemeColor()">{{$t('my.themeColor')}}</el-dropdown-item> -->
            <el-dropdown-item disabled>{{$t('my.orderLists')}}</el-dropdown-item>
            <el-dropdown-item divided @click.native="goOut($router)">{{$t('my.goOut')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      isCollapse: state => state.basic.isCollapse,
      userInfo: state => state.user.userInfo,
      login_true: state => state.basic.login_true
    }),
    // change_zh_en: {
    //   get() {
    //     return this.$store.state.basic.change_zh_en;
    //   },
    //   set(val) {
    //     this.$store.commit("setChange_zh_en", val);
    //     // ...mapMutations(['setChange_zh_en',val]);
    //     if (this.$i18n.locale == "zhCHS") {
    //       this.$i18n.locale = "en";
    //     } else {
    //       this.$i18n.locale = "zhCHS";
    //     }
    //   }
    // }
  },
  mounted(){
    // const easypnp_access= this.getCookie();
    this.getUserInf();
  },
  methods: {
    ...mapMutations(["change_collapse","goOut"]),
    ...mapActions(['getUserInf']),
   gotosetup(){
      this.$router.push('setup');
   }
  }
};
</script>
<style scoped>
.c_hand img{
  transition: all 0.3s;
}
.trans_90{
  transform: rotate(90deg);
}
.login {
  display: inline-block;
  color: #666;
  font-size: 14px;
  padding: 0 10px;
  margin: 0 10px;
}
.head_wrap {
  padding: 0 0 0 20px;
  background: #fff;
  border-bottom: 1px solid #e6ebed;
  height: 60px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.head_person {
  padding: 15px 20px;
}
</style>
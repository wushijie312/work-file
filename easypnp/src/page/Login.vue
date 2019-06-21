
<template>
  <div class="login_bg">
    <div class="login_info">
      <div class="login_img">
        <img src="../assets/img/login/login_logo.png" alt>
      </div>
      <h2 class="login-info-title">阳光印网智能系统</h2>
      <ul class="login-info-list">
        <li class="login-info-item">
          <i class="el-icon-check"></i>&nbsp;Patchout对接-----支持OA/ERP对接、定制专属功能模块
        </li>
        <li class="login-info-item">
          <i class="el-icon-check"></i>&nbsp;手机端H5辅助-----支持手机端H5定制、线上+移动随时下单
        </li>
        <li class="login-info-item">
          <i class="el-icon-check"></i>&nbsp;小程序应用-----支持多种采购场景应用、提供企业采购多元化服务
        </li>
        <li class="login-info-item">
          <i class="el-icon-check"></i>&nbsp;系统集成-----支持单点/免登对接、集成第三方标品采购
        </li>
        <li class="login-info-item">
          <i class="el-icon-check"></i>&nbsp;数据分析-----导出订单直接对账、数据模块可生成报告
        </li>
      </ul>
    </div>
    <div class="login-border">
      <h4 class="login-title">智能系统</h4>
      <form action class="m_t10 m_b10">
        <el-input class="m_b10" placeholder="请输入用户名" v-model="input10" clearable></el-input>
        <el-input class="m_b5" placeholder="请输入密码" v-model="input11" show-password></el-input>
        <div class="m_b20">
           <el-checkbox v-model="checked">记住账号</el-checkbox>
        </div>
        <div>
          <el-button type="primary" @click="login_success_actions({$router})" round style="width:100%;">登录</el-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      input11: "",
      input10: "",
      checked:false
    };
  },

  methods:{
    // gotoHome(){
    //   this.$router.push({path:'/home'});
    // },
     ...mapActions(["login_success_actions"]),
     
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-border {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 30px 50px 25px 50px;
  background-color: #fff;
  border-radius: 6px;
  -webkit-box-shadow: 1px 1px 2px #eee;
  box-shadow: 1px 1px 2px #eee;
  width: 300px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.login-title {
  margin: 0 0 20px;
  text-align: center;
  color: #409eff;
  letter-spacing: 3px;
}
.login_info {
  padding-left: 60px;
  color: #fff;
}
.login-info-title {
  line-height: 90px;
}
.login-info-item {
  font-size: 14px;
  line-height: 24px;
}
.login_bg {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  height: 100vh;
}
.login_bg:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/login/login_bg.png");
  background-size: cover;
  z-index: -1;
}
</style>



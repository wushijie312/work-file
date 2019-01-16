<template>
  <div class="login-container">
    <h2>BESTSELLER</h2>
    <div class="login-form">
      <input v-model="username" class="login-input" placeholder="请输入账号">
      <div class="login-line"></div>
      <br>
      <input v-model="password" class="login-input" placeholder="请输入密码">
      <div class="login-line"></div>
      <br>
      <p class="login-tips">
        温馨提示：账号密码一样 admin、zhangsan、lisi
      </p>
      <Button class="login-btn-login" v-on:click="login({username,password,$router})" v-bind:width="160" v-bind:height="40" title="登录" color="#26a2ff" />
    </div>
    <custom-footer class="login-cf" copyright="2013 Custom. All Right Reserved" rn="京ICP备000000000号" />
  </div>
</template>

<script>
//vuex辅佐函数
import { mapActions } from "vuex";
//通用按钮
import Button from "../../components/Button.vue";
//备案号页角
import CustomFooter from "../../components/CustomFooter.vue";

export default {
  //组件名
  name: "Login",
  //父组件传参
  props: {
    msg: String
  },
  //子组件
  components: {
    Button,
    CustomFooter
  },
  //组件内部状态
  data() {
    return {
      username: "", //用户名
      password: ""  //密码
    };
  },
  //组件方法(响应在 view 上的用户输入导致的状态变化)
  methods: {
    ...mapActions([
      "login" // 将 `this.login()` 映射为 this.$store.dispatch('login',this.username,this.password);
    ])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
}

.login-form {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  flex: 1;
}

h2 {
  margin-top: 4rem;
}

.login-input {
  border-radius: 0px;
  border: 0px solid #e4e4e4;
  padding: 0 0.3rem;
  width: 80%;
  height: 3rem;
  font-size: 15px;
  outline: medium;
}

.login-btn-login {
  margin-top: 1rem;
}

.login-tips {
  color: red;
  font-size: 10px;
}

.login-line {
  height: 1px;
  width: 80%;
  background-color: #e2e5e7;
}

</style>

<template>
  <div class="me-container">
    <Head title="个人中心"></Head>
    <div class="me-content">
      <div class="me-items">
        <img class="avatar" v-bind:src="userInfo ? userInfo.avatar : ''">
        <div class="content-item">
          <span class="content-item-title">姓名</span>
          <span class="content-item-value">{{ userInfo ? userInfo.nickname : '' }}</span>
        </div>
        <div class="line"></div>
        <div class="content-item">
          <span class="content-item-title">性别</span>
          <span class="content-item-value">{{ userInfo ? (userInfo.sex ? '男' : '女') : '' }}</span>
        </div>
        <div class="line"></div>
        <div class="content-item">
          <span class="content-item-title">出生日期</span>
          <span class="content-item-value">{{ userInfo ? userInfo.birthday: '' }}</span>
        </div>
        <div class="line"></div>
      </div>
      <Button
        class="btn-logout"
        v-bind:width="190"
        v-bind:height="45"
        v-on:click="logout()"
        title="注销登陆"
        color="#ef4f4f" />
    </div>
    <tab-bar />
  </div>
</template>

<script>
//vuex辅佐函数
import { mapState, mapActions } from "vuex";
//通用按钮
import Button from "../../components/Button.vue";
//底部导航视图
import TabBar from "../../components/TabBar.vue";
//主页头部视图
import Head from "../../components/Head.vue";

export default {
  //组件名
  name: "Me",
  //父组件传参
  props: {
    msg: String
  },
  //子组件
  components: {
    Head,
    Button,
    TabBar
  },
  //组件内部状态
  data() {
    return {};
  },
  mounted() {
    this.getUserInfo();
  },
  //组件方法(响应在 view 上的用户输入导致的状态变化)
  methods: {
    ...mapActions({
      getUserInfo: "getUserInfo", // 将 `this.logout()` 映射为 `this.$store.dispatch('logout')`
      logoutAction: "logout" // 将 `this.logout()` 映射为 `this.$store.dispatch('logout')`
    }),
    logout() {
      let flag = confirm("退出登录将会清空你的登录信息,确定退出?");
      if(flag){
        this.logoutAction(this.$router);
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo //全局状态树里的用户信息
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.me-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.me-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.me-items {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-item {
  height: 45px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
}

span {
  text-align: center;
}

.content-item-title {
  margin-left: 20px;
}

.content-item-value {
  flex: 1;
}

.btn-logout {
  opacity: 0.9;
  margin-bottom: 100px;
}

.line {
  height: 1px;
  width: 100%;
  background-color: aliceblue;
}

.avatar {
  width: 56px;
  height: 56px;
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>

<template>
  <div class="lab-container">
    <action-bar v-on:goBack="$router.go(-1)" class="gd-head" title="Axios 实战(拦截器)" />
    <div class="lab-content">
      <div class="btn" v-on:click="get203Response"><span class="lab-top-title">HTTP 203(模拟其他状态码)</span></div>
      <div class="line"></div>
      <div class="btn" v-on:click="get500Response"><span class="lab-top-title">HTTP 500(模拟服务器发生未知错误)</span></div>
      <div class="line"></div>
      <div class="btn" v-on:click="get401Response"><span class="lab-top-title">HTTP 401(模拟登陆失效)</span></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
//vuex辅佐函数
import { mapActions } from "vuex";
//顶部事件栏
import ActionBar from "../../components/ActionBar.vue";
export default {
  //组件名
  name: "Axios",
  //父组件传参
  props: {
    msg: String
  },
  //子组件
  components: {
    ActionBar
  },
  //组件内部状态
  data() {
    return {};
  },
  //组件方法(响应在 view 上的用户输入导致的状态变化)
  methods: {
    ...mapActions({
      get500Response: "get500Response",
      get401Response: "get401Response",
      get203Response: "get203Response"
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lab-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.lab-content {
  /* 占据中间部分 */
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  background-color: white;
  height: 100%;
}

.lab-top {
  margin-bottom: 1rem;
}

.line {
  height: 1px;
  width: 100%;
  background-color: aliceblue;
}
.btn {
  background-color: bisque;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  margin: 5px 5px 5px 5px;
}
.lab-menu-item {
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: bisque;
}
.lab-top-title {
}
</style>

<template>
  <div class="lab-container">
    <Head title="实验室" />
    <div class="lab-content">
      <div v-on:click="$router.push('/http/axios')" class="lab-menu-item"><span>Axios实战(拦截器)</span></div>
      <div class="line" />
      <div v-on:click="$router.push('/game/center')" class="lab-menu-item"><span>游戏中心</span></div>
      <div class="line" />
    </div>
    <tab-bar class="tab-bar" />
  </div>
</template>

<script>
//vuex辅佐函数
// import { mapState, mapActions } from "vuex";
//主页头部视图
import Head from "../../components/Head.vue";
//底部导航视图
import TabBar from "../../components/TabBar.vue";

export default {
  //组件名
  name: "Laboratory",
  //父组件传参
  props: {
    msg: String
  },
  //子组件
  components: {
    Head,
    TabBar
  },
  //组件内部状态
  data() {
    return {};
  },
  methods: {},
  computed: {}
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
  margin-top: 1rem;
}

.line {
  height: 1px;
  width: 100%;
  background-color: aliceblue;
}

.lab-menu-item {
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: bisque;
}
</style>

<template>
  <div class="tarbar">
    <router-link tag="span" active-class="active" v-for="bar of bars" v-bind:key="bar.id" v-bind:to="bar.path">
      <div class="tarbar-container">
        <img class="tarbar-icon" v-bind:alt="bar.title" v-bind:src="bar.icon">
        <span class="tarbar-title">{{ bar.title }}</span>
      </div>
    </router-link>
  </div>
</template>

<script>

export default {
  //组件名
  name: "TabBar",
  
  //父组件传值
  props: {
    // bars: Array
    // props优于data,为了方便直接使用data里的bars
  },
  data() {
    return {
      //底部导航
      bars: [
        {
          id: 0, //条目id
          title: "商品", //名称
          path: "/goods", //路由地址
          icon: require("../assets/bottom_bar_error.png") //图标
        },
        {
          id: 1,
          title: "实验室",
          path: "/laboratory",
          icon: require("../assets/bottom_bar_test.png")
        },
        {
          id: 2,
          title: "购物车",
          path: "/cart",
          icon: require("../assets/bottom_bar_cart.png")
        },
        {
          id: 3,
          title: "我的",
          path: "/me",
          icon: require("../assets/bottom_bar_me.png")
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tarbar {
  display: -webkit-flex; /* Safari */
  display: flex;
  justify-content: space-around;
  background-color: #3190e8;
}
.tarbar-container {
  height: 52px;
  width: 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tarbar-icon {
  width: 20px;
  height: 20px;
  color: white;
}

.tarbar-title {
  text-align: center;
  font-size: 12px;
  margin-top: 2px;
  color: white;
}
.active {
  background-color: #00000020;
}
</style>

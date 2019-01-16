<template>
  <div class="gc-container">
    <action-bar v-on:goBack="$router.go(-1)" title="游戏中心" />
    <div class="gc-content">
      <div class="gc-title">
        点击图标选择角色：
        <img v-if="role.icon" class="gc-role-icon" v-bind:src="role.icon">
        <span class="gc-role-title">{{ role.title }}</span>
      </div>
      <div class="gc-role-enter" v-on:click="go2Role">
        <span class="gc-enter-role">进入游戏</span>
      </div>
      <div class="gc-grid">
        <role v-for="item of data" v-on:select="selectRole(item)" v-bind:key="item.title" v-bind:title="item.title" color="#FFF" v-bind:icon="item.icon" />
      </div>
    </div>
  </div>
</template>

<script>
//vuex辅佐函数
import { mapState, mapActions } from "vuex";
//底部导航视图
import role from "../../components/Role.vue";
//顶部事件栏
import ActionBar from "../../components/ActionBar.vue";

export default {
  //组件名
  name: "GameCenter",
  //父组件传参
  props: {
    msg: String
  },
  //子组件
  components: {
    ActionBar,
    role
  },
  //组件内部状态
  data() {
    return {
      data: [
        { id: 1000, title: "雅各伯", icon: require("../../assets/head-1.png") },
        { id: 1001, title: "约书亚", icon: require("../../assets/head-2.png") },
        { id: 1002, title: "威廉", icon: require("../../assets/head-3.png") },
        { id: 1003, title: "丹尼尔", icon: require("../../assets/head-4.png") },
        { id: 1004, title: "马修", icon: require("../../assets/head-5.png") },
        {
          id: 1005,
          title: "克里斯托弗",
          icon: require("../../assets/head-6.png")
        },
        {
          id: 1006,
          title: "尼古拉斯",
          icon: require("../../assets/head-7.png")
        },
        { id: 1007, title: "扎卡里", icon: require("../../assets/head-8.png") },
        { id: 1008, title: "卡梅伦", icon: require("../../assets/head-9.png") },
        {
          id: 1009,
          title: "加布里埃尔",
          icon: require("../../assets/head-10.png")
        },
        { id: 1010, title: "埃尔", icon: require("../../assets/head-11.png") },
        { id: 1011, title: "布里加", icon: require("../../assets/head-12.png") }
      ]
    };
  },

  //组件方法(响应在 view 上的用户输入导致的状态变化)
  methods: {
    ...mapActions({
      selectRole: "selectRole"
    }),
    go2Role() {
      // console.log(this.role);
      if (this.role.id) {
        this.$router.push("/game/role"); //使用编程式导航
      } else {
        alert("请先选中一个角色");
      }
    }
  },

  computed: {
    ...mapState({
      role: state => state.game.role
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gc-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.gc-content {
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

.gc-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
}
.btn {
  background-color: bisque;
  text-align: center;
  height: 2rem;
  margin: 5px 5px 5px 5px;
}
.gc-title {
  height: 1rem;
  width: 100%;
  padding-left: 1rem;
  padding-top: 1rem;
}
.gc-role-enter {
  height: 1rem;
  width: 100%;
  padding-left: 1rem;
  padding-top: 1rem;
}
.gc-menu-item {
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: bisque;
}
.gc-role-title {
  color: hotpink;
}
.gc-enter-role {
  color: blue;
}
.gc-role-icon {
  width: 15px;
  height: 15px;
}
</style>

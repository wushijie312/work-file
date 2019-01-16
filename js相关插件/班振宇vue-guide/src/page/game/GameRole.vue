<template>
  <div class="gr-container">
    <action-bar v-on:goBack="$router.go(-1)" title="进入游戏" />
    <div class="gr-content">
      <img class="role-icon" v-bind:src="role.icon">
      <div class="role-info">
        <p class="role-name">{{ role.title || '请选择游戏角色' }}</p>
        <div class="role-attr">
          <p class="role-attr-magic">魔法 200</p>
          <p class="role-attr-power">力量 100</p>
          <p class="role-attr-stamina">体力 59</p>
        </div>
      </div>
    </div>
    <div class="game-play"><span>开始游戏</span></div>
  </div>
</template>

<script>
//vuex辅佐函数
import { mapState } from "vuex";
//顶部事件栏
import ActionBar from "../../components/ActionBar.vue";

export default {
  //组件名
  name: "Role",
  //父组件传参
  props: {
    // msg: String,
  },
  //子组件
  components: {
    ActionBar
  },
  //组件内部状态
  data() {
    return {
      icon: require("../../assets/empty.png")
    };
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

.gr-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.gr-content {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  background-color: white;
}

.role-icon {
  width: 70%;
  margin-top: 1rem;
}

.game-play {
  color: white;
  background-color: orange;
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.role-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 6rem;
  width: 100%;
}

.role-attr-magic {
  font-size: 11px;
  height: 0.2rem;
  color: blue;
}

.role-attr-power {
  font-size: 11px;
  height: 0.2rem;
  color: coral;
}

.role-attr-stamina {
  font-size: 11px;
  height: 0.2rem;
  color: darkviolet;
}

.role-name {
  color: hotpink;
}
</style>

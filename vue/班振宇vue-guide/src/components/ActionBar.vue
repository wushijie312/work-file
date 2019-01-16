<template>
  <div v-on:click="$emit('goBack')" class="head-container">
    <img class="head-img" src="../assets/back.png">
    <span class="head-title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  //组件名
  name: "ActionBar",
  //父组件传值
  props: {
    title: String //标题
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head-container {
  display: flex;
  background-color: #3190e8;
  width: 100%;
  height: 51px;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
}
.head-img {
  width: 38px;
  height: 38px;
}
.head-title {
  text-align: center;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 16px;
  color: white;
}
</style>

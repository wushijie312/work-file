<template>
  <div v-bind:style="{ 'background-color': color}" v-on:click="$emit('select')" class="square-container">
    <img class="square-icon" v-bind:src="icon">
    <span class="square-title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  //组件名
  name: "Square",

  //父组件传值
  props: {
    title: String,
    icon: String,
    color: String,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.square-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 6.6rem;
  height: 6.6rem;
  /* margin: 2px 2px 2px 2px; */
}
.square-icon {
  color: white;
  width: 5rem;
  height: 5rem;
}

.square-title {
  text-align: center;
  font-size: 12px;
  color: black;
}
</style>

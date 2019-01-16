<template>
  <button 
      class="btn"
      v-bind:style="{'background-color':color,width:`${width}px`,height:`${height}px`}"
      v-on:click="$emit('click')">
    {{ title }}
  </button>
</template>

<script>
export default {
  //组件名
  name: "Button",

  //父组件传值
  props: {
    title: String, //标题
    color: String, //颜色
    width: Number, //宽
    height: Number //高
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  height: 46px;
  width: 120px;
  font-size: 16px;
  color: white;
  border: solid 0px;
  border-radius: 5px;
}
</style>

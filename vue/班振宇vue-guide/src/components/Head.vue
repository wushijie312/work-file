<template>
  <div class="head-container">
    <span class="head-title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "Head",
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
  height: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.head-title {
  text-align: center;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 16px;
  color: white;
}
</style>

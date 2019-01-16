<template>
    <div v-on:click="$emit('go')" class="empty-container">
        <img
          class="empty-icon"
          src="../assets/empty.png">
        <span class="empty-title">{{ title }}</span>
    </div>
</template>

<script>
export default {
  //组件名
  name: "Empty",

  //父组件传值
  props: {
    title: String
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.empty-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.empty-icon {
  color: white;
}

.empty-title {
  text-align: center;
  font-size: 12px;
  margin-top: 2rem;
  color: black;
}

</style>

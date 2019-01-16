<template>
    <div class="footer-container">
        <p class="footer-text">{{ copyright }}</p>
        <p class="footer-text">{{ rn }}</p>
    </div>
</template>

<script>
export default {
  //组件名
  name: "CustomFooter",
  //父组件传值
  props: {
    copyright: String, //版权所有
    rn: String //备案号
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer-container {
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer-text {
  text-align: center;
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 10px;
  color: #757575;
}
</style>

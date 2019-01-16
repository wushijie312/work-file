<template>
  <div class="cart-cell-container">
    <img class="cart-cell-image" v-bind:src="cover">
    <div class="cart-cell-detail">
      <div class="cart-cell-goodsName">{{ goodsName }}</div>
      <div class="cart-cell-goodsCode">{{ goodsCode }}</div>
      <div class="cart-cell-colorName">{{ colorName }}</div>
      <div class="cart-cell-sizeName">{{ sizeName }}</div>
      <div class="cart-cell-price">￥{{originalPrice }}</div>
    </div>
    <img v-on:click="$emit('deleted')" class="cart-cell-delete" src="../assets/delete.png">
  </div>
</template>

<script>
export default {
  //组件名
  name: "CartCell",

  //父组件传值
  props: {
    cover: String,   //封面图地址
    goodsName: String, //商品名
    goodsCode: String, //商品sku
    colorName: String, //商品名(颜色)
    sizeName: String, //尺寸
    originalPrice: Number //价格
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart-cell-container {
  display: flex;
  margin: 2px;
  background-color: white;
}

.cart-cell-image {
  width: 75px;
  height: 120px;
  margin: 2px;
}

.cart-cell-delete {
  width: 12px;
  height: 12px;
  margin-right: 10px;
  align-self: center;
}

.cart-cell-detail {
  margin-left: 5px;
  margin-top: 2px;
  font-size: 15px;
  flex: 1;
}

.cart-cell-price {
  color: blue;
}

.cart-cell-line {
  height: 1px;
  background-color: gray;
}
</style>

<template>
  <div class="goods-cell-container">
    <img v-on:click="$emit('go2Detail')" class="goods-cell-image" v-bind:src="cover">
    <div class="goods-cell-detail">
      <div class="goods-cell-goodsName">{{ goodsName }}</div>
      <div class="goods-cell-price">
        <span class="goods-cell-discountPrice">￥{{discountPrice }}</span>
        <span class="goods-cell-originalPrice">￥{{originalPrice }}</span>
        <span class="goods-cell-discount">{{discount * 10}}折</span>
      </div>
      <div class="goods-cell-add-cart">
        <span v-on:click="$emit('addCart')">加入购物车</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //组件名
  name: "GoodsCell",

  //父组件传值
  props: {
    cover: String, //封面图地址
    goodsName: String, //商品名
    discountPrice: Number, //折扣价
    originalPrice: Number, //原价
    discount: Number //折扣比例
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods-cell-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 100%;
}

.goods-cell-image {
  width: 100%;
}

.goods-cell-detail {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.goods-cell-goodsName {
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
}

.goods-cell-add-cart {
  background-color: black;
  text-align: center;
  font-size: 13px;
  width: 6rem;
  height: 2rem;
  margin-top: 6px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.goods-cell-discountPrice {
  font-size: 14px;
  height: 30px;
}

.goods-cell-originalPrice {
  color: #929090;
  text-decoration: line-through;
  font-size: 14px;
  height: 30px;
}

.goods-cell-discount {
  background-color: red;
  color: white;
  font-size: 14px;
  text-align: center;
  height: 20px;
}

.goods-cell-price {
  display: flex;
  width: 50%;
  margin-top: 5px;
  justify-content: space-between;
}

span {
  text-align: center;
}
</style>

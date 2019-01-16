<template>
  <div class="gd-container">
    <action-bar class="gd-head" v-on:goBack="$router.go(-1)" title="商品详情" />
    <div class="gd-content">
      <img class="gd-image" v-bind:src="$route.query.cover">
      <div class="gd-info">
        <div class="gd-goodsname">{{ $route.query.goodsName }}</div>
        <div class="gd-price">
          <span class="gd-discountPrice">￥{{$route.query.discountPrice }}</span>
          <span class="gd-originalPrice">￥{{$route.query.originalPrice }}</span>
          <span class="gd-discount">{{$route.query.discount * 10}}折</span>
        </div>
      </div>
      <iframe allowtransparency="true" frameborder="0" scrolling="no" width="100%" height="3800" id="goodsIframe" src="https://m.only.cn/customPage/ONLY/EChunliji_0925/index.html" />
    </div>
    <div class="gd-bottom">
      <div class="gd-add-cart">
        <span v-on:click="addCart($route.query)"> 加入购物车</span>
      </div>
      <div class="gd-buy">
        <span v-on:click="toBuy">立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
//vuex辅佐函数
import { mapState, mapActions } from "vuex";
//顶部事件栏
import ActionBar from "../../components/ActionBar.vue";

export default {
  //组件名
  name: "GoodsDetail",
  //父组件传参
  props: {
    cover: String, //封面
    goodsName: String, //商品名
    discountPrice: Number, //折扣价
    originalPrice: Number, //原价
    discount: Number //折扣比例
  },
  //子组件
  components: {
    ActionBar
  },
  //组件内部状态
  data() {
    return {};
  },
  mounted() {},
  //组件方法(响应在 view 上的用户输入导致的状态变化)
  methods: {
    ...mapActions([
      "addCart" // 将 `this.addCart()` 映射为 this.$store.dispatch('addCart');
    ]),
    toBuy() {
      alert("开发中...");
    }
  },
  computed: {
    ...mapState({
      // goodsList: state => state.goodsList
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gd-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
}

.gd-head {
  height: 50px;
}

.gd-content {
  /* 占据中间部分 */
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow: auto;
  height: 100%;
}

.gd-image {
  width: 100%;
}

.gd-bottom {
  display: flex;
  width: 100%;
  height: 52px;
}

.gd-add-cart {
  flex: 1;
  background-color: #d4d4d4;
  color: black;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}

.gd-buy {
  flex: 1;
  background-color: black;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}

.gd-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.gd-goodsName {
  height: 1rem;
}

.gd-price {
  display: flex;
  width: 50%;
  height: 1rem;
  margin-top: 5px;
  justify-content: space-between;
}

.gd-discountPrice {
  font-size: 14px;
}

.gd-originalPrice {
  color: #929090;
  text-decoration: line-through;
  font-size: 14px;
}

.gd-discount {
  background-color: red;
  color: white;
  font-size: 14px;
  text-align: center;
}
</style>

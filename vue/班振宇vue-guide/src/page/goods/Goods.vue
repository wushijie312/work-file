<template>
  <div class="goods-container">
    <Head class="goods-head" title="商品"></Head>
    <div class="goods-list">
      <goods-cell
        v-for="goods in goodsList"
        v-on:go2Detail="go2Detail(goods)"
        v-on:addCart="addCart(goods)"
        v-bind:key="goods.gsColorCode"
        v-bind:cover="goods.cover"
        v-bind:goodsName="goods.goodsName"
        v-bind:discountPrice="goods.discountPrice"
        v-bind:originalPrice="goods.originalPrice"
        v-bind:discount="goods.discount" />
    </div>
    <tab-bar class="tab-bar" />
  </div>
</template>

<script>
//vuex辅佐函数
import { mapState, mapActions } from "vuex";
//主页头部视图
import Head from "../../components/Head.vue";
//商品目视图
import GoodsCell from "../../components/GoodsCell.vue";
//底部导航视图
import TabBar from "../../components/TabBar.vue";

export default {
  //组件名
  name: "Goods",
  //父组件传参
  props: {
    msg: String
  },
  //子组件
  components: {
    Head,
    GoodsCell,
    TabBar
  },
  //组件内部状态
  data() {
    return {};
  },
  mounted() {
    this.getGoodslist();
  },
  //组件方法(响应在 view 上的用户输入导致的状态变化)
  methods: {
    ...mapActions([
      "addCart", // 将 `this.addCart()` 映射为 this.$store.dispatch('addCart');
      "getGoodslist", // 将 `this.getGoodslist()` 映射为 this.$store.dispatch('getGoodslist');
      "deleteCartItem" // 将 `this.deleteCartItem()` 映射为 this.$store.dispatch('deleteCartItem');
    ]),
    go2Detail(goods){
      this.$router.push({
        path: '/goods/detail',
        query: { 
          cover: goods.cover, //封面图
          gscMaincolPath: goods.gscMaincolPath, //封面图相对路径
          goodsName: goods.goodsName, //商品名
          goodsCode: goods.goodsCode, //商品9位sku
          gsColorCode: goods.gsColorCode,
          colorName: goods.colorName, //颜色名
          discountPrice: goods.discountPrice, //折扣价
          originalPrice: goods.originalPrice, //原价
          discount: goods.discount //折扣比例
         }
      });

    }
  },
  computed: {
    ...mapState({
      goodsList: state => state.goods.goodsList //状态树里的商品列表
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.goods-list {
  /* 占据中间部分 */
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  justify-content: center;
  align-items: center;
  overflow: auto;
  background-color: white;
  height: 100%;
}
</style>

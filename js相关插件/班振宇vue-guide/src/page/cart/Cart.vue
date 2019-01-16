<template>
  <div class="cart-container">

    <Head class="cart-head" title="购物车"></Head>
    <Empty
      v-on:go="$router.push('goods')"
      title="购物车空空如也,去购物吧~"
      v-if="cartList.length === 0"
      class="empty" />
    <div v-else class="cart-list">
      <cart-cell class="cart-item" v-for="cart in cartList" v-on:deleted="deleteCartItem(cart.id)" v-bind:key="cart.id" v-bind:cover="cart.cover" v-bind:goodsName="cart.goodsName" v-bind:goodsCode="cart.goodsCode" v-bind:colorName="cart.colorName" v-bind:sizeName="cart.sizeName" v-bind:originalPrice="cart.originalPrice" />
    </div>
    <tab-bar class="tab-bar" />
  </div>
</template>

<script>
//vuex辅佐函数
import { mapState, mapActions } from "vuex";
//主页头部视图
import Head from "../../components/Head.vue";
//购物车条目视图
import CartCell from "../../components/CartCell.vue";
//底部导航视图
import TabBar from "../../components/TabBar.vue";
//空视图
import Empty from "../../components/Empty.vue";

/**
 * 购物车视图
 */
export default {
  //组件名
  name: "Cart",
  //父组件传参
  props: {
    msg: String
  },
  //子组件
  components: {
    Head,
    CartCell,
    TabBar,
    Empty
  },
  //组件内部状态
  data() {
    return {};
  },
  //挂在后获取购物车列表
  mounted() {
    this.getCartlist();
  },
  //组件方法(响应在 view 上的用户输入导致的状态变化)
  methods: {
    ...mapActions([
      "getCartlist", // 将 `this.getCartlist()` 映射为 this.$store.dispatch('getCartlist');
      "deleteCartItem" // 将 `this.deleteCartItem()` 映射为 this.$store.dispatch('deleteCartItem');
    ]),
    goShop(){

    }
  },
  computed: {
    ...mapState({
      // 箭头函数可使代码更简练
      cartList: state => state.cart.cartList //映射状态树里的购物车列表
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.cart-list {
  /* 占据中间部分 */
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow: auto;
  height: 100%;
}
.empty {
  flex: 1;
  width: 100%;
  height: 100%;
}
.cart-item {
  height: 120px;
}
</style>

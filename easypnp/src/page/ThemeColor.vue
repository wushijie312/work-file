
<template>
  <div class="change_box">
    <el-radio-group v-model="change_bg_type">
      <el-radio :label="1">{{$t('themeColor.warmyellow')}}</el-radio>
      <el-radio :label="2">{{$t('themeColor.skyblue')}}</el-radio>
      <el-radio :label="3">{{$t('themeColor.elegantgreen')}}</el-radio>
      <el-radio :label="4">{{$t('themeColor.cherry')}}</el-radio>
      <el-radio :label="5" >{{$t('themeColor.noblepurple')}}</el-radio>
      <el-radio :label="6">{{$t('themeColor.black')}}</el-radio>
      <el-radio :label="7">{{$t('basic.defaults')}}</el-radio>

    </el-radio-group>
    <div class="m_t40">
       <el-button class="btn_true" @click="btn_true" type="warning" round size="mini">{{$t('basic.confirm')}}</el-button>
      <el-button round size="mini"  @click="btn_cancel">{{$t('basic.cancel')}}</el-button>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from "vuex";
export default {
  // data() {
  //   return {
  //     change_bg_type:3
  //   };
  // },
  computed: {
    // ...mapState({
    //   // 箭头函数可使代码更简练
    //   changeBgType: state => state.themeColor.changeBgType //映射状态树里的购物车列表
    // }),
    change_bg_type: {
      get() {
        return this.$store.state.themeColor.change_bg_type;
      },
      set(val) {
        this.$store.commit("chnageSystemColor", val);
      }
    }
  },
  methods: {
    btn_true() {
      this.$router.push({ path: "/" });
    },
    btn_cancel(){
        this.$store.commit("chnageSystemColor", 5);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>



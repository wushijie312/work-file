
<template>
  <div class="change_box">
    <el-radio-group v-model="change_zh_en">
      <el-radio :label="false">{{$t('basic.english')}}</el-radio>
      <el-radio :label="true">{{$t('basic.chinese')}}</el-radio>
    </el-radio-group>
    <div class="m_t40">
      <el-button class="btn_true" @click="btn_true" type="warning" round size="mini">{{$t('basic.confirm')}}</el-button>
      <el-button round size="mini" @click="btn_cancel">{{$t('basic.cancel')}}</el-button>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    change_zh_en: {
      get() {
        return this.$store.state.basic.change_zh_en;
      },
      set(val) {
        this.$store.commit("setChange_zh_en", val);
        // ...mapMutations(['setChange_zh_en',val]);
        if (this.$i18n.locale == "zhCHS") {
          this.$i18n.locale = "en";
        } else {
          this.$i18n.locale = "zhCHS";
        }
      }
    }
  },
  methods: {
    btn_true() {
      this.$router.push({ path: "/" });
    },
    btn_cancel(){
         this.$store.commit("setChange_zh_en", this.change_zh_en);
        // ...mapMutations(['setChange_zh_en',val]);
        if (this.$i18n.locale == "zhCHS") {
          this.$i18n.locale = "en";
        } else {
          this.$i18n.locale = "zhCHS";
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>



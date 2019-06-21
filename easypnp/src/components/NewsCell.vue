<template>
  <div>
    <el-dialog title="消息详情" :visible.sync="newsOpen" width="60%" :before-close="newsHandleClose">
      <div ref="multipleTable" :data="newsDetails" style="width: 100%;min-height:450px;">
       <h3 class="newsDetails_tit">{{newsDetails.MCTTitle}}</h3>
       <p class="newsDetails_cont">{{newsDetails.MCTContent}}</p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      newsOpen: state => state.index.newsOpen,
      newsDetails: state => state.index.newsDetails
    })
    // newsDetails() {
    //   console.log(this.$store.state.goods.newsDetails.SkuStatus);
    //   return this.$store.state.goods.newsDetails;
    // }
    // getnewsDetails(){
    //  return this.newsDetails.map(function(row,index){
    //     return row.SkuStatus==1?true:false;
    //   });
    // }
    // changeSkuStatus: {
    //   get() {
    //     return this.$store.state.goods.SkuStatus == 1 ? "true" : "false";
    //   },
    //   set(val) {
    //     this.$store.commit("setChangeSkuStatus", val);
    //     // ...mapMutations(['setChange_zh_en',val]);
    //     // if (this.$i18n.locale == "zhCHS") {
    //     //   this.$i18n.locale = "en";
    //     // } else {
    //     //   this.$i18n.locale = "zhCHS";
    //     // }
    //   }
    // }
  },
  methods: {
    ...mapMutations(["newsHandleClose"]),
  }
};
</script>
<style scoped>
.newsDetails_tit{
  line-height: 36px;
  padding:0px 0 5px;
  border-bottom:1px solid #bbb;
  color: #333;
  font-weight: bold;
  font-size:18px;
  text-align: center;
}
.newsDetails_cont{
  padding:15px 0;
  font-size:14px;
  color: #666;
}
</style>
<template>
  <div>
    <el-dialog title="货品信息" :visible.sync="skuOpen" width="60%" :before-close="skuHandleClose">
      <el-table ref="multipleTable" :data="skuList" border style="width: 100%">
        <el-table-column prop="SkuId" label="SKUID" width="80" align="center"></el-table-column>
        <el-table-column prop="SkuAlias" label="SKU别名" width="250"  align="center"></el-table-column>
        <el-table-column prop="SkuDescribe" label="描述"  align="center"></el-table-column>
        <!-- <el-table-column prop="skuprice" label="sku价格" align="center"></el-table-column>
        <el-table-column prop="skutype" label="sku类型" align="center"></el-table-column>-->
        <el-table-column prop="SkuStatus" label="状态" width="200" align="center">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.SkuStatus==1?'上架':'下架'}}</span>
               <el-switch
                  class="m_l5"
                  @change="skuOffShelves({val:$event,row:scope.row})"
                 v-model="scope.row.SkuStatus"
                  :active-value="onVal"
                  :inactive-value="offVal"
                ></el-switch>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  //父组件传值
  data() {
    return {
      onVal: 1,
      offVal: 2
    };
  },
  computed: {
    ...mapState({
      skuOpen: state => state.goods.skuOpen,
      skuList: state => state.goods.skuList
    })
    // skuList() {
    //   console.log(this.$store.state.goods.skuList.SkuStatus);
    //   return this.$store.state.goods.skuList;
    // }
    // getSkuList(){
    //  return this.skuList.map(function(row,index){
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
    ...mapMutations(["skuHandleClose"]),
    ...mapActions(["skuOffShelves"]),
  }
};
</script>
<style scoped>
</style>
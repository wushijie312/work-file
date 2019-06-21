<template>
  <div class="clearfix bg_white">
    <div class="goods_t">
      <div class="clearfix gt_head">
        {{this.$route.query.userId}}
        <span class="fl">
          <i class="fa fa-search fa-fw"></i>筛选搜索
        </span>
        <div class="fr">
          <el-button
            type="primary"
            size="mini"
            @click="getGoodslist({ sizePage: sizePage, currentPage: currentPage,goodsId:goodsId,goodsState:goodsState,fenlei1:goodsfl1,fenlei2:goodsfl2 })"
          >查询结果</el-button>
          <el-button size="mini" @click="RESET_GOODS_STATE">重置</el-button>
        </div>
      </div>
      <ul class="gt_search">
        <li class="clearfix">
          <div class="clearfix m_t10 fl">
            <span class="fl gt_name">商品名称/ID</span>
            <el-input
              class="fl m_l10"
              style="width:217px;"
              placeholder="商品名称/ID"
              v-model="goodsId"
              clearable
            ></el-input>
          </div>

          <div class="clearfix m_t10 fl">
            <span class="fl gt_name">商品分类</span>
            <el-select class="m_l10" v-model="goodsfl1"  placeholder="请选择" @change="productRelTenantCategory({TenantID:78,CategoryID:goodsfl1})">
              <el-option
                key="0"
                label="请选择"
                value="0"
              ></el-option>
              <el-option
                v-for="item in classifyList1"
                :key="item.CategoryID"
                :label="item.CategoryName"
                :value="item.CategoryID"
              ></el-option>
              
            </el-select>
          </div>
          <div class="clearfix m_t10 fl">
            <!-- <span class="fl gt_name">商品分类</span> -->
            <el-select class="m_l10" v-model="goodsfl2"  placeholder="请选择">
              <el-option
                key="0"
                label="请选择"
                value="0"
              ></el-option>
              <el-option
                v-for="item in classifyList2"
                :key="item.CategoryID"
                :label="item.CategoryName"
                :value="item.CategoryID"
              ></el-option>
            </el-select>
          </div>
          <div class="clearfix m_t10 fl">
            <span class="fl gt_name">状态</span>
            <el-select class="m_l10" v-model="goodsState" clearable placeholder="不限">
              <el-option
                v-for="item in goodsStateList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </li>
      </ul>
    </div>
    <div class="goods_b m_t20">
      <div class="clearfix gt_head gt_border">
        <h3 class="fl gb_number">
          <i class="fa fa-clipboard fa-fw"></i> 数据列表
        </h3>
        <el-button class="fr" size="mini">添加</el-button>
      </div>
      <div class="m_t20">
        <el-table
          ref="multipleTable"
          :data="goodsList.PageList"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" label width="50" align="center"></el-table-column>
          <el-table-column prop="ID" label="编号" width="80" align="center"></el-table-column>
          <el-table-column prop="ProductID" label="商品Id" width="80" align="center"></el-table-column>
          <el-table-column prop="PicUrl" label="商品图片" width="120" align="center">
            <template slot-scope="scope">
              <viewer>
                  <img :src="scope.row.PicUrl" alt style="width: 50px;height: 50px">
              </viewer>
             
            </template>
          </el-table-column>
          <el-table-column prop="Aliases" label="商品名称" align="center"></el-table-column>

          <el-table-column prop="ShowCategoryInfo" label="所属分类" align="center"></el-table-column>
          <el-table-column prop="sku" label="SKU库存" align="center">
            <template slot-scope="scope">
              <el-button
                @click="getSkuByProduct(scope.row)"
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="Status" label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.Status==1" class="add_bule">上架</span>
              <span v-if="scope.row.Status==0">下架</span>
            </template>
          </el-table-column>
          <el-table-column prop="CurrTenantAdminOperate" label="操作" align="center">
            <template slot-scope="scope">
              <div>
                <span>上架</span>
                <el-switch
                  class="m_l5"
                  @change="productOffShelves({val:$event,row:scope.row})"
                  v-model="scope.row.CurrTenantAdminOperate.CurrStatus"
                  :active-value="onVal"
                  :inactive-value="offVal"
                ></el-switch>
              </div>
              <div>
                <span>推荐</span>
                <el-switch
                  class="m_l5"
                  @change="productRecommend({val:$event,row:scope.row})"
                  v-model="scope.row.CurrTenantAdminOperate.CurrIsCommend"
                  :active-value="onVal"
                  :inactive-value="offVal"
                ></el-switch>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="m_t20 clearfix">
          <div class="fr">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100,200,500,800]"
              :page-size="sizePage"
              layout="total, sizes, prev, pager, next, jumper"
              :total="goodsList.RowCounts"
            ></el-pagination>
          </div>
        </div>
        <!-- <el-dialog v-if="skuOpen" >
        asdkajsdkajsdkjaksdj-->
        <GoodsCell></GoodsCell>
        <!-- </el-dialog> -->
      </div>
    </div>
  </div>
</template>
<script>
import GoodsCell from "@/components/GoodsCell";
import { startLoading } from "@/utils/loading";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      goodsStateList: [
        {
          value: "",
          label: "不限"
        },
        {
          value: "0",
          label: "下架"
        },
        {
          value: "1",
          label: "上架"
        }
      ],
      onVal: 1,
      offVal: 0
    };
  },

  computed: {
    ...mapState({
      currentPage: state => state.goods.currentPage,
      sizePage: state => state.goods.sizePage,
      goodsList: state => state.goods.goodsList,
      classifyList1: state => state.goods.classifyList1,
      classifyList2: state => state.goods.classifyList2,
      fullscreenLoading: state => state.basic.fullscreenLoading
    }),
     goodsfl1: {
         get: function () {
            return this.$store.state.goods.goodsfl1
         },
         set:function(val){
            this.$store.commit('change_fenlei',val)
         }
     },
     goodsfl2: {
         get: function () {
            return this.$store.state.goods.goodsfl2
         },
         set:function(val){
           this.$store.commit('change_fenlei1',val)
         }
     },
      goodsState: {
         get: function () {
            return this.$store.state.goods.goodsState
         },
         set:function(val){
           this.$store.commit('change_state_value',val)
         }
     },
      goodsId: {
         get: function () {
            return this.$store.state.goods.goodsId
         },
         set:function(val){
           this.$store.commit('change_goods_id',val)
         }
     },
  
  },
  components: {
    GoodsCell: GoodsCell
  },
  mounted: function() {
    // 加载中loading
    startLoading();
    // 请求全部页面数据
    this.getGoodslist({
      sizePage: this.sizePage,
      currentPage: this.currentPage
    });
    // 获取商品分类
    this.productRelTenantCategory({TenantID:78,CategoryID:0})
  },
  methods: {
    // handleSizeChange  //改变每页显示数量时调用
    handleSizeChange(val) {
      // 加载中loading
      startLoading();
      // 请求size页面数据
      this.$nextTick(() =>
        this.getGoodslist({ sizePage: val, currentPage: this.currentPage })
      );
    },
    // handleCurrentChange    //点击下一页和点击页码时执行
    handleCurrentChange(val) {
      // 加载中loading
      startLoading();
      // 请求current页面数据
      this.getGoodslist({ sizePage: this.sizePage, currentPage: val });
    },
    // getGoodslist //获取分页数据goodsList
    ...mapActions([
      "getGoodslist",
      "getSkuByProduct",
      "productOffShelves",
      "productRecommend",
      "productRelTenantCategory"
    ]),
    ...mapMutations(["skuHandleClose","RESET_GOODS_STATE"]),
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
};
</script>
<style>
.bg_white {
  height: 100%;
  background: rgb(255, 255, 255);
  padding: 10px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.gt_border {
  border: 1px solid #bbb;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  padding: 10px;
}
.gt_search {
  line-height: 40px;
  font-size: 14px;
  color: #666;
}
.gt_name {
  width: 140px;
  display: inline-block;
  text-align: right;
}
.gt_head {
  line-height: 28px;
  font-size: 14px;
  color: #666;
  padding: 10px 20px;
}
.goods_t {
  border: 1px solid #bbb;
  margin: 15px;
  padding-bottom: 15px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
}
.goods_b {
  margin: 15px;
  padding-bottom: 15px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
}
.gb_number {
  font-weight: normal;
}
.add_bule {
  color: #409eff;
}
</style>
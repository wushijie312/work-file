<template>
  <div class="clearfix bg_white">
    <div class="goods_t">
      <div class="clearfix gt_head">
        <span class="fl">
          <i class="fa fa-search fa-fw"></i>筛选搜索
        </span>
        <div class="fr">
          <el-button size="mini">重置</el-button>
          <el-button type="primary" size="mini">查询结果</el-button>
        </div>
      </div>
      <ul class="gt_search">
        <li class="clearfix">
          <div class="clearfix m_t10 fl">
            <span class="fl gt_name">输入搜索</span>
            <el-input
              class="fl m_l10"
              style="width:217px;"
              placeholder="商品名称"
              v-model="input10"
              clearable
            ></el-input>
          </div>
          <div class="clearfix m_t10 fl">
            <span class="fl gt_name">商品货号</span>
            <el-input
              class="fl m_l10"
              style="width:217px;"
              placeholder="商品货号"
              v-model="input10"
              clearable
            ></el-input>
          </div>
          <div class="clearfix m_t10 fl">
            <span class="fl gt_name">商品货号</span>
            <el-select class="m_l10" v-model="value4" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="clearfix m_t10 fl">
            <span class="fl gt_name">商品货号</span>
            <el-select class="m_l10" v-model="value4" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="clearfix m_t10 fl">
            <span class="fl gt_name">商品货号</span>
            <el-select class="m_l10" v-model="value4" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="clearfix m_t10 fl">
            <span class="fl gt_name">商品货号</span>
            <el-select class="m_l10" v-model="value4" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
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
          :data="goodsLists"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" label width="50" align="center"></el-table-column>
          <el-table-column prop="number" label="编号" width="80" align="center"></el-table-column>
          <el-table-column prop="pic" label="商品图片" width="120" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.pic" alt style="width: 50px;height: 50px">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="price" label="价格/货号" align="center"></el-table-column>
          <el-table-column prop="sign" label="标签" align="center">
            <template slot-scope="scope">
              <div v-for="(g,index) in scope.row.signs" :key="index" :index="index">
                <span v-if="index==0">上架</span>
                <span v-if="index==1">新品</span>
                <span v-if="index==2">推荐</span>
                <el-switch class="m_l5" v-model="g.is_true"></el-switch>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" align="center"></el-table-column>
          <el-table-column prop="sku" label="SKU库存" align="center">
            <template slot-scope="scope">
              <el-button
                @click="skuHandleEdit(scope.row.sku)"
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="sale" label="销量" align="center"></el-table-column>
          <el-table-column prop="state" label="审核状态" align="center"></el-table-column>
          <el-table-column prop="operation" label="操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button
                class="m_t5 m_r5"
                style="margin-left:0;"
                size="mini"
                v-for="(option,index) in scope.row.operation"
                :key="index"
                :index="index"
                :type="index==3?'danger':'plain'"
              >{{option}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="m_t20 clearfix">
          <div class="fl">
            <el-button @click="toggleSelection([goodsLists[1], goodsLists[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
          </div>
          <div class="fr">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 8, 10, 20,50,,100,200,500]"
              :page-size="2"
              layout="total, sizes, prev, pager, next, jumper"
              :total="goodsLists.length"
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
// const cityOptions = ['上海', '北京', '广州', '深圳'];
import GoodsCell from "@/components/GoodsCell";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      input10: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value4: "",
      goodsLists: [
        {
          number: "02",
          pic:
            "http://img.zcool.cn/community/01b4fa55de8e0532f875a132d6f99c.jpg@1280w_1l_2o_100sh.jpg",
          name: "华为",
          price: "2390",
          signs: [{ is_true: false }, { is_true: true }, { is_true: true }],
          sort: "10",
          sku: [{skuid:12,skudescribe:123,skuprice:2399,skutype:'16G',skusigns:[{ is_true: false }, { is_true: true }, { is_true: true }]}],
          sale: "0",
          state: "未审核",
          operation: ["查看", "编辑", "日志", "删除"]
        }
      ]
    };
  },
  computed: {
    ...mapState({
      skuOpen: state => state.layout.skuOpen,
      skuList: state => state.layout.skuList,
      currentPage:state=>state.layout.currentPage,
    })
    // ...mapState(['skuList','skuOpen'])
  },
  components: {
    GoodsCell: GoodsCell
  },
  methods: {
    ...mapMutations(["skuHandleEdit"]),
    // selected选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页
    ...mapMutations(["handleSizeChange",'handleCurrentChange']),
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // }
  }
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
</style>
<template>
  <div class="index_box">
    <div class="index_top clearfix">
      <div class="index_l fl">
        <!-- info:{{info}} -->
        <ul class="r_top clearfix">
          <li class="rt_number clearfix">
            <img class="rt_img" src="@/assets/img/index/index_person.png" alt>
            <div class="rt_message">
              <h3>1430</h3>
              <p>总订单数量</p>
            </div>
          </li>
          <li class="rt_number clearfix">
            <img class="rt_img" src="@/assets/img/index/index_bell.png" alt>
            <div class="rt_message">
              <h3>5400</h3>
              <p>总SKU数量</p>
            </div>
          </li>
        </ul>
        <div class="lt_map m_t20">
          <ve-map :data="mapChartData" :settings="mapChartSettings"></ve-map>
          <!-- <ve-pie :data="cakeChartData" :height="cakeHeight" :settings="cakeChartSettings"></ve-pie> -->
        </div>
      </div>
      <div class="index_r fr">
        <div class="lt_message clearfix">
          <div class="lt_name_top">
            <span class="lt_name">张</span>
            <div class="lt_name_message">
              <p>张三</p>
              <p>阳光印网总公司-技术部</p>
            </div>
          </div>
          <div class="lt_time_bottom">
            <p>上次登录时间:2018年9月12日 11：22：20</p>
            <p>上次登录IP:192.1699.1.1</p>
          </div>
        </div>
        <div class="rb_list_box m_t20">
          <h3 class="rb_title">消息中心</h3>
          <ul class="rb_lists">
            <li class="clearfix"  v-for="newsinfo in newsList.Rows"  :key="newsinfo.ID" @click="getNewsDetails({newsinfo:newsinfo,userId:userInfo.userId})">
              <span class="mr_5 rb_li_read" :class="[newsinfo.ReadStatus!='已读'?'activeClass':'']">[{{newsinfo.ReadStatus}}]</span> 
              <p class="rb_li_tit">{{newsinfo.MCTTitle}}</p>
              <span class="fr rb_li_time"> {{newsinfo.CreateTime}}</span>
            </li>
          </ul>
          <div class="m_t20 clearfix">
            <div class="fr">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="sizePage"
                layout="total, prev, pager, next, jumper"
                :total="newsList.Total"
              ></el-pagination>
            </div>
          </div>
          <NewsCell></NewsCell>
        </div>
      </div>
    </div>

    <div class="index_foot m_t20 clearfix">
      <div class="fl if_l if_normal">
        <ve-histogram :data="lineChartData"></ve-histogram>
      </div>
      <div class="fl if_r if_normal">
        <ve-line :data="brokenChartData" :settings="brokenChartSettings"></ve-line>
      </div>
    </div>
  </div>
</template>

<script>
import NewsCell from "@/components/NewsCell";
import { mapState, mapActions } from "vuex";
import { startLoading } from "@/utils/loading";
export default {
  data() {
    this.brokenChartSettings = {
      axisSite: { right: ["下单率"] },
      yAxisType: ["KMB", "percent"],
      yAxisName: ["数值", "比率"]
    };

    this.mapChartSettings = {
      position: "china",
      label: false,
      dimension: "位置",
      metrics: ["人口", "面积"],
      dataType: {
        面积: "KMB"
      },
      itemStyle: {
        normal: {
          areaColor: "#95cdf5",
          borderColor: "#fff"
        }
      },
      zoom: 1
    };
    return {
      // info:'',
      lineChartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      brokenChartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      mapChartData: {
        columns: ["位置", "税收", "人口", "面积"],
        rows: [
          { 位置: "吉林", 税收: 123, 人口: 123, 面积: 92134 },
          { 位置: "北京", 税收: 1223, 人口: 2123, 面积: 29234 },
          { 位置: "上海", 税收: 2123, 人口: 1243, 面积: 94234 },
          { 位置: "浙江", 税收: 4123, 人口: 5123, 面积: 29234 }
        ]
      }
    };
  },
  mounted() {
     // 加载中loading
      startLoading();
    this.getNewsList({ sizePage:this.sizePage, currentPage:this.currentPage, userId:this.userInfo.userId, sourceId:1 });
  },
  components: {
    NewsCell: NewsCell
  },
  methods: {
    // handleSizeChange  //改变每页显示数量时调用
    handleSizeChange(val) {
      // 加载中loading
      startLoading();
      // 请求size页面数据
      this.$nextTick(() =>
        this.getNewsList({ sizePage: val, currentPage: this.currentPage,userId:this.userInfo.userId, sourceId:1 })
      );
    },
    // handleCurrentChange    //点击下一页和点击页码时执行
    handleCurrentChange(val) {
      // 加载中loading
      startLoading();
      // 请求current页面数据
      this.getNewsList({ sizePage: this.sizePage, currentPage: val,userId:this.userInfo.userId, sourceId:1 });
    },
    ...mapActions(["getNewsList","getNewsDetails"]),
    // ...mapMutations(['getNewsDetails'])
  },
  computed: {
    ...mapState({
      // 箭头函数可使代码更简练
      userInfo: state => state.user.userInfo,
      currentPage: state => state.index.currentPage,
      sizePage: state => state.index.sizePage,
      newsList: state => state.index.newsList,
      // classifyList1: state => state.goods.classifyList1,
      // classifyList2: state => state.goods.classifyList2,
      // fullscreenLoading: state => state.basic.fullscreenLoading
    })
  }
};
</script>
<style scoped>

.index_l {
  width: 38%;
  margin-right: 2%;
}
.index_r {
  width: 60%;
}
.index_box {
  padding: 20px;
}
.lt_message,
.lt_map,
.if_l,
.if_r,
.rb_list_box,
.rt_number {
  border: 1px solid #bbb;
  background: #fff;
}
.lt_map {
  height: 400px;
  padding: 10px;
}

.lt_message {
  padding: 20px;
}
.lt_name_top {
  border-bottom: 1px solid #bbb;
  position: relative;
}
.lt_name {
  background: #ff0;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px solid #bbb;
  font-size: 30px;
  line-height: 50px;
  text-align: center;
  color: #000;
  display: block;
  position: absolute;
  left: 5px;
  top: 0;
}
.lt_name_message {
  padding: 6px 0 12px 75px;
}
.lt_name_message p {
  line-height: 20px;
  font-size: 14px;
  color: #333;
}
.lt_time_bottom {
  line-height: 20px;
  font-size: 14px;
  color: #333;
  padding: 10px 10px 0;
}
.rt_number {
  width: 48%;
  float: left;
  margin-right: 4%;
  position: relative;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  overflow: hidden;
  height: 80px;
}
.r_top .rt_number:nth-child(2) {
  margin-right: 0;
}
.rt_img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  height: 80px;
}
.rt_message {
  padding: 13px 0 13px 100px;
}
.rt_message h3 {
  line-height: 30px;
  font-size: 28px;
  font-weight: bold;
  color: #333;
  padding-left: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rt_message p {
  line-height: 24px;
  font-size: 14px;
  color: #333;
  padding-left: 25%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rb_list_box {
  padding: 10px;
  height: 330px;
}
.rb_title {
  line-height: 24px;
  font-size: 16px;
  color: #000;
  padding: 3px 0;
  border-bottom: 1px solid #bbb;
}
.rb_lists {
  padding: 5px 0;
  height: 240px;
}
.rb_lists li {
  line-height: 24px;
  font-size: 14px;
  color: #333;
  position: relative;
}
.rb_li_read{
  position: absolute;
  left:0;
  top:0;
}
.rb_li_time{
  position: absolute;
  right:0;
  top:0;
}
.rb_li_tit{
  margin-left:40px;
  margin-right:160px;
  overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
.rb_lists li span.activeClass{
  color: red;
  display: inline-block;
}
.if_normal {
  width: 49%;
  margin-right: 2%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding: 10px;
}
.if_normal:nth-child(2) {
  margin-right: 0;
}
</style>
/** 
 * 自定义组件参考文档
 * https://cn.vuejs.org/v2/guide/components-registration.html
*/
Vue.component('avue-echart-test', {
  template: `<div :style="{fontSize:fontSize,color:'#fff'}">
            <h2>自定义组件</h2>
            <h3>我是参数:{{option.data}}</h3>
    </div>`,
  props: {
    component: Object
  },
  computed: {
    option () {
      return this.component.option || {}
    },
    fontSize () {
      return (this.option.fontSize || 30) + 'px'
    }
  }
})

/**
 * 自定义Trend
 */
Vue.component('avue-echart-trend',{
   template:`
      <div class="chart-trend" :style="{backgroundColor:component.option.backgroundColor}">
          {{result.term }}
          <span>{{ rate }}%</span>
          <i :class="'el-icon-caret-'+trend"></i>
     </div>`,
  watch:{
      "time":function(newValue,oldValue){
         if(newValue!=oldValue && this.dataType==1){
             clearInterval(this.flushData)
             this.flush();
         }
      },
      "data":{
        handler(newValue,oldValue){
          if(newValue!=oldValue){
            this.result = newValue;
             this.getRate();
          }
         },
          deep:true
      },
      "dataType":function(newValue,oldValue){
        this.queryData(newValue);
      },
      "component.option.backgroundColor":function(newValue,oldValue){
      }
  },
    props:{
     "time":{
         type:Number,
         default:5000
     }, 
     "url":{
        type:String, 
     }, 
     "component":{
        type:Object
     }, 
     "data":{
        type:Object
     },
     "dataType":{
          type:Number
     },
     "dataMethod":{
        type:String,
        default:"GET"
     }
    },
    data(){
        return {
          trend:"top",
          rate:0,
          result:{},
          flushData:null
        }
    },
    mounted(){
        this.queryData(this.dataType);
    },
    methods:{
        queryData(type){
            //1:请求远程接口数据
            if(type==1){
              this.getRemoteData();
            }else{
              clearInterval(this.flushData);
              this.flushData = null;
              this.result = this.data;
              this.getRate();
            }
        },
      getRate(){
           let data = this.result;
           let fixed=data.fixed || 2;
           let type =  data.value >= data.target;
           this.trend = type ? 'top' : 'bottom';
           this.rate = ((data.percentage === null || data.percentage === undefined) ? 
                        Math.abs(data.value - data.target)/ data.target*100 :
                        data.percentage).toFixed(fixed)
      },
      flush(){
         this.flushData = setInterval(()=>{
             this.getRemoteData();
         },this.time)
      },
      getRemoteData(){
        axios({
          url: this.url,
          method: this.dataMethod
        }).then(res=>{
            this.result = res.data.result.result;
            this.getRate();
        });
        if(!this.flushData){
              this.flush();
        }
      }
    }

});



Vue.component('avue-echart-slippage', {
    template: `<div style="position: relative;overflow: hidden;height: 100%;width: 100%">
     <div v-for="(item,index) in newDataList" style="height: 20%;width: 80%;position: relative;overflow: hidden;
  transition: top 0.5s;" :option="animateOption" :style="{top}" :key="index">
              <img :src="item.img_url" alt="banner" style="height: 100%;width: 100%;text-align: center;">
          </div>
</div>`,
    props: {
        component: Object
    },
    data() {
        return {
            animateOption: {
                bannData: this.dataList,
            },
            dataList: [
                {img_url: 'img/source/zhonghecompany/baoyushe.png'},
                {img_url: 'img/source/zhonghecompany/yuchengshe2.png'},
                {img_url: 'img/source/zhonghecompany/yuchengshe1.png'},
                {img_url: 'img/source/zhonghecompany/yufeishe.png'},
                {img_url: 'img/source/zhonghecompany/fenmianshe.png'},
            ],
            activeIndex: 0,
            animate: true,
            timer2: '',
            timeOut: ''
        }
    },
    created(){
        const timer = setInterval(this.scroll,2000)
        this.$once('hook:beforeDestroy', () => {
            clearInterval(timer)
        })

    },
    computed: {
        option () {
            console.log("0 option")
            return this.component.option || {}
        },
        top() {
            return -this.activeIndex * 20 + '%';
        },
        newAnimateOption(){
            this.animateOption.bannData = this.option.bannData
            console.log(this.animateOption)
            console.log(this.option.bannData)
            return this.animateOption
        },
        newDataList(){
            console.log(this.option)
            if(this.option.bannData) {
                this.dataList = eval(this.option.bannData)
            }
            console.log("this.dataList", this.dataList)
            return this.dataList
        },
    },
    mounted() {
        this.timer2 = setInterval(() => {
            if(this.activeIndex < this.dataList.length) {
                this.activeIndex += 1
                // this.dataList.push(this.dataList[this.activeIndex])
            } else {
                this.activeIndex = 0
            }

        }, 2000);
    },
    methods: {
        scroll(){
            this.animate = true
            this.timeOut = setTimeout(() => {
                this.dataList.push(this.dataList[0])
                this.dataList.shift()
                this.animate = false
            },2000)
        }
    },
    beforeDestroy() {
        if(this.dataList.length == 0){
            clearInterval(this.timer)
        }
        clearInterval(this.timer2)
        clearTimeout(this.timeOut)
    }
})

//折柱图
Vue.component('avue-echart-terminal', {
    template: ` <div class="diagram" ref="terminalchart" :style = styleObject></div>`,
    props: {
        component: Object,
        time:{
            type:Number,
            default:5000
        },
        url:{
            type:String,
        },
        dataType:{
            type:Number
        },
        data:{},
        dataMethod:{
            type:String,
            default:"GET"
        },
    },
    data() {
        return {
            option: [],
            flushData:null,
            result:null,
            instance:null
        }
    },
    computed:{
        styleObject: function () {
            return {
                width:this.component.width+"px",
                height:this.component.height+"px"
            }
        }
    },
    watch: {
        "component.width": function(newValue,oldValue){
            if(newValue!=oldValue){
                if(this.instance){
                    this.instance.resize();
                }
            }
        },
        "component.height": function(newValue,oldValue){
            if(newValue!=oldValue){
                if(this.instance){
                    this.instance.resize();
                }
            }
        },
        time:function(newValue,oldValue){
            if(newValue!=oldValue && this.dataType==1){
                clearInterval(this.flushData)
                this.flush();
            }
        },
        data:{
            handler(newValue,oldValue){
                if(newValue!=oldValue){
                    this.result = newValue;
                    this.drawBar(this.result)
                }
            },
            deep:true
        },
        dataType:function(newValue,oldValue){//1:请求远程接口数据
            console.log(newValue)
            if(newValue==1){
                this.getRemoteData();
            }else{
                clearInterval(this.flushData);
                this.flushData = null;
                this.result = this.data;
                this.drawBar(this.result);
            }
        },
    },
    methods: {
        drawBar(data) {
            let myCharts = echarts.init(this.$refs.terminalchart)
            myCharts.setOption(data)
            window.addEventListener('resize', function () {
                myCharts.resize()
            })
            this.instance = myCharts;
        },
        flush(){
            this.flushData = setInterval(()=>{
                this.getRemoteData();
            },this.time)
        },
        getRemoteData(){
            axios({
                url: this.url,
                method: this.dataMethod
            }).then(res=>{
                this.result = res.data.data;
                this.drawBar(this.result)

            });
            if(!this.flushData){
                this.flush();
            }
        }
    },
    mounted(){
        this.result = this.data;
        this.drawBar(this.result);

    }
})

//标注地图
Vue.component('avue-echart-markMap', {
    template: ` <div class="map" ref="markChart" :style = styleObject></div>`,
    props: {
        component: Object,
        time:{
            type:Number,
            default:5000
        },
        url:{
            type:String,
        },
        dataType:{
            type:Number
        },
        data:{},
        dataMethod:{
            type:String,
            default:"GET"
        },
    },
    data() {
        return {
            option: [],
            flushData:null,
            result:null,
            instance:null
        }
    },
    computed:{
        styleObject: function () {
            return {
                width:this.component.width+"px",
                height:this.component.height+"px"
            }
        }
    },
    watch: {
        "component.width": function(newValue,oldValue){
            if(newValue!=oldValue){
                if(this.instance){
                    this.instance.resize();
                }
            }
        },
        "component.height": function(newValue,oldValue){
            if(newValue!=oldValue){
                if(this.instance){
                    this.instance.resize();
                }
            }
        },
        time:function(newValue,oldValue){
            if(newValue!=oldValue && this.dataType==1){
                clearInterval(this.flushData)
                this.flush();
            }
        },
        data:{
            handler(newValue,oldValue){
                if(newValue!=oldValue){
                    this.result = newValue;
                    this.drawMap(this.result)
                }
            },
            deep:true
        },
        dataType:function(newValue,oldValue){//1:请求远程接口数据
            console.log(newValue)
            if(newValue==1){
                this.getRemoteData();
            }else{
                clearInterval(this.flushData);
                this.flushData = null;
                this.result = this.data;
                this.drawMap(this.result);
            }
        }
    },
    methods: {
        drawMap(data) {
            let myCharts = echarts.init(this.$refs.markChart)
            myCharts.setOption({
                "title": {
                    "text": "一汽汽车销售地域分布示意图",
                    "subtext":"截至2018年05月04日",
                    "left": "center"
                },
                "tooltip": {
                    "alwaysShowContent": true,
                    "enterable": true,
                    "formatter": function (params) {
                        var value = params.value;
                        var a = "<br/> <a href='http://www.baidu.com' style='color: red'>查看详情</a>"
                        return params.name + ": " + value[2] + a;
                    }
                },

                "geo": {
                    "map": "china",
                    "roam": true,
                    "layoutCenter" : ['50%', '50%'],
                    "layoutSize" : "100%",
                    "silent": true,
                    "itemStyle": {
                        "color": "#004981",
                        "borderColor": "rgb(54,192,118)"
                    },
                    "label": {
                        "normal": {
                            "show": true, // 是否显示对应地名
                            "textStyle": {
                                "color": "rgba(255,255,255,0.8)"
                            }
                        },
                    },
                },

                "series": [{
                    "type": "effectScatter",
                    "coordinateSystem": "geo",
                    "itemStyle": {
                        "color": function (params) {
                            var color = "";
                            var value = params.value;
                            if (value[2] < 50) {
                                color = "red"
                            }
                            if (value[2] >= 50 && value[2] < 100) {
                                color = "yellow"
                            }
                            if (value[2] >= 100) {
                                color = "green"
                            }
                            return color;
                        }
                    },
                    "data": data
                }]
            })
            window.addEventListener('resize', function () {
                myCharts.resize()
            })
            this.instance = myCharts;
        },
        flush(){
            this.flushData = setInterval(()=>{
                this.getRemoteData();
            },this.time)
        },
        getRemoteData(){
            axios({
                url: this.url,
                method: this.dataMethod
            }).then(res=>{
                this.result = res.data;
                this.drawMap(this.result)

            });
            if(!this.flushData){
                this.flush();
            }
        },

    },
    mounted(){
        this.result = this.data;
        this.drawMap(this.result);
    }
})

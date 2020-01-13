Vue.component('avue-echart-coolrdMap',{
  template:`
  <div ref="geoCoordMap" :style=styleObject>
  </div>
  `,
  props:{
    "option":{
       type:Object
    },
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
    },
    "dataType":{
         type:Number
    },
    "dataMethod":{
       type:String,
       default:"GET"
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
   watch:{
    "option.geoCoordType":function(newValue,oldValue){
        if(newValue!=oldValue){
           this.initMap(this.mapArr);
        }
    }, 
    "option.coolrdProvince":{
        handler(){
          this.initMap(this.mapArr);
        },
          deep:true
    }, 
    "component.width":function(newValue,oldValue){
        if(newValue!=oldValue){
          if(this.instance){
            this.instance.resize();
          }
        }
    },
    "component.height":function(newValue,oldValue){
      if(newValue!=oldValue){
        if(this.instance){
          this.instance.resize();
        }
      }
    },
    "time":function(newValue,oldValue){
      if(newValue!=oldValue && this.dataType==1){
          clearInterval(this.flushData)
          this.flush();
      }
   }, 
    "data":{
      handler(newValue,oldValue){
        if(newValue!=oldValue){
          this.mapArr = newValue;
           this.initMap(this.mapArr);
        }
       },
        deep:true
    },
    "dataType":function(newValue){
        this.queryData(newValue);
    }
   }, 
  data(){
   return {
      mapArr:[],
      flushData:null,
      instance:null
   }
  },
  mounted(){
    EchartsMap.registerMap("china",()=>{
       this.queryData(this.dataType);
    })
    
  },
  methods:{
    queryData(type){
      //1:请求远程接口数据
      if(type==1){
        this.getRemoteData();
      }else{
        clearInterval(this.flushData);
        this.flushData = null;
        this.mapArr = this.data;
        this.initMap(this.mapArr);
      }
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
          this.mapArr = res.data.result;
          this.initMap(this.mapArr);
      });
      if(!this.flushData){
            this.flush();
      }
    },
    initMap(mapArr){
     let option = GEO_COORD_MAP.initMap(mapArr,this.option.geoCoordType,this.option.coolrdProvince.label)
     let myChart = echarts.init(this.$refs.geoCoordMap);
        window.addEventListener('resize', function () {
                myChart.resize();
        });
        
       myChart.hideLoading();
       myChart.setOption(option);
       this.instance = myChart; 
          


    }

  }
    
})
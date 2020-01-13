Vue.component('avue-echart-province',{
    template:`
            <el-form-item label="地图选择">
                    <el-select v-model="selectProvince" filterable @change="handleProvinceSelect" placeholder="请选择区域选择">
                        <el-option v-for="item in provincelist" :key="item.value" :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
             </el-form-item>
    `,
    data(){
        return {
           "selectProvince":0, //默认选择城市
        }
    },
    mounted(){
        this.selectProvince = this.getProvinceByName(this.value.name).value;
    },
    props:{
        "provincelist":{
            type:Array
        },
        "value":{
            type:Object
        }
    },
    methods:{
        //通过省份名称返回val
        getProvinceByName(provinceName){
            let provinceSelect = null;
            let result = dicOption.provinceList.find(item=>item.name==provinceName)
            if(result){
                provinceSelect = result;
            }
            return provinceSelect;
          
          },
        handleProvinceSelect(value){
                //异步加载地图
                let selectProvince = dicOption.provinceList[value];
                this.selectProvince = selectProvince.value;
                EchartsMap.registerMap(selectProvince.name,()=>{
                     this.$emit('input',selectProvince)
                });
        }
    }      
})
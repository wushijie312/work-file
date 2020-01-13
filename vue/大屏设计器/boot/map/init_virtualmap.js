let VirtualMap = {};

VirtualMap.initMap = function (data,provinceName) {
 

    //求数组里的最大值
    let yMax = 0;
    for (let j = 0; j < data.length; j++) {
        if (yMax < data[j].value) {
            yMax = data[j].value;
        }
    }

    let option = {
        animation: true,
        tooltip: {
            show: true
        },
        visualMap: {
            min: 0,
            max: yMax,
            text: ['高', '低'],
            orient: 'horizontal',
            itemWidth: 15,
            itemHeight: 200,
            right: 0,
            bottom: 30,
            inRange: {
                color: ['#75ddff', '#0e94eb']
            },
            textStyle: {
                color: 'white'
            }
        },
        series: [
            {
                name: '数据名称',
                type: 'map',
                mapType: provinceName,
                selectedMode: 'multiple',
                tooltip: {
                    trigger: 'item',
                    formatter: function(data){
                        let value = data.value;
                        if(!value){
                            value = 0;
                        }
                        return data.name+'<br/>'+value+'(件)';
                    },
                    textStyle: {
                        fontSize: 20
                    }

                },
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: '#0e94eb',
                        label: {
                            show: false
                        }
                    },
                    emphasis: { // 也是选中样式
                        borderWidth: 1,
                        borderColor: '#fff',
                        backgroundColor: 'red',
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data: data,
            }
        ]
    };
    return option;
}
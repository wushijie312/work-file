let MAP_DATA={
    //折柱图数据
    lineBarData:{
        "title": {
            "left": "left",
            "text": "概率",
            "show": false
        },
        "tooltip": {
            "trigger": "axis",
            "formatter": "{a}:{c}",
            "axisPointer": {
                "type": "cross",
                "crossStyle": {
                    "color": "#fff",
                }
            }
        },
        "grid": {
            "show": false,
            "top": "30",
            "bottom": "60",
            "right": "60",
            "left": "60"
        },
        "legend": {
            "show": true,
            "selectedMode": "single",
            "top": 5,
            "left": 100,
            "textStyle": {
                "color": "#DDA0DD",
                "fontSize": 20
            },
            "itemGap": 20,
            "data": [
                "设备一",
                "设备二",
                "设备三"
            ],
            "inactiveColor": "#fff"
        },
        "xAxis": [
            {
                "type": "category",
                "data": [
                    "济南",
                    "青岛",
                    "烟台",
                    "威海",
                    "潍坊",
                    "东营",
                    "日照",
                    "滨州",
                    "莱芜",
                    "淄博",
                    "德州",
                    "聊城",
                    "临沂",
                    "泰安",
                    "菏泽",
                    "济宁",
                    "枣庄"
                ],
                "axisPointer": {
                    "type": "shadow"
                },
                "axisTick": {
                    "show": true,
                    "interval": 0
                }
            }
        ],
        "yAxis": [
            {
                "type": "value",
                "name": "数量",
                "show": true,
                "interval": 50
            },
            {
                "type": "value",
                "name": "概率",
                "min": 0,
                "max": 100,
                "interval": 10,
                "axisLabel": {
                    "formatter": "{value} %"
                }
            }
        ],
        "series": [
            {
                "name": "设备一",
                "type": "bar",
                "data": [
                    900,
                    800,
                    700,
                    680,
                    650,
                    640,
                    600,
                    570,
                    680,
                    650,
                    640,
                    600,
                    570,
                    450,
                    400,
                    380,
                    200
                ],
                "barWidth": "50%"
            },
            {
                "name": "设备一",
                "type": "line",
                "yAxisIndex": 1,
                "data": [
                    75,
                    65,
                    85,
                    66,
                    45,
                    55,
                    56,
                    42,
                    78,
                    69,
                    70,
                    36,
                    42,
                    50,
                    65,
                    75,
                    20
                ],
                "symbolSize": 10,
                "itemStyle": {
                    "normal": {
                        "color": "#DDA0DD"
                    }
                }
            },
            {
                "name": "设备二",
                "type": "bar",
                "data": [
                    700,
                    680,
                    650,
                    640,
                    600,
                    570,
                    680,
                    650,
                    640,
                    600,
                    570,
                    450,
                    400,
                    380,
                    300,
                    900,
                    500
                ],
                "barWidth": "50%"
            },
            {
                "name": "设备二",
                "type": "line",
                "yAxisIndex": 1,
                "data": [
                    75,
                    65,
                    85,
                    66,
                    45,
                    55,
                    56,
                    42,
                    78,
                    69,
                    70,
                    36,
                    42,
                    50,
                    65,
                    75,
                    50
                ],
                "symbolSize": 10,
                "itemStyle": {
                    "normal": {
                        "color": "#87CEFA"
                    }
                }
            },
            {
                "name": "设备三",
                "type": "bar",
                "data": [
                    600,
                    570,
                    680,
                    650,
                    640,
                    600,
                    570,
                    450,
                    400,
                    380,
                    300,
                    900,
                    800,
                    700,
                    680,
                    650,
                    400
                ],
                "barWidth": "50%"
            },
            {
                "name": "设备三",
                "type": "line",
                "yAxisIndex": 1,
                "data": [
                    75,
                    65,
                    85,
                    66,
                    45,
                    55,
                    56,
                    42,
                    78,
                    69,
                    70,
                    36,
                    42,
                    50,
                    65,
                    75,
                    50
                ],
                "symbolSize": 10,
                "itemStyle": {
                    "normal": {
                        "color": "#CD5C5C"
                    }
                }
            }
        ]
    }
};

//标记地图数据
var markGeoCoordMap = [{
    "name": "海门",
    "value": [121.15, 31.89, 112],
}, {
    "name": "鄂尔多斯",
    "value": [109.781327, 39.608266, 50],
}, {
    "name": "招远", "value": [120.38, 37.35, 14],
},{
    "name": "舟山", "value": [122.207216, 29.985295, 121],
},{
    "name": "上海",
    "value": [121.47, 31.23, 55]
},
    {
        "name": "北京",
        "value": [116.40, 39.90, 110]
    },
    {
        "name": "重庆",
        "value": [106.55, 29.56, 32]
    }
];
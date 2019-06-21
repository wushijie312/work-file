<template>
  <ve-map :after-config="afterConfig"/>
</template>
<script>
export default {
  data () {
    return {
      config: {
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: true,//鼠标滑过是否显示该位置名称
              color:"#666"//设置文字颜色
            },
          },
          itemStyle: {
            normal: {
              borderColor: '#fff',//地图border颜色白色
              areaColor: '#95cdf5',//地图背景浅蓝
            },
            emphasis: {
              areaColor: '#409EFF',//鼠标滑过地图颜色
            },
          },
        },
        series: [{
          name: '门店',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: [
            {'name': '海门', 'value': [121.15, 31.89, 9]},
            {'name': '大庆', 'value': [125.03, 46.58, 279]},
            {'name': '河北', 'value': [122, 46.58, 279]},
          ],
          symbolSize: 10,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
          },
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              color: '#F4E925',
              // shadowBlur: 4,
              // shadowColor: '#000',
            },
          },
        }],
      },
    }
  },
  methods: {
    afterConfig (options) {
      options = {...this.config}
      return options
    },
  },
}
</script>
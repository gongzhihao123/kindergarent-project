<template>
  <div :class="className" :style="{height:height,width:width}" ref="chinaEchart" />
</template>

<script>
import echarts from 'echarts' // echarts theme
import resize from './mixins/resize'
// require('echarts/map/js/china.js')
import './../../../../../node_modules/echarts/map/js/china.js'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$refs.chinaEchart)
      window.onresize = this.chart.resize
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        backgroundColor: '#02AFDB',
        dataRange: {
          show: false,
          min: 0,
          max: 1000,
          text: ['High', 'Low'],
          realtime: true,
          calculable: true,
          color: ['orangered', 'yellow', 'lightskyblue']
        },
        geo: { // 这个是重点配置区
          map: 'china', // 表示中国地图
          roam: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: 'rgba(0,0,0,0.4)'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)'
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },
        series: [{
          type: 'scatter',
          coordinateSystem: 'geo' // 对应上方配置
        },
        {
          name: '启动次数', // 浮动框的标题
          type: 'map',
          geoIndex: 0,
          data: [{
            'name': '北京',
            'value': 599
          }, {
            'name': '上海',
            'value': 142
          }, {
            'name': '黑龙江',
            'value': 44
          }, {
            'name': '深圳',
            'value': 92
          }, {
            'name': '湖北',
            'value': 810
          }, {
            'name': '四川',
            'value': 453
          }]
        }
        ]
      })
    }
  }
}
</script>

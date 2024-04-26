<script setup lang="ts">
import {onMounted} from "vue";

import * as echarts from "echarts";//* 代表引入所有
import type {EChartsOption} from "echarts";

onMounted(() => {
  const chartDom = document.getElementById('login_data')!;
  const myChart = echarts.init(chartDom);
  let option: EChartsOption;
  let bg = getComputedStyle(document.body).getPropertyValue("--bg")
  let chartColor1 = getComputedStyle(document.body).getPropertyValue("--charts_color1")
  let chartColor2 = getComputedStyle(document.body).getPropertyValue("--charts_color2")
  // let colorText1 = getComputedStyle(document.body).getPropertyValue("--sun_text")
  let colorText1 = getComputedStyle(document.body).getPropertyValue("--color-text-1")

  option = {
    color: [chartColor1, chartColor2],
    title: {
      text: '用户数据',
      textStyle: {
        color: colorText1,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: colorText1
        }
      }
    },
    legend: {
      textStyle: {
        color: colorText1,
      },
      data: ['登录', '注册',]
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        data: props.dateList
      }
    ],
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: bg
        }
      }
    },
    series: [
      {
        name: '登录',
        type: 'line',
        // stack: '总量',
        areaStyle: {},
        smooth: true,//线条比较平滑
        emphasis: {
          focus: 'series'
        },
        label: {
          show: true,
          position: 'top'
        },
        // data: [120, 132, 101, 134, 90, 230, 210]
        data: props.loginList
      },
      {
        name: '注册',
        type: 'line',
        // stack: '总量',
        areaStyle: {},
        smooth: true, //线条比较平滑
        emphasis: {
          focus: 'series'
        },
        label: {
          show: true,
          position: 'top'
        },
        // data: [220, 182, 191, 234, 290, 330, 310]
        data: props.signList
      }
    ]
  };

  //监听的时候,窗口发生了变化
  window.addEventListener("resize", function () {
    //重新绘制一下
    console.log('resizing');
    myChart.resize()
  })

  myChart.setOption(option);

})


interface Props {
  dateList: string[]
  loginList: number[]
  signList: number[]
  height: number
}

const props = defineProps<Props>()

const {height = 300} = props
</script>

<template>
  <div id="login_data" :style="{height:height +'px'}">
  </div>
</template>

<style scoped lang="scss">

</style>
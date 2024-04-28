<script setup lang="ts">
import * as echarts from "echarts";//* 代表引入所有
import type {EChartsOption} from "echarts";
import {onMounted, ref} from "vue";
import router from "@/router";

interface Props {
  dateList: string[]
  countList: Array<Array<number>>
  theme: boolean
}

const props = defineProps<Props>()

const top = ref(60)

onMounted(() => {
  let color = "#000000"
  let inRangeColor = [
    "#ebedf0", "#c6e48b", "#7bc95f", "#32af4a",
    "#1a792c", "#0f5e1e", "#0f491a", "#02340c"
  ]

  let borderColor = "#fff";
  let textColor = "#555555"

  if (!props.theme) {
    color = "#5a5a5a"
    textColor = "#f0eeee"
    inRangeColor = [
      "#404148", "#c6e48b", "#7bc96f", "#32af4a",
      "#1a792c", "#0f5e1e", "#0f491a", "#02340c"
    ]
    borderColor = "#222429"
  }
  let title = null
  // if (props.isTitle) {
  //   title = {
  //     text: "文章日历",
  //     textStyle: {
  //       color: textColor
  //     },
  //     padding: [15, 5]
  //   }
  // } else {
  //   top.value = 20
  // }

  let chart = document.getElementById('article_data');
  if (!chart) {
    return
  }

  let myChart = echarts.init(chart, null, {locale: "ZH"});
  let option: EChartsOption;

  option = {
    title: {
      // text: "文章日历",
      textStyle: {
        color: textColor
      },
      padding: [15, 5]
    },
    tooltip: {
      padding: 10,
      backgroundColor: "#555",
      borderColor: "#777",
      borderWidth: 1,
      formatter: function (e) {
        e = e.value;
        return '<div style="font-size:14px;color:white">'
            + e[0] + ":" + e[1] + "</div>"
      }
    },
    visualMap: {
      show: !0,
      showLabel: !0,
      categories: [0, 1, 2, 3, 4, 5, 6, 6],
      calculable: !0,
      inRange: {
        symbol: 'rect',
        color: inRangeColor
      },
      itemWidth: 12,
      itemHeight: 12,
      orient: "horizontal",
      left: "center",
      bottom: 0,
      textStyle: {
        color: color
      }
    },
    calendar: {
      top: 20,
      right: "center",
      bottom: 30,
      cellSize: [13, 13],
      range: props.dateList,
      splitLine: {show: !1},
      itemStyle: {
        borderWidth: 2,
        color: "#196127",
        borderColor: borderColor
      },
      yearLabel: {show: !1},
      dayLabel: {
        formatter: "{start} 1st",
        nameMap: "cn",
        fontSize: 11,
        color: color
      },
      monthLabel: {
        nameMap: "cn",
        fontSize: 11,
        color: color
      }
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      calendarIndex: 0,
      data: props.countList
    }
  };

  //点击事件
  myChart.on("click", function (params) {
    const value = params.value as [string, number]
    if (value[1] === 0) {
      return

    }
    router.push({
      query: {
        date: value[0]
      }
    })
  })

  myChart.setOption(option);

})


</script>

<template>
  <div id="article_data" style="height: 150px"></div>

</template>
<style scoped lang="scss">
#article_data {
  width: inherit;
  height: 270px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}
</style>

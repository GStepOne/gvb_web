<script setup lang="ts">

import Article_calendar_charts from "@/components/charts/article_calendar_charts.vue";
import {reactive, ref, watch} from "vue";
import {articleCalendarApi} from "@/api/article_api";
import {useStore} from "@/stores";

const store = useStore();

const data = reactive<{ dateList: string[], countList: Array<Array<number>> }>({
  dateList: [],
  countList: [],
})

const isShow = ref(false)

async function getData() {
  let res = await articleCalendarApi()
  data.dateList = [res.data[0].date, res.data[res.data.length - 1].date];
  data.countList = []
  res.data.forEach((item) => {
    data.countList.push([item.date, item.count])
  })
  isShow.value = true
}

getData();

//黑白切换
watch(() => store.theme, () => {
  isShow.value = false
  setTimeout(()=>{
    isShow.value = true
  })
})

</script>

<template>
  <div class="article_calendar">

    <article_calendar_charts v-if="isShow"
                             :date-list="data.dateList"
                             :count-list="data.countList"
                             :theme="store.theme"
    ></article_calendar_charts>

  </div>
</template>

<style scoped lang="scss">
.article_calendar {

}
</style>
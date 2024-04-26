<script setup lang="ts">
import {weatherApi, type weatherType} from "@/api/data_api";
import {computed, reactive, ref} from "vue";
import {Message} from "@arco-design/web-vue";
import {types} from "sass";
import Number = types.Number;

const data = reactive<weatherType>({
  province: "",
  city: "",
  weather: "",
  temperature: "",
  winddirection: ""
})

const isShow = ref(true)

async function getWeatherData() {
  let val = sessionStorage.getItem("weather")
  if (val != null) {
    try {
      console.log("从session里获取")
      let jsonData = JSON.parse(val)
      Object.assign(data, jsonData)
      return
    } catch (e) {
      sessionStorage.removeItem("weather")
    }
  }

  let res = await weatherApi()
  if (res.code) {
    // Message.error(res.code)
    return
  }
  Object.assign(data, res.data)
  isShow.value = false

  sessionStorage.setItem("weather", JSON.stringify(data))
}

getWeatherData()

// const weatherDesc = computed(() => {
//   const weatherNumber = Number(data.temperature ? data.temperature : 0)
//   if (weatherNumber > 40) {
//     return "天气炎热，请注意避暑"
//   }
//
//   if (weatherNumber > 30) {
//     return "天气炎热，西瓜🍉空调造起来啊"
//   }
//
//   if (weatherNumber > 20) {
//     return "天气舒适，适合户外运动"
//   }
//
//   if (weatherNumber > 0) {
//     return "天气好冷，建议室内运动"
//   }
//
// })
</script>

<template>
  <div class="gvb_weather">
    <!--骨架屏-->
    <a-skeleton-line :rows="1" :widths="[600]" v-if="!isShow"></a-skeleton-line>
    {{ data.province }} · {{ data.city }}· 今日 {{ data.weather }},{{ data.temperature }}°C，{{ weatherDesc }}
  </div>
</template>

<style scoped lang="scss">

</style>
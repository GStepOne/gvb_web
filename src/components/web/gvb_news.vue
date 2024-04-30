<script setup lang="ts">
import {newsListApi, type newsType} from "@/api/news_api";
import {reactive} from "vue";
import {IconFire} from "@arco-design/web-vue/es/icon";

const data = reactive<newsType[]>([])

// async function getData() {
//   Object.assign(data, [
//     {
//       hotValue: "1.3万",
//       index: "1",
//       link: "https://www.liritian.com",
//       title: "北极熊花样游泳比赛"
//     }
//   ]);
  // let res = await newsListApi({
  //   id: "mproPpoq6O",
  //   size: 10
  // });
  //
  // if (res.code) {
  //   // 如果请求失败，则将默认数据赋值给 data
  //   Object.assign(data, [
  //     {
  //       hotValue: "1.3万",
  //       index: "1",
  //       link: "https://www.liritian.com",
  //       title: "北极熊花样游泳比赛"
  //     }
  //   ]);
  //   return;
  // }

//   // 对 res.data 进行适当的处理，确保其为对象数组
//   const formattedData = res.data.map(item => {
//     return {
//       hotValue: item.hotValue,
//       index: item.index,
//       link: item.link,
//       title: item.title
//     };
//   });
//
//   // 将处理后的数据赋值给 data
//   Object.assign(data, formattedData[0]);
// }


// getData()


</script>
<template>
  <div class="gvb_news" v-for="item in data">
    <span class="index">{{ item.index }}</span>
    <a class="title" :href="item.link" target="_blank">{{ item.title }}</a>
    <span class="hot">{{ item.hotValue }} <IconFire></IconFire></span>
  </div>
</template>

<style lang="scss">
.gvb_news {
  //width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: inherit;

  .title {
    color: var(--active);
    text-decoration: none;
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
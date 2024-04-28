<script setup lang="ts">
import type {newsType} from "@/api/news_api";
import {reactive} from "vue";
import {IconFire} from "@arco-design/web-vue/es/icon";

const data = reactive<newsType>({
  hotValue: "2345",
  index: "1",
  title: "请把这个引进国内吧",
  link: "",
})
</script>
<template>
  <div class="gvb_news">
    <span class="index">{{ data.index }}</span>
    <a class="title" :href="data.link" target="_blank">{{ data.title }}</a>
    <span class="hot">{{ data.hotValue }} <IconFire></IconFire></span>
  </div>
</template>

<style lang="scss">
.gvb_news {
  //width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:inherit;

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
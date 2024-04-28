<script setup lang="ts">
import {menuDetailApi} from "@/api/menu_api";
import type {menuType} from "@/api/menu_api";
import {reactive} from "vue";
//打字机效果
import vuetyped from "vue3typed/libs/typed/index.vue"

import {useStore} from "@/stores";

const store = useStore();

const images = [
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
];

const data = reactive<menuType>({})

// async function getData() {
//
// const key = `bannerList__${location.pathname}`
//   // const val = sessionStorage.getItem(key)
//   // if (val !== null) {
//   //   try {
//   //     Object.assign(data, JSON.parse(val))
//   //     return
//   //   } catch (e) {
//   //     console.log(e)
//   //   }
//   // }
//
//   let res = await menuDetailApi(location.pathname)
//   Object.assign(data, res.data)
//   console.log(data)
// sessionStorage.setItem(key,JSON.stringify(data))
// }
//
// getData();
const strings = ["晓之意志、赤沙之蝎"]
</script>

<template>
  <div class="gvb_banner">
    <div class="head">
      <div class="slogan">{{store.siteInfo.slogan}}</div>
      <div class="abstract">
        <vuetyped :strings="[store.siteInfo.slogan_en]"
                  :loop="true"
                  :start-delay="300"
                  :type-speed="100"
                  :back-speed="50">
          <span class="typing"></span>
        </vuetyped>
      </div>

      <!--      <div class="slogan">{{ data.slogan }}</div>-->
      <!--      <div class="abstract">{{ data.abstract }}</div>-->
    </div>
    <!--:auto-play="{interval:data.banner_time * 1000}"-->
    <!--每3秒切换一次-->
    <a-carousel
        :auto-play="{interval:3* 1000}"
        indicator-type="dot"
        show-arrow="hover"
    >
      <a-carousel-item v-for="image in images">
        <img class="banner_image"
             :src="image"
        />
      </a-carousel-item>

      <!--      <a-carousel-item v-for="item in data.banners">-->
      <!--        <img class="banner_image" :src="item.path"/>-->
      <!--      </a-carousel-item>-->

    </a-carousel>
  </div>
</template>

<style scoped lang="scss">
.gvb_banner {
  width: 100%;
  height: 600px;
  position: relative;

  .head {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    color: white;

    .slogan {
      font-size: 30px;
      font-weight: 400;
      text-align: center;
      margin-bottom: 10px;
    }

    .abstract {
      font-size: 18px;
      text-align: center; //垂直居中
    }
  }

  .arco-carousel {
    height: 100%;

    .banner_image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
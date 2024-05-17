<script setup lang="ts">
import {menuDetailApi} from "@/api/menu_api";
import type {menuType} from "@/api/menu_api";
import {reactive, watch} from "vue";
//打字机效果 下面就是忽略掉
// @ts-ignore
import vuetyped from "vue3typed/libs/typed/index.vue"

import {useStore} from "@/stores";
import {imageListApi, type imageType} from "@/api/image_api";
import {carouselListApi} from "@/api/carousel_api";

const store = useStore();

const data = reactive<BannerType>({
  abstract: [],
  banner_time: 7,
  banners: "",
  slogan: "",
})

const imageData = reactive([{
  path: "",
  name: "",
  id: 0
}])

interface BannerType {
  abstract: string | string[]
  banner_time?: number
  banners: string
  slogan: string
}

interface Props {
  data?: BannerType
}

const props = defineProps<Props>()

async function getData() {
  // const key = `bannerList__${location.pathname}`
  // const val = sessionStorage.getItem(key)
  //
  // if (val !== null) {
  //   try {
  //     let jsonData = JSON.parse(val)
  //     Object.assign(data, jsonData)
  //     return
  //   } catch (e) {
  //     console.log(e)
  //   }

  let res = await carouselListApi()
  // console.log(res.data)
  Object.assign(imageData, res.data.list)

  //   sessionStorage.setItem(key, JSON.stringify(data))
  // }
}

getData();

watch(() => props.data, () => {
  getData()
}, {immediate: true})

</script>

<template>
  <div class="gvb_banner">
    <div class="head">
      <div class="slogan">{{ store.siteInfo.slogan }}</div>
      <div class="abstract">
        <!--        v-if="typeof data.abstract ==='object'" 写完接口换一下这个 TODO-->
        <template v-if="0">
          <vuetyped :strings="[store.siteInfo.slogan_en]"
                    :loop="true"
                    :start-delay="300"
                    :type-speed="100"
                    :back-speed="50">
            <span class="typing"></span>
          </vuetyped>
        </template>
        <template v-else>
          <!--          {{ data.abstract }}-->
          木兰当户织
        </template>
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
      <a-carousel-item v-for="item in imageData">
        <img class="banner_image" :src="item.path"/>
        {{ item.path }}
      </a-carousel-item>

    </a-carousel>
  </div>
</template>

<style scoped lang="scss">
.gvb_banner {
  width: 1527px;
  height: 600px;
  position: relative;
  padding: 0;

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
      width: 1527px;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
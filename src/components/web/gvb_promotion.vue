<script setup lang="ts">
// const images = [
//   'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
//   'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
//   'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
// ];
import {promotionListApi} from "@/api/promotion_api";
import type {promotionType} from "@/api/promotion_api";
import {ref} from "vue";

const images = ref<promotionType[]>({
  "id": 0,
  "title": "",
  "href": "",
  "images": "",
  "is_show": "",
  "created_at": "",
  "updated_at": "",
})

async function getData() {
  let res = await promotionListApi()
  images.value = res.data.list
  // Object.assign(images, res.data.list)
  // console.log(images)
}

getData();

</script>

<template>
  <div class="gvb_promotion">
    <a-carousel
        :auto-play="{interval:3* 1000}"
        indicator-type="dot"
        show-arrow="hover"
    >
      <a-carousel-item v-for="item in images">
        <a :href="item.href" class="link" target="_blank"><img class="banner_image" :src="item.images"/></a>
      </a-carousel-item>

      <!--      <a-carousel-item v-for="item in data.banners">-->
      <!--        <img class="banner_image" :src="item.path"/>-->
      <!--      </a-carousel-item>-->

    </a-carousel>
  </div>
</template>

<style scoped lang="scss">
.gvb_promotion {
  height: 200px;
  padding: 10px;

  .arco-carousel {
    height: 100%;

    .link {
      width: 100%;
      height: 100%;
      display: block;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
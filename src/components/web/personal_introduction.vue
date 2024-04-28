<script setup lang="ts">
import {useStore} from "@/stores";

const store = useStore();

</script>

<template>
  <div class="gvb_user_card">
    <div class="title">
      <i class="fa fa-quote-left"></i>
      换衣换新、换心换一、从心出发、从新开始、
      <i class="fa fa-quote-right"></i>

    </div>
    <div class="info">
      <div class="item">
        <span>NAME</span>
        <span>{{ store.siteInfo.name }}</span>
      </div>

      <div class="item">
        <span>JOB</span>
        <span>{{ store.siteInfo.job }}</span>
      </div>

      <div class="item">
        <span>ADDR</span>
        <span>{{ store.siteInfo.addr }}</span>
      </div>

      <div class="item">
        <span>WEB</span>
        <span>
          <a :href="store.siteInfo.web"
             target="_blank">
            {{ store.siteInfo.web }}
            www.liritan.com
          </a>
        </span>
      </div>

      <div class="item">
        <img :src="store.siteInfo.qq_image" alt="">
        <span>QQ:867700123</span>
      </div>

      <div class="item">
        <img :src="store.siteInfo.wechat_image" alt="">
        <span>微信:master_ecnu</span>
      </div>


    </div>

    <div class="image">

    </div>
  </div>
</template>

<style scoped lang="scss">
.gvb_user_card {
  color: var(--color-text-2);

  .title {
    background-color: var(--color-fill-2);
    border-radius: 5px;
    margin-bottom: 20px;
    color: var(--color-text-1);
    text-align: center;
    padding: 30px 0;
    position: relative;

    i {
      color: var(--color-text-4);
    }

    i:nth-child(1) {
      position: absolute;
      left: 10px;
      top: 10px;
    }


    i:nth-child(2) {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }

  .info {
    .item {
      margin-bottom: 10px;

      > span:nth-child(1) {
        margin-right: 5px;
        color: var(--color-text-2);
        font-weight: 600;
      }

      a {
        text-decoration: none;
        color: var(--active);
      }
    }
  }

  .image {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

    img {
      width: 80px;
      height: 80px;
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        margin-top: 10px;
      }
    }
  }
}
</style>
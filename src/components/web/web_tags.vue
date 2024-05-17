<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {tagArticleListApi} from "@/api/tag_api";
import type{tagType} from "@/api/tag_api";

const router = useRouter();

const route = useRoute();

const active = ref<string>(route.query.tag as string);

const list = ref<tagType[]>([])

function checkTag(item:any) {
  if (active.value === item.tag) {
    //第二次点击
    active.value = ""
  } else {
    active.value = item.tag
  }

  //再点击就取消
  router.push({
    query: {
      tag: active.value
    }
  })
}

async function getData() {
  let res = await tagArticleListApi()
  list.value = res.data.list
}

getData()
</script>

<template>

  <div class="gvb_tags">
    <div :class="{item:true,active:active===item.tag}" v-for="item in list">
      <a href="javascript:void(0);" @click="checkTag(item)">
        <span>{{ item.tag }}</span>
        <span>x{{ item.count }}</span>
      </a>
    </div>
  </div>

</template>

<style scoped lang="scss">
.gvb_tags {
  //padding: 15px;
  position: relative;
  //border: 1px dotted green;
  //关键帧动画
  @keyframes box_move {
    0% {
      left: -15px;
      top: -15px;
    }
    25% {
      left: 100%;
      top: -15px;
    }
    50% {
      left: 100%;
      top: 100%;
    }
    75% {
      left: -15px;
      top: 100%;
    }
    100% {
      left: -15px;
      top: -15px;
    }
  }

  &::after {
    display: block;
    position: absolute;
    height: 13px;
    width: 13px;
    content: "";
    background-color: var(--active);
    left: -20px;
    top: -20px;
    animation-name: box_move; //应用哪个动画
    animation-duration: 5s; //动画执行的时间
    animation-iteration-count: infinite; //一直执行
  }


  .item {
    padding: 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-2);
    width: 50%;
    height: 40px;
    border-radius: 5px;

    &:nth-child(4n+1), &:nth-child(4n+2) {
      //颜色差异
      background-color: var(--color-fill-2);
    }

    &:nth-child(4n+1), &:nth-child(4n+3) {
      border-right: 1px solid var(--bg);
    }

    a {
      color: var(--color-text-2);
      text-decoration: none;
    }

    &.active {
      a {
        color: var(--active);
      }
    }


    span:nth-child(1) {
      margin-right: 5px;
    }

    span:nth-child(2) {
      font-size: 12px;
    }
  }
}
</style>
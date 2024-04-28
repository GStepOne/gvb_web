<script setup lang="ts">

import Gvb_article_item from "@/components/common/gvb_article_item.vue";
import {articleListApi, type articleType} from "@/api/article_api";
import {reactive} from "vue";
import type {listDataType, paramsType} from "@/api";

const data = reactive<listDataType<articleType>>({
  list: [],
  count: 0
})

const params = reactive<paramsType>({})

async function getData() {
  let res = await articleListApi()
  data.list = res.data.list
  data.count = res.data.count
}

getData()
</script>

<template>
  <div class="gvb_article_list">
    <div class="source">
      <gvb_article_item
          v-for="item in data.list"
          :data="item"
      ></gvb_article_item>
    </div>

    <div class="page">
      <a-pagination :total="data.count" v-model:current="params.page" show-total></a-pagination>
    </div>
  </div>
</template>

<style lang="scss">
.gvb_article_list {
  .gvb_card{
    padding: 0;
  }

  .source {
    .gvb_article_item {
      width: inherit;
      background-color: var(--color-bg-1);
      margin-bottom: 20px;
      padding: 10px 10px;
      height: 200px;


      &:first-child {
        border-radius: 0 0 5px 5px;
      }

      .info {
        .title {
          font-size: 20px;
        }

        .abstract {
          margin-top: 10px;
          min-height: 8rem;
          padding: 5px 5px;
        }

        .data {
          display: flex;
          align-items: center;

          .category {
            margin-bottom: 5px;
          }
        }
      }
    }
  }

  .page {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

}
</style>
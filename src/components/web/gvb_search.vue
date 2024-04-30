<script setup lang="ts">

import {IconSearch} from "@arco-design/web-vue/es/icon";
import {nextTick, reactive, ref} from "vue";
import type {listDataType, paramsType} from "@/api";
import {type articleSearchType, articleSearchApi} from "@/api/article_api";
import {Message} from "@arco-design/web-vue";

const visible = ref(false)
const searchRef = ref()
const params = reactive<paramsType>({})

function showSearch() {
  visible.value = true
  nextTick(() => {
    searchRef.value.focus()
  })
}

const data = reactive<listDataType<articleSearchType>>({
  list: [],
  count: 0
})

async function searchArticle() {
  let res = await articleSearchApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count

  // Message.success(res.msg)
}

function goTo(item: articleSearchType) {
  window.open(`/article/${item.slug}`, '_blank')
}


</script>

<template>
  <a-modal width="40%" title="全文搜索"
           :footer="false"
           v-model:visible="visible"
           body-class="gvb_search_body">

    <div class="head">
      <a-input-search
          v-model="params.key"
          ref="searchRef"
          placeholder="全文搜索"
          search-button
          @keydown.enter="searchArticle"
          @search="searchArticle"
      ></a-input-search>
    </div>
    <template v-if="data.list.length">
      <div class="body">
        <div class="item" @click="goTo(item)" v-for="item in data.list">
          <div class="title">{{ item.title }}</div>
          <div class="content" v-html="item.body"></div>
        </div>
      </div>
      <div class="footer">
        共搜索到结果 {{ data.count }} 条
      </div>
    </template>
  </a-modal>
  <div class="gvb_search">
    <IconSearch @click="showSearch"></IconSearch>
  </div>
</template>

<style lang="scss">
.gvb_search_body {
  padding: 0;

  .head {
    padding: 20px;
  }

  .body {
    max-height: 50vh;
    overflow-y: auto;
    color: var(--color-text-2);

    .item {
      padding: 10px 20px;

      &:hover {
        background-color: var(--color-fill-2);
      }

      .title {
        margin-bottom: 5px;
        color: var(--color-text-1);
        font-size: 16px;
      }

      em {
        color: var(--hightColor);
      }
    }


  }

  .footer {
    text-align: center;
    padding: 10px 0;
    color: var(--color-text-2);
  }
}
</style>
<script setup lang="ts">
import {reactive, ref} from "vue";
import {useStore} from "@/stores";
import type {listDataType, paramsType} from "@/api";
import {commentArticleListApi, type commentArticleType} from "@/api/comment_api";
import {IconDelete} from "@arco-design/web-vue/es/icon";
import Gvb_comment from "@/components/common/gvb_comment.vue";

const store = useStore()
const articleId = ref<string>("")

//最左侧的数据
const articleList = reactive<listDataType<commentArticleType>>({
  list: [],
  count: 0,
})

const articleParams = reactive<paramsType>({})

async function getArticleList() {
  let res = await commentArticleListApi(articleParams)
  articleList.list = res.data.list
  articleList.count = res.data.count
}

getArticleList()


function checkItem(record: commentArticleType) {
  console.log('ddd',record.id)
  console.log('avvv',  articleId.value)
  articleId.value = record.id
  console.log('avvv2',  articleId.value)
}
</script>

<template>
  <div class="comment_list_view">
    <div class="article">
      <div class="head">
        <a-input-search placeholder="搜索文章标题"></a-input-search>
      </div>

      <div class="article_list">
        <div :class="{item:true,active:articleId === item.id}" @click="checkItem(item)"
             v-for="item in articleList.list">
          <div class="title">
            <!--名字如果长的话就一行，省略号显示-->
            <a-typography-text :ellipsis="{rows:1,showTooltip:true,css:true}">
              {{ item.title }}
            </a-typography-text>
          </div>
          <div class="count">{{ item.count }}</div>
          <div class="action"><i>
            <IconDelete></IconDelete>
          </i></div>
        </div>
      </div>

      <div class="page">
        <a-pagination simple :total="articleList.count"></a-pagination>
      </div>
    </div>

    <div class="comment">
      <gvb_comment :article-id="articleId"></gvb_comment>
    </div>

  </div>

</template>
<style lang="scss">
.comment_list_view {
  display: flex;

  > div {
    background-color: var(--color-bg-1); //背景色
    height: calc(100vh - 130px);
    border-radius: 5px;
    color: var(--color-text-2);
    overflow-y: auto;
    overflow-x: hidden;
  }

  .article {
    width: 240px;
    margin-left: 10px;
    padding: 20px;
    position: relative;

    .head {
      margin-bottom: 10px;
    }

    .page {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }

    .item {
      height: 40px;
      padding: 10px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      cursor: pointer;

      .title {
        .arco-typography {
          margin-bottom: 0;
          max-width: 5rem;
        }
      }

      &.active {
        background-color: var(--color-fill-2);
        border-radius: 5px;
      }
    }
  }

  .comment {
    width: calc(100% - 200px);
    margin-left: 20px;
    height: auto;
  }

}

</style>

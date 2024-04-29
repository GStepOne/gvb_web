<script setup lang="ts">
import {ref} from "vue";
import Gvb_nav from "@/components/web/gvb_nav.vue";
import Gvb_banner from "@/components/web/gvb_banner.vue";
import Gvb_card from "@/components/common/gvb_card.vue";
import {IconDoubleRight} from "@arco-design/web-vue/es/icon";
import Gvb_footer from "@/components/web/gvb_footer.vue";
import Gvb_news from "@/components/web/gvb_news.vue";
import Gvb_promotion from "@/components/web/gvb_promotion.vue";
import Personal_introduction from "@/components/web/personal_introduction.vue";
import Gvb_feed_back from "@/components/web/gvb_feed_back.vue";
import Article_calendar from "@/components/charts/article_calendar.vue";
import Gvb_article_list from "@/components/web/gvb_article_list.vue";
import Web_tags from "@/components/web/web_tags.vue";

const gvbArticleList = ref()
const key = ref()

function search() {
  gvbArticleList.value.getData({key: key.value});
}
</script>

<template>
  <div class="index_view">
    <gvb_nav></gvb_nav>
    <gvb_banner></gvb_banner>
    <main>
      <div class="container">
        <!--左侧开始-->
        <div class="left">
          <gvb_card title="今日热搜">
            <template #head-right>
              <router-link :to="{name:'news'}">
                更多
                <IconDoubleRight></IconDoubleRight>
              </router-link>
            </template>
            <gvb_news></gvb_news>
          </gvb_card>
          <gvb_card title="文章日历">
            <article_calendar></article_calendar>
          </gvb_card>
          <gvb_card title="文章列表" class="article_card">
            <template #head-right>
              <a-input-search placeholder="搜索文章标题"
                              @search="search"
                              @keydown.enter="search"
                              v-model="key"
              ></a-input-search>
            </template>
            <gvb_article_list ref="gvbArticleList"></gvb_article_list>
          </gvb_card>
        </div>
        <!--右侧开始-->
        <div class="right">
          <gvb_card title="独家推广">
            <gvb_promotion></gvb_promotion>
          </gvb_card>
          <gvb_card title="标签云">
            <web_tags></web_tags>
          </gvb_card>
          <gvb_card title="个人名片">
            <personal_introduction></personal_introduction>
          </gvb_card>
          <gvb_card title="意见反馈">
            <gvb_feed_back></gvb_feed_back>
          </gvb_card>
        </div>
      </div>
    </main>
    <gvb_footer></gvb_footer>
  </div>
</template>

<style lang="scss">
.index_view {
  background-color: var(--bg);

  main {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .container {
      width: var(--container_width);
      justify-content: space-between; //两端对齐
      display: flex;
      //margin-bottom: 10px;

      > .right {
        width: 380px;
      }

      > .left {
        width: calc(100% - 390px);
        margin-right: 10px;

        .article_card {
          background: none;
          //width: inherit;
          margin-bottom: 10px;
          padding: 0;

          .head {
            background-color: var(--color-bg-1);
          }

          .body {
            padding: 0;
          }
        }
      }

      .gvb_card {
        margin-bottom: 20px;

        .body {
          .gvb_news {
            padding: 10px;
          }

          .gvb_article_item {
            margin-bottom: 10px;
          }
        }
      }


    }

  }
}

</style>
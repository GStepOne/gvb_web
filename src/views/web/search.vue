<script setup lang="ts">
import {reactive, ref} from "vue";
import Gvb_nav from "@/components/web/gvb_nav.vue";
import type {listDataType, paramsType} from "@/api";
import type {optionType} from "@/types";
import {articleCategoryListApi, articleListApi, type articleParamsType, type articleType} from "@/api/article_api";
import {tagOptionsApi} from "@/api/tag_api";

import {IconEye, IconClockCircle, IconThumbUp, IconStar, IconMessage} from "@arco-design/web-vue/es/icon";
import {dateFormat} from "../../utils/date";
import Gvb_footer from "@/components/web/gvb_footer.vue";
import {useStore} from "@/stores";

const store = useStore();

const params = reactive<articleParamsType & { sort: sortType }>({
  sort: "",
  tag: "",
  category: "",
  limit: 8,
})

type sortType =
    ""
    | "look_count desc"
    | "created_at desc"
    | "digg_count desc"
    | "comment_count desc"
    | "collects_count desc";
//第一行
const sortOption = [
  {label: "综合排序", value: ""},//默认
  {label: "最多浏览", value: "look_count desc"},
  {label: "最新发布", value: "created_at desc"},
  {label: "最多点赞", value: "digg_count desc"},
  {label: "最多评论", value: "comment_count desc"},
  {label: "最多收藏", value: "collects_count desc"},
]

const categoryOption = ref<optionType[]>([])
const tagOption = ref<optionType[]>([])

async function getCategoryOption() {
  let res = await articleCategoryListApi()
  categoryOption.value = [{label: "全部分类", value: ""}, ...res.data]
}

getCategoryOption()

function checkKey(key: "sort" | "category" | "tag", item: optionType) {
  console.log(params[key])
  params[key] = item.value as string
}

async function getTagOption() {
  let res = await tagOptionsApi()
  tagOption.value = [{label: "全部标签", value: ""}, ...res.data]
}

getTagOption()


const data = reactive<listDataType<articleType>>({
  list: [],
  count: 0
})

//获取文章列表
async function getData() {
  console.log(params)
  let res = await articleListApi(params)
  data.list = res.data.list
  data.count = res.data.count
}

getData();
</script>

<template>
  <div class="search_view">
    <gvb_nav no-scroll></gvb_nav>
    <main>
      <div class="container">
        <div class="header">
          <div class="head">
            <div class="slogan">
              {{ store.siteInfo.slogan ? store.siteInfo.slogan : "Jack Bloggggg" | 搜索 }}
            </div>
            <a-input class="search_ipt"
                     v-model="params.key"
                     @keydown.enter="getData"
                     placeholder="搜索文章标题"></a-input>
            <a-button type="primary" @click="getData">搜索</a-button>
          </div>

          <div class="action">
            <div class="item">
              <span @click="checkKey('sort',item)" :class="{active: params.sort == item.value}"
                    v-for="item in sortOption">{{ item.label }}</span>
            </div>

            <div class="item">
              <span @click="checkKey('category',item)"
                    :class="{active:params.category === item.value}"
                    v-for="item in categoryOption">{{ item.label }}</span>
            </div>

            <div class="item">
              <span @click="checkKey('tag',item)"
                    :class="{active:params.tag===item.value}"
                    v-for="item in tagOption">{{ item.label }}</span>
            </div>
          </div>
          <div class="source">
            <template v-if="data.list.length">
              <div class="article_list">
                <div class="item" v-for="item in data.list">
                  <div class="top">
                    <img :src="item.banner_url" alt=""/>
                  </div>
                  <div class="bottom">
                    <div class="title">
                      <router-link :to="{name:'article',params:{id:item.id}}" v-html="item.title"></router-link>
                    </div>

                    <div class="abstract">
                      <!--文本的截断和省略-->
                      <a-typography-paragraph :ellipsis="{rows:2,showTooltip:true,css:true}">
                        {{ item.abstract }}
                      </a-typography-paragraph>
                    </div>

                    <div class="data">
                      <span v-if="params.sort==='look_count desc' || params.sort===''">
                        <IconEye></IconEye>
                        {{ item.look_count }}
                      </span>
                      <span v-if="params.sort==='digg_count desc'">
                        <IconThumbUp></IconThumbUp>
                        {{ item.digg_count }}
                      </span>
                      <span v-if="params.sort==='collects_count desc'">
                          <IconStar></IconStar>
                        {{ item.collects_count }}
                      </span>
                      <span v-if="params.sort==='comment_count desc'">
                          <IconMessage></IconMessage>
                        {{ item.comment_count }}
                      </span>
                      <span>
                        <IconClockCircle></IconClockCircle>
                        {{ dateFormat(item.created_at) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="page">
                <a-pagination :total="data.count"
                              show-total
                              @change="getData"
                              v-model:current="params.page"
                ></a-pagination>
              </div>
            </template>
            <a-empty v-else class="empty"></a-empty>
          </div>
        </div>
      </div>
    </main>
    <gvb_footer></gvb_footer>
  </div>
</template>

<style lang="scss">
.search_view {
  min-height: 100vh;
  background-color: var(--bg);

  main {
    //background-color: var(--bg);
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    border-radius: 5px;
    color: var(--color-text-2);

    .container {
      margin-top: 20px;
      width: 1000px;

      //align-items: center;

      .head {
        height: 60px;
        background-color: var(--color-bg-1);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        border-radius: 5px;
        //margin-bottom: 10px;

        .search_ipt {
          width: 400px;
          margin: 0 20px;
        }

        .slogan {
          font-size: 16px;
          color: var(--active);
          font-weight: 600;
          font-family: kuaikanshijieti,monospace;
        }
      }

      .action {
        margin-top: 20px;
        background-color: var(--color-bg-1);
        padding: 20px;
        border-radius: 5px;

        .item {
          margin-bottom: 25px;

          span {
            //margin-bottom: 10px;
            margin-right: 20px;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 5px;

            &.active {
              background-color: var(--active);
              color: white;
            }
          }
        }

      }

      .source {
        margin-bottom: 20px;
        margin-top: 20px;
        min-height: calc(100vh - 485px);

        .article_list {
          display: grid;
          grid-template-columns:repeat(4, 1fr);
          grid-column-gap: 10px;
          grid-row-gap: 20px;
          //min-height: calc(100vh - 485px);
          .item {
            background-color: var(--color-bg-1);
            width: 100%;
            border-radius: 5px;
            overflow: hidden;

            .top {
              height: 120px;
              width: 100%;

              img {
                width: 100%;
                padding: 1px;
                height: 100%;
                object-fit: cover;
                border-radius: 5px 5px 0 0;
              }
            }

            a {
              color: var(--color-text-2);
              text-decoration: none;
            }

            .bottom {
              padding: 20px;
              background-color: var(--color-bg-1);

              .title {
                font-size: 16px;
                font-weight: 600;

                em {
                  color: #d71345
                }
              }

              .abstract {
                .arco-typography {
                  margin-bottom: 0;
                  color: var(--color-text-2);
                }
              }

              .data {
                display: flex;
                justify-content: space-between;
              }
            }
          }
        }

        .page {
          display: flex;
          justify-content: center;
          margin-top: 20px;
          background-color: var(--color-bg-1);
          padding: 20px 0;

        }

        .empty {
          width: 100%;
          //height: 200px;
          background-color: var(--color-bg-1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 5px;
          min-height: calc(100vh - 485px);
        }
      }
    }
  }


}
</style>
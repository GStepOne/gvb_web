<script setup lang="ts">
import {reactive, ref} from "vue";
import Gvb_nav from "@/components/web/gvb_nav.vue";
import Gvb_banner from "@/components/web/gvb_banner.vue";
import Gvb_footer from "@/components/web/gvb_footer.vue";
import {newsListApi, type newsType} from '@/api/news_api'

interface newsAsideType {
  id: string
  name: string
  font: string
}

const newsAside: newsAsideType[] = [
  {
    id: "KqndgxeLl9",
    name: "微博",
    font: "/image/icon/weibo.png",
  },
  {
    id: "mproPpoq6O",
    name: "知乎",
    font: "/image/icon/zhihu.png",
  },
  {
    id: "WnBe01o371",
    name: "微信",
    font: "/image/icon/wechat.png",
  },
  {
    id: "Q1Vd5Ko85R",
    name: "36氪",
    font: "/image/icon/36kr.png",
  },
  {
    id: "5VaobgvAj1",
    name: "虎嗅网",
    font: "/image/icon/tiger_sniff.png",
  }, {
    id: "DpQvNABoNE",
    name: "抖音",
    font: "/image/icon/tiktok.png",
  }, {
    id: "74KvxwokxM",
    name: "哔哩",
    font: "/image/icon/bilibili_red.png",
  }
]

// const active = ref('KqndgxeLl9')

function checkAside(item: newsAsideType) {
  params.id = item.id
  getData()
}

import {computed} from "vue";

const activeName = computed(() => {
  const foundItem = newsAside.find((item) => params.id === item.id);
  return foundItem ? foundItem.name : ""; // 返回一个默认值，例如空字符串
});

const activeFont = computed(() => {
  const foundItem = newsAside.find((item) => params.id === item.id);
  return foundItem ? foundItem.font : ""; // 返回一个默认值，例如空字符串
});


const newsList = ref<newsType[]>([])

const params = reactive({
  id: "KqndgxeLl9",
  size: 20
})

async function getData() {
  let res = await newsListApi(params)
  newsList.value = res.data
}

getData();
</script>

<template>
  <div class="news_view">
    <gvb_nav></gvb_nav>
    <gvb_banner></gvb_banner>
    <main>
      <div class="container">
        <div class="news_detail">
          <aside>
            <div @click="checkAside(item)" :class="{item:true,active:params.id===item.id}"
                 v-for="(item, index) in newsAside" :key="index">
              <img :src="item.font" alt="">
              <span>{{ item.name }}</span>
            </div>
          </aside>
          <div class="content">
            <div class="head">
              <img :src="activeFont" alt="">
              <span> {{ activeName }} ·  热搜榜</span>
            </div>
            <div class="body">
              <div class="item" v-for="item in newsList">
                <span class="index">{{ item.index }}</span>
                <span class="title">
                     <a :href="item.link" target="_blank">{{ item.title }}</a>
                </span>
                <span class="hot">
                    {{ item.hotValue }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="link">
          <a href="https://go.itab.link/" target="_blank">灵感来源于 itab</a>
        </div>
      </div>
    </main>
    <gvb_footer></gvb_footer>
  </div>
</template>

<style lang="scss">
.news_view {

  main {

    display: flex;
    margin-top: 20px;
    justify-content: center;
    margin-bottom: 20px;
    background-color: var(--bg);

    .container {
      width: 1000px;
      margin: inherit;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 5px;
      background-color: var(--color-bg-1);

      .news_detail {
        background-color: var(--color-bg-1);
        border-radius: 5px;
        //height: 200px;
        margin-bottom: 10px;
        display: flex;
        width: 100%;
        padding: 20px;

        aside {
          width: 20%;
          border-right: 1px solid var(--bg);
          border-radius: 5px 0 0 5px;
          padding: 20px 0;
          height: 100%;

          .item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            color: var(--color-text-2);
            cursor: pointer;
            transition: all .3s;

            &:hover {
              background-color: var(--active);
              color: white;
            }

            &.active {
              background-color: var(--active);
              color: white;
            }

            img {
              width: 30px;
              height: 30px;
              border-radius: 5px;
            }

            span {
              margin-left: 10px;
            }
          }
        }

        .content {
          width: 80%;

          .head {
            height: 60px;
            border-bottom: 1px solid var(--bg);
            display: flex;
            align-items: center;
            padding: 0 20px;

            img {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              display: block;
            }

            span {
              font-size: 18px;
              margin-left: 10px;
            }
          }

          .body {
            padding: 20px;

            .item {
              display: flex;
              justify-content: space-between;
              color: var(--color-text-2);
              margin-bottom: 10px;
              align-items: center;

              .index {
                background-color: var(--color-fill-2);
                width: 20px;
                height: 20px;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 5px;
              }

              a {
                color: var(--color-text-2);
              }

              .hot {
                white-space: nowrap;
              }

              .title {
                width: 90%;
                white-space: break-spaces;
              }
            }
          }
        }
      }

      .link {
        margin-bottom: 20px;

        a {
          color: var(--color-text-2);
        }

      }
    }
  ;
  }
}
</style>
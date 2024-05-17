<script setup lang="ts">

import Gvb_banner from "@/components/web/gvb_banner.vue";
import Gvb_nav from "@/components/web/gvb_nav.vue";

import {useRoute} from "vue-router";
import Gvb_footer from "@/components/web/gvb_footer.vue";
import Gvb_card from "@/components/common/gvb_card.vue";
import Gvb_user_info_preview from "@/components/common/gvb_user_info_preview.vue";
import Gvb_comment from "@/components/common/gvb_comment.vue";
import {articleCollectsPostApi, articleDetailWebApi, articleDiggPostApi, type articleType} from "@/api/article_api";
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {Message} from "@arco-design/web-vue";
import {dateFormat, relativeCurrentTime} from "../../utils/date";
import {useRouter} from "vue-router";
import {useStore} from "@/stores";

import {IconThumbUpFill, IconStarFill, IconDoubleUp, IconMessage} from "@arco-design/web-vue/es/icon";

const store = useStore();
const router = useRouter();
//因为局部变量不能直接使用，所以声明一下
const scrollElement = document.documentElement;

import {MdPreview, MdCatalog} from "md-editor-v3";
import 'md-editor-v3/lib/preview.css'
import {colorList} from "@/global/global";
import {showLogin} from "@/components/common/gvb_login";

const route = useRoute();
//文章id 从路由里拿
const id = ref<string>(route.params.id as string)
//为了让目录滚动
const top = ref(760)
const isFixed = ref(false)

const mdId = 'articleId007'

const data = reactive<articleType>({
  abstract: "",
  banner_id: 0,
  banner_url: "",
  category: "",
  content: "",
  collects_count: 0,
  comment_count: 0,
  created_at: "",
  digg_count: 0,
  id: "",
  link: "",
  look_count: 0,
  source: "",
  tags: [],
  title: "",
  updated_at: "",
  user_avatar: "",
  user_id: 0,
  user_nick_name: ""
})

const isCatalogShow = ref(false)

async function getArticle() {
  isCatalogShow.value = false
  let res = await articleDetailWebApi(id.value)

  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)

  isCatalogShow.value = true
}

getArticle()

window.addEventListener("scroll", menuFlow)

function menuFlow() {
  if (document.documentElement.scrollTop >= top.value) {
    isFixed.value = true
  } else {
    isFixed.value = false
  }
}

onUnmounted(() => {
  window.removeEventListener("scroll", menuFlow)
})


function goTop() {
  document.documentElement.scrollTo({
    top: 700 - 60,
    behavior: "smooth"
  })
}

//为了让评论区触发焦点
const gvbCommentRef = ref()

function goComment() {
  let box = document.querySelector(".add_comment") as HTMLElement
  if (!box) {
    return
  }
  let top = box.offsetTop //距离顶部的偏移
  document.documentElement.scrollTo({
    top: top - 60,
    behavior: "smooth"
  })

  setTimeout(() => {
    gvbCommentRef.value.focus()
  })
}


async function articleDigg() {
  let res = await articleDiggPostApi(id.value)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  data.digg_count++
  data.is_digg = true
  setTimeout(() => {
    data.is_digg = false
  }, 2000)
}

async function articleCollect() {
  if (!store.isLogin) {
    // Message.warning('请先登录')
    showLogin();
    return
  }
  let res = await articleCollectsPostApi(id.value)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.is_collect = !data.is_collect;
  if (data.is_collect) {
    data.collects_count++
  } else {
    data.collects_count--
  }
  Message.success(res.msg)
}

watch(() => route.params, () => {

  id.value = route.params.id as string
  getArticle()
}, {immediate: true, deep: true})


onMounted(() => {
  let hash = route.hash
  if (hash !== "") {
    //为了获取到元素
    setTimeout(() => {
      let dom = document.querySelector(hash)
      if (dom) {
        //距离页面顶部的距离
        let top = dom.getBoundingClientRect().top
        document.documentElement.scrollTo({
          top: top - 60,
          behavior: "smooth"
        })
      }
    }, 150)
  }
})

</script>

<template>
  <div class="article_view">
    <gvb_nav></gvb_nav>
    <gvb_banner :data="{
      abstract:data.abstract,
      banners: data.banner_url,
      slogan:data.title
    }"></gvb_banner>

    <main>
      <div class="container">
        <div class="article_container">
          <div class="head">
            <div class="title" :id="data.title">{{ data.title }}</div>
            <div class="date">
              发布时间：{{ dateFormat(data.created_at) }}
              {{ relativeCurrentTime(data.created_at) }}
            </div>
            <div class="tag">
              <a-tag v-for="(item,index) in data.tags" :color="colorList[index]">{{ item }}</a-tag>
            </div>

          </div>

          <article>
            <MdPreview :editor-id="mdId" v-model="data.content" :theme="store.themeString"></MdPreview>
          </article>
          <div class="next_prev">
<!--            <div class="prev">-->
<!--              上一篇-->
<!--              <template v-if="data.prev">-->
<!--                <a :href="`/article/${data.prev.id}`">{{ data.prev?.title }}</a>-->
<!--              </template>-->
<!--              <template v-else>当前是第一篇</template>-->
<!--            </div>-->
<!--            <div class="next">-->
<!--              <template v-if="data.next">-->
<!--                <a :href="`/article/${data.next.id}`">{{ data.next?.title }}</a>-->
<!--              </template>-->
<!--              <template v-else>当前是最后一篇</template>-->
<!--            </div>-->
          </div>
          <gvb_comment :article-id="id"
                       ref="gvbCommentRef"
          ></gvb_comment>
        </div>

        <aside>
          <gvb_user_info_preview :data="{
              avatar: data.user_avatar,
              nickname:data.user_nick_name,
              sign:'',
              link:data.link,
              collects_count:data.collects_count,
              look_count:data.look_count,
              digg_count:data.digg_count,
              comment_count:data.comment_count,
          }"></gvb_user_info_preview>
          <!--套在一起可以浮动-->
          <div :class="{article_actions:true,isFixed:isFixed}">
            <gvb_card title="文章目录" class="gvb_article_dict">
              <!--这俩80 为了把标题漏出来-->
              <MdCatalog
                  v-if="isCatalogShow"
                  :scroll-element="scrollElement"
                  :theme="store.themeString"
                  :offset-top="80"
                  :scroll-element-offset-top="80"
                  :editor-id="mdId">
              </MdCatalog>
            </gvb_card>
            <div class="gvb_article_action">
              <IconThumbUpFill :class="{active:data.is_digg}" @click="articleDigg"></IconThumbUpFill>
              <IconStarFill :class="{active:data.is_collect}" @click="articleCollect"></IconStarFill>
              <IconDoubleUp @click="goTop"></IconDoubleUp>
              <IconMessage @click="goComment"></IconMessage>
            </div>
            <!--操作-->
          </div>
        </aside>
      </div>
    </main>
    <gvb_footer></gvb_footer>
  </div>
</template>

<style scoped lang="scss">
.article_view {
  main {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: var(--bg);
    padding-top: 20px;
    padding-bottom: 20px;

    .container {
      width: 1000px;
      display: flex;
      justify-content: space-between;

      aside {
        width: 300px;

        .gvb_user_info_preview_component {
          margin-bottom: 10px;
        }

        .gvb_article_dict {
          .body {
            max-height: calc(100vh - 500px);
            overflow: auto;
          }
        }

        .article_actions {

          position: relative;

          &.isFixed {
            position: fixed;
            top: 60px;
            width: 300px;
          }
        }

        .gvb_article_action {
          margin-top: 10px;
          border-radius: 5px;
          background-color: var(--color-bg-1);
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          > svg {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: var(--color-text-2);
            cursor: pointer;

            &:hover {
              color: var(--active);
            }

            &.active {
              color: var(--active);
            }
          }
        }
      }

      .article_container {
        width: calc(100% - 320px);

        .head {
          border-radius: 5px 5px 0 0;
          margin-bottom: 1px;
          background-color: var(--md-bk-color);
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
          }

          .date {
            margin-bottom: 10px;
            color: var(--color-text-2);
          }

          .tag {
            margin-right: 10px;

            &:last-child {
              margin-right: 0;
            }
          }
        }

        .next_prev {
          background-color: var(--md-bk-color);
          border-radius: 0 0 5px 5px;
          align-items: center;
          padding: 20px;
          margin-top: 1px;
          margin-bottom: 20px;
          justify-content: space-between;
          display: flex;

          a {
            color: var(--color-text-2);
          }
        }

        .gvb_comment_components {
          max-height: inherit;
        }
      }

      .md-editor-catalog-link span:hover {
        color: var(--active)
      }

      .md-editor-catalog-active > span {
        color: var(--active)
      }

    }
  }
}
</style>
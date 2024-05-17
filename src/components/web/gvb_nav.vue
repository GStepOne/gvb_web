<script setup lang="ts">
import {IconSearch} from "@arco-design/web-vue/es/icon";
import Gvb_theme from "@/components/common/gvb_theme.vue";
import {useStore} from "@/stores";
import Gvb_user_info_menu from "@/components/common/gvb_user_info_menu.vue";
import {menuNameListApi, type menuNameType} from "@/api/menu_api";
import {onUnmounted, ref} from "vue";
import Gvb_search from "@/components/web/gvb_search.vue";

const store = useStore()
//防止闪烁 有默认数据|缓存
// const navList = ref<menuNameType[]>([])
//
// async function getData() {
//   //这里用缓存的目的是防止加载的时候闪烁
//   const val = sessionStorage.getItem("navList")
//   if (val !== null) {
//     try {
//       navList.value = JSON.parse(val)
//       return
//     } catch (e) {
//       console.log(e)
//     }
//   }
//
//   let res = await menuNameListApi();
//   //放在session_storage里面，如果修了当前使用的人是不受影响的
//   navList.value = res.data;
//
//   sessionStorage.setItem("navList", JSON.stringify(navList.value));
// }
//
// getData()


interface Props {
  noScroll?: boolean//不需要滚动主题
}

const props = defineProps<Props>()
const {noScroll = false} = props
const isShow = ref(true)
if (!noScroll) {
//给当前窗口增加滚动条事件
  isShow.value = false
  window.addEventListener("scroll", scroll)
  scroll()
}

function scroll() {
  //获取当前窗口的高度
  let top = document.documentElement.scrollTop
  isShow.value = top >= 200;
}

//组件销毁:跳转路由的时候 就会销毁
onUnmounted(() => {
  //清除滚动条事件
  window.removeEventListener("scroll", scroll)
})


</script>

<template>
  <div :class="{gvb_nav:true,isShow:isShow}">
    <div class="gvb_nav_container">
      <div class="left">
        <div class="logo">
          <div class="slogan"> {{ store.siteInfo.slogan }}</div>

          <div class="en_slogan"> {{ store.siteInfo.slogan_en }}</div>
        </div>
        <div class="nav">
          <!--          &lt;!&ndash;因为官方建议不要在一个组件里用&ndash;&gt;-->
          <!--          <template v-for="item in navList">-->
          <!--            <a target="_blank" :href="item.path" v-if="item.path.startsWith('http')" :title="item.title">{{ item.title}}</a>-->
          <!--            <router-link :to="item.path" v-else> {{ item.title}}</router-link>-->
          <!--          </template>-->
          <router-link :to="{name:'index'}">首页</router-link>
          <router-link :to="{name:'news'}">新闻</router-link>
          <router-link :to="{name:'search'}">搜索</router-link>
          <router-link :to="{name:'chat'}">聊天室</router-link>
          <!--          <router-link >官方文档</router-link>-->

        </div>
        <gvb_search></gvb_search>
      </div>
      <div class="right">
        <div class="login" v-if="!store.isLogin">
          <!--          <a href="">登录</a>-->
          <router-link :to="{name:'login'}">登录</router-link>
        </div>
        <div class="user_info" v-else>
          <gvb_user_info_menu></gvb_user_info_menu>
        </div>

        <div class="theme">
          <gvb_theme></gvb_theme>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.gvb_nav {
  top: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: white; //根据主题而来
  position: fixed;
  transition: all .3s;
  color: var(--nav_text_color);

  &.isShow {
    background-color: var(--color-bg-1);
    color: var(--color-text-1);

    a {
      text-decoration: none;
      color: var(--color-text-2);
    }
  }

  a {
    text-decoration: none;
    color: var(--nav_text_color);

    &.router-link-exact-active {
      color: var(--active);
    }
  }

  .gvb_nav_container {
    width: var(--container_width);
    height: 50px;
    display: flex;
    align-items: center;


    .left {
      width: 70%;
      display: flex;
      align-items: center;

      .logo {
        margin-right: 40px;

        .slogan {
          font-size: 18px;
        }

        .en_slogan {
          font-size: 12px;
          margin-top: 2px;
          color: var(--color-text-2);
        }
      }

      .nav {
        > a {
          margin-right: 30px;
          font-size: 16px;
        }
      }

      .gvb_search {
        svg {
          cursor: pointer;
        }
      }
    }

    .right {
      width: 30%;
      display: flex;
      justify-content: end; //往右走
      .theme {
        margin-left: 20px;
        display: flex;
        align-items: center;

        svg {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<template>
  <div class="gvb_admin">
    <aside :class="{collapsed:store.collapsed}">
      <Gvb_logo></Gvb_logo>
      <Gvb_menu></Gvb_menu>
    </aside>

    <main>
      <div class="gvb_head">
        <Gvb_bread_crumbs></Gvb_bread_crumbs>
        <div class="gvb_feature_area">
          <IconHome class="action_icon" @click="goIndex"></IconHome>
          <Gvb_theme></Gvb_theme>
          <Gvb_user_info_menu></Gvb_user_info_menu>
        </div>
      </div>
      <Gvb_tabs></Gvb_tabs>
      <div class="gvb_container">
        <router-view v-slot="{Component}">
          <!--出去进来 绑定name-->
          <transition name="fade" mode="out-in">
            <!--is 就是组件-->
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import {IconDown, IconHome} from '@arco-design/web-vue/es/icon';
import Gvb_menu from "@/components/admin/gvb_menu.vue";
import Gvb_bread_crumbs from '@/components/admin/gvb_bread_crumbs.vue';
import Gvb_logo from "@/components/admin/gvb_logo.vue";
import Gvb_tabs from "@/components/admin/gvb_tabs.vue";
import Gvb_theme from "@/components/common/gvb_theme.vue";
import {useStore} from "@/stores";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import type {Component} from "vue";
import Gvb_user_info_menu from "@/components/common/gvb_user_info_menu.vue";

const store = useStore()
const router = useRouter()

function goIndex() {
  router.push({
    name: "index"
  })
}
</script>

<style lang="scss">
.gvb_admin {
  display: flex;
  color: var(--color-text-1);
  height: 100vh;

  aside {
    width: 240px;
    border-right: 1px solid var(--bg); /*变量的颜色取决于--bg*/
    height: 100vh; /*表示视口高度的百分比单位，即视口的 100% 高度。视口高度是指用户当前浏览器窗口的可见区域的高度*/
    background-color: var(--color-bg-1);
    transition: all .3s;
    position: relative;
  }

  aside.collapsed {
    width: 48px;

    & ~ main { /*选中当前*/
      width: calc(100% - 48px);
    }
  }

  main {
    width: calc(100% - 240px);
    overflow-x: hidden;
    overflow-y: auto;
    transition: all .3s;

    .gvb_head {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid var(--bg);
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;
      background-color: var(--color-bg-1);

      .gvb_feature_area {
        display: flex;
        align-items: center;

        .gvb_user_info_menu {
          margin-right: 30px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }

        .gvb_user_info_menu_drop {
          display: flex;
          align-items: center;

          .gvb_user_info_menu_span {
            margin: 0 5px;
          }
        }


        .action_icon {
          margin-right: 10px;
          cursor: pointer;
          font-size: 16px;
          transition: color 3s;

          &:hover {
            color: var(--active);

          }
        }
      }
    }

    .gvb_container {
      background-color: var(--bg);
      min-height: calc(100vh - 90px); //60+30
      padding: 20px;

    }
  }
}

.fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease-out;
}

.fade-enter-to {
  transform: translateX(0px);
  opacity: 1;
}

</style>
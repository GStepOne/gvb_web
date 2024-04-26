<template>
  <div class="gvb_menu">
    <a-menu
        @menu-item-click="clickMenu"
        show-collapse-button
        :default-open-keys=openKeys
        :default-selected-keys=selectedKeys
        @collapse="collapse"
    >
      <template v-for="item in menuList" :key="item.key">
        <a-menu-item v-if="item.child?.length === 0" :key="item.name">
          {{ item.title }}
          <template #icon>
            <!--这样可以动态显示-->
            <component :is="item.icon"></component>
          </template>
        </a-menu-item>

        <a-sub-menu v-if="item.child?.length !== 0" :key="item.name">
          <template #icon>
            <component :is="item.icon"></component>
          </template>

          <template #title>
            {{ item.title }}
          </template>

          <a-menu-item :key="sub.name" v-for="sub in item.child">
            {{ sub.title }}
          </a-menu-item>

        </a-sub-menu>

      </template>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import {
  IconMenu,
  IconApps,
  IconUser, IconChineseFill, IconArchive, IconEmail, IconSettings,
} from '@arco-design/web-vue/es/icon';
import {type Component, watch} from "vue";
import {useRouter, useRoute} from "vue-router";
import {ref} from "vue";
import {useStore} from "@/stores"

const store = useStore()
const router = useRouter()
const route = useRoute()

interface MenuType {
  key: string
  title: string
  icon?: Component
  name?: string //路由名字
  child?: MenuType[]
}

const menuList: MenuType[] = [
  {key: "1", title: "首页", icon: IconMenu, name: "home", child: []},
  {
    key: "2", title: "个人中心", icon: IconChineseFill, name: "user_center", child: [
      {key: "2-1", title: "我的信息", name: "user_info", child: []},
      {key: "2-2", title: "我的发布", name: "add_article", child: []},
      {key: "2-3", title: "我的收藏", name: "user_collects", child: []},
      {key: "2-4", title: "我的消息", name: "user_messages", child: []},
    ]
  },
  {
    key: "3", title: "文章管理", icon: IconArchive, name: "article", child: [
      {key: "3-1", title: "文章列表", name: "article_list", child: []},
      {key: "3-2", title: "图片列表", name: "image_list", child: []},
      {key: "3-3", title: "评论列表", name: "comment_list", child: []},
    ]
  },
  {
    key: "4", title: "用户管理", icon: IconUser, name: "users", child: [
      {key: "4-1", title: "用户列表", name: "user_list", child: []},
      {key: "4-2", title: "消息列表", name: "message_list", child: []},
    ]
  },
  {
    key: "5", title: "群聊管理", icon: IconEmail, name: "chat_group", child: [
      {key: "5-1", title: "聊天记录", name: "chat_list", child: []},
    ]
  },
  {
    key: "6", title: "系统管理", icon: IconSettings, name: "system", child: [
      {key: "6-1", title: "菜单列表", name: "menu_list", child: []},
      {key: "6-2", title: "广告列表", name: "promotion_list", child: []},
      {key: "6-3", title: "系统日志", name: "log_list", child: []},
      {key: "6-4", title: "系统配置", name: "system_settings", child: []},
    ]
  }
]

//获取路由的名字和
const selectedKeys = ref([route.name])
const openKeys = ref([route.matched[1].name])

//监听路由名字的变化
watch(() => route.name, () => {
  selectedKeys.value = [route.name]
  openKeys.value = [route.matched[1].name]
})


function clickMenu(name: string) {
  console.log("clickMenu", name)
  router.push({
    name: name
  })
}

function collapse(collapsed: boolean) {
  //侧边栏收缩状态存pinia
  store.setCollapsed(collapsed)
}
</script>

<style lang="scss">
.gvb_menu {
  .arco-menu {
    position: inherit;
  }

  .arco-menu-collapse-button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate((50%, -50%));
    opacity: 0;
    transition: all .3s;
  }
}

//鼠标放上去显示展开按钮
aside:hover {
  .gvb_menu {
    .arco-menu-collapse-button {
      opacity: 1;
    }
  }
}
</style>
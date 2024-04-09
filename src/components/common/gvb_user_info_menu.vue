<template>
  <div class="gvb_user_info_menu">
    <a-dropdown @select="select" class="gvb_dropdown">
      <div class="gvb_user_info_menu_drop">
        <img :src="store.userInfo.avatar" alt="">
        <span class="gvb_user_info_menu_span">{{ store.userInfo.nick_name }}</span>
        <IconDown></IconDown>
      </div>
      <template #content>
        <template v-for="(item,index) in dOptionList" :key="index">
          <a-dgroup v-if="item.type === 'line'"></a-dgroup>
          <a-doption v-else :value="item.name">{{ item.title }}</a-doption>

        </template>
      </template>
    </a-dropdown>
  </div>
</template>

<style lang="scss">
.gvb_dropdown {
  .arco-dropdown-group-title {
    margin-top: 0;

    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--bg);
      position: absolute;
      left: 0;
    }
  }
}
</style>

<script setup lang="ts">
import {IconDown} from "@arco-design/web-vue/es/icon";
import {useStore} from "@/stores";
import type {tabType} from "@/types";
import router from "@/router";

interface dopType extends tabType {
  type?: string
}


const dOptionList: dopType[] = [
  {name: "user_info", title: "个人信息",},
  {name: "", title: "", type: "line"},
  {name: "article_list", title: "文章列表",},
  {name: "user_list", title: "用户列表"},
  {name: "log_list", title: "系统日志"},
  {name: "", title: "", type: "line"},
  {name: "logout", title: "注销退出"},
]

const store = useStore();

//避开ts类型报错
function select(value: any) {
  let val = value as string
  if (val === "logout") {
    return
  }
  return router.push({
    name: val
  })
}
</script>

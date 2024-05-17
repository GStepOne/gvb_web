<script setup lang="ts">
import {ref,reactive} from "vue";
import Gvb_nav from "@/components/web/gvb_nav.vue";
import Gvb_chat_group from "@/components/common/gvb_chat_group.vue";
import type {chatGroupConfigType} from "@/api/chat_api";
//获取配置信息
const config = reactive<chatGroupConfigType>({
  is_anonymous: true,
  is_show_time: false,
  default_limit: 50,
  welcome_title: "Jack 聊天室",
  is_online_people: false,
  is_send_image: false,
  is_paste: false,
  is_send_file: false,
  is_markdown: false,
  content_length: 100,
})
</script>

<template>
  <div class="chat_view">
    <gvb_nav no-scroll></gvb_nav>
    <main>
      <div class="container">
        <gvb_chat_group :config="config">
<!--          :config="chatGroupConfigType"-->
        </gvb_chat_group>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
.chat_view {
  height: 100vh;
  background-color: var(--bg);

  main {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 60px;

    .container {
      width: var(--container_width);
    }
  }
}
</style>
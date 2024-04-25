<script setup lang="ts">

import Gvb_title from "@/components/common/gvb_title.vue";
import {reactive, ref, watch} from "vue";
import type {chatGroupConfigType} from "@/api/chat_api";
import {settingsInfoApi, settingsInfoUpdateApi} from "@/api/settings_api";
import type {baseResponse} from "@/api";
import {Message} from "@arco-design/web-vue";

interface Props {
  config: chatGroupConfigType
}

// 接收父组件传递的 config 数据作为 props
const props = defineProps<Props>()

const form = reactive<chatGroupConfigType>({
  is_anonymous: true,
  is_show_time: false,
  default_limit: 50,
  welcome_title: "Jack 聊天室22",
  is_online_people: false,
  is_send_image: false,
  is_send_file: false,
  is_paste: false,
})

const is_show = ref<boolean>(true)

const emits = defineEmits(["getConfig"])
//更新配置
async function updateConfig() {
  let res = await settingsInfoUpdateApi("chat_group", props.config)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  //让父组件去更新
  // getConfig()
  console.log("通知父类config了")
  emits("getConfig")
}
</script>

<template>
  <div class="chat_group_config_view">
    <gvb_title title="群聊设置">
    </gvb_title>
    <div class="chat_group">
      <!--is_show 防止闪烁-->
      <a-form v-if="is_show" :model="form" :label-col-props="{span:7}" :wrapper-col-props="{span:16}">

        <a-form-item label="匿名群聊">
          <a-switch v-model="props.config.is_anonymous"></a-switch>
          <template #extra>
            开启后用户不登录也能聊天
          </template>
        </a-form-item>

        <a-form-item label="显示时间">
          <a-switch v-model="props.config.is_show_time"></a-switch>
          <template #extra>
            悬浮消息，显示时间
          </template>
        </a-form-item>

        <a-form-item label="初始条数">
          <a-input-number v-model="props.config.default_limit" placeholder="初始条数50"></a-input-number>
          <template #extra>
            进入聊天室时显示消息的条数
          </template>
        </a-form-item>

        <a-form-item label="欢迎语">
          <a-input placeholder="欢迎语" v-model="props.config.welcome_title"></a-input>
          <template #extra>
            聊天头部显示的文字
          </template>
        </a-form-item>

        <a-form-item label="显示人数">
          <a-switch v-model="props.config.is_online_people"></a-switch>
          <template #extra>
            聊天头部下方显示在线人数
          </template>
        </a-form-item>

        <a-form-item label="可发图片">
          <a-switch v-model="props.config.is_send_image"></a-switch>
          <template #extra>
            配置后可以显示图片
          </template>
        </a-form-item>

        <a-form-item label="粘贴上传">
          <a-switch v-model="props.config.is_paste"></a-switch>
          <template #extra>
            配置后可以粘贴上传图片
          </template>
        </a-form-item>
      </a-form>
      <a-button type="primary" @click="updateConfig">更新配置</a-button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
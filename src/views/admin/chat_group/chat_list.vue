<script setup lang="ts">
import Gvb_chat_group from "@/components/common/gvb_chat_group.vue";
import chat_group_config from "@/components/admin/chat_group_config.vue";
import {reactive} from "vue";
import {Message} from "@arco-design/web-vue";
import type {chatGroupConfigType} from "@/api/chat_api";
import {settingsInfoApi} from "@/api/settings_api";
import type {baseResponse} from "@/api";

interface Props {
  config: object
}

const props = defineProps<Props>()

//获取配置信息
const config = reactive<chatGroupConfigType>({
  is_anonymous: true,
  is_show_time: false,
  default_limit: 50,
  welcome_title: "Jack 聊天室",
  is_online_people: false,
  is_send_image: false,
  is_paste: false,
})

//获取配置
async function getConfig() {
  let res = await settingsInfoApi("chat_group") as baseResponse<chatGroupConfigType>

  console.log('data', typeof res.data) //object
  if (res.code) {
    Message.error(res.msg);
    return
  }
  // is_show.value = true
  Object.assign(config, res.data)

  console.log("now", config)
}

//悄摸的执行
getConfig()


</script>
<template>
  <div class="chat_list_view">
    <gvb_chat_group class="record_list_view" :config="config"></gvb_chat_group>
    <div class="config">
      <!--getConfig 是接受子组件的 emits事件-->
      <chat_group_config :config="config" @getConfig=getConfig></chat_group_config>
    </div>

  </div>
</template>
<style scoped lang="scss">
.chat_list_view {
  display: flex;
  height: calc(100vh - 108px);
  justify-content: space-between;

  .record_list_view {
    width: calc(100% - 300px);
    //height: 100%;
    padding: 10px;
    //background-color: var(--color-bg-1);
    border-radius: 5px;
    overflow-y: auto;
  }

  .config {
    width: 280px;
    height: 100%;
    border-radius: 5px;
    background-color: var(--color-bg-1);
    padding: 10px;
    margin-left: 20px;
  }
}
</style>

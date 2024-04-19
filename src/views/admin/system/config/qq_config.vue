<script setup lang="ts">

import Gvb_title from "@/components/common/gvb_title.vue";
import {reactive, ref} from "vue";
import gvb_help from "@/components/admin/gvb_help.vue";
import type {QQType} from "@/api/settings_api";
import {settingsInfoUpdateApi, settingsInfoApi} from "@/api/settings_api";
import {Message} from "@arco-design/web-vue";
import type {baseResponse} from "@/api";

const form = reactive({
  app_id: "",
  app_key: "",
  redirect: "",
})

async function getData() {
  let res = await settingsInfoApi("qq") as baseResponse<QQType>
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(form, res.data)
}

getData();

const formRef = ref()
const helpTitle = ref("QQ登录帮助")

async function qqInfoUpdate() {
  let val = await formRef.value.validate()
  if (val) {
    Message.error(val.msg)
    return
  }
  let res = await settingsInfoUpdateApi("qq", form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

const helpList = [{
  title: "appId和appkey",
  abs: "去QQ互联申请一个应用就有了",
  content: "参考链接:<a href='https://connect.qq.com' target='_blank'>https://connect.qq.com</a>",
},
]

</script>

<template>
  <div class="qq_config">
    <div class="left">
      <div class="site_info">
        <gvb_title title="QQ登录配置"></gvb_title>
        <a-alert style="margin-top: 10px">配置QQ登录之后，可以用QQ登录本系统</a-alert>
        <a-form ref="formRef" :model="form" :label-col-props="{span:6}" :wrapper-col-props="{span:18}">
          <a-form-item field="app_id" label="app_id"
                       :rules="[{required:true,message:'请输入app_id'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.app_id" placeholder="app_id"></a-input>
          </a-form-item>

          <a-form-item field="app_key" label="app_key"
                       :rules="[{required:true,message:'请输入app_key'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.app_key" placeholder="app_key"></a-input>
          </a-form-item>

          <a-form-item field="redirect" label="回调地址"
                       :rules="[{required:true,message:'请输入回调地址'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.redirect" placeholder="回调地址"></a-input>
          </a-form-item>
        </a-form>
        <div class="config_update">
          <a-button type="primary" @click="qqInfoUpdate">更新</a-button>
        </div>
      </div>
    </div>
    <div class="right">
      <gvb_help :data="helpList" :helpTitle="helpTitle"></gvb_help>
    </div>
  </div>
</template>

<style scoped lang="scss">
.qq_config {
  display: flex;

  .left {
    width: 60%;

    .config_update {
      margin-top: 10px;

      button {
        margin-right: 10px;
      }
    }
  }

  .arco-form {
    margin-top: 10px;
  }

  .right {
    width: 40%;
    margin-left: 20px;
  }

}
</style>
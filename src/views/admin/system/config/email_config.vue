<script setup lang="ts">

import Gvb_title from "@/components/common/gvb_title.vue";
import {reactive, ref} from "vue";
import gvb_help from "@/components/admin/gvb_help.vue";
import type {EmailType, QiniuType, QQType, JwtType} from "@/api/settings_api";
import Gvb_upload_image from "@/components/common/gvb_upload_image.vue";
import {settingsInfoUpdateApi, settingsInfoApi} from "@/api/settings_api";
import {Message} from "@arco-design/web-vue";
import type {baseResponse} from "@/api";

const form = reactive({
  host: "",
  port: 0,
  user: "",
  password: "",
  default_from_email: "",
  use_ssl: true,
  use_tls: false,
})

const helpTitle = ref("邮箱帮助")
async function getData() {
  let res = await settingsInfoApi("email") as baseResponse<EmailType>
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(form, res.data)
}

getData();

const formRef = ref()

async function emailInfoUpdate() {
  let val = await formRef.value.validate()
  if (val) {
    Message.error(val.msg)
    return
  }
  let res = await settingsInfoUpdateApi("email", form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

const helpList = [{
  title: "邮箱域名，邮箱端口",
  abs: "每个邮件服务的smtp域名和端口都不一样，请自己检查",
  content: `
  参考链接：<a href="https://image.fengfengzhidao.com/pic/20230930160112.png" target="_blank">https://image.fengfengzhidao.com/pic/20230930160112.png</a>
  `
}, {
  title: "发信邮箱与密码",
  abs: "密码不一定是你的邮箱登录密码",
  content: '<a-image imageUrl="https://image.fengfengzhidao.com/pic/20230930160112.png"/></a-image>',
},
  {
    title: "发信人",
    abs: "发给用户的邮件上，显示的名称",
    content: ''
  },
  {
    title: "ssl",
    abs: "启用了ssl，端口号可能要调整",
    content: ''
  },
]

</script>

<template>
  <div class="site_config">
    <div class="left">
      <div class="site_info">
        <gvb_title title="邮箱配置"></gvb_title>
        <a-alert>配置邮箱之后，系统将会通知到你的邮箱，不配置则不通知</a-alert>
        <a-form ref="formRef" :model="form" :label-col-props="{span:5}" :wrapper-col-props="{span:16}">
          <a-form-item field="host" label="邮箱域名"
                       :rules="[{required:true,message:'邮箱域名'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.host" placeholder="邮箱域名"></a-input>
          </a-form-item>

          <a-form-item field="port" label="邮箱端口"
                       :rules="[{required:true,message:'邮箱端口'}]"
                       :validate-trigger="['blur']"
          >
            <a-input-number v-model="form.port" placeholder="邮箱端口"></a-input-number>
          </a-form-item>

          <a-form-item field="default_from_email" label="发信邮箱"
                       :rules="[{required:true,message:'请输入发信邮箱'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.default_from_email" placeholder="发信邮箱"></a-input>
          </a-form-item>

          <a-form-item field="password" label="密码"
                       :rules="[{required:true,message:'请输入密码'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.password" type="password" placeholder="密码"></a-input>
          </a-form-item>

          <a-form-item field="default_from_email" label="发信人"
                       :rules="[{required:true,message:'发信人'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.default_from_email" placeholder="默认发信人"></a-input>
          </a-form-item>

          <a-form-item field="use_ssl" label="use_ssl">
            <a-switch v-model="form.use_ssl"></a-switch>
          </a-form-item>

          <a-form-item field="use_tls" label="use_tls">
            <a-switch v-model="form.use_tls"></a-switch>
          </a-form-item>
        </a-form>
        <div class="config_update">
          <a-button status="success"> 测试链接 </a-button>
          <a-button type="primary" @click="emailInfoUpdate">更新</a-button>
        </div>
      </div>
    </div>
    <div class="right">
      <gvb_help :data="helpList" :helpTitle="helpTitle"></gvb_help>
    </div>
  </div>
</template>

<style scoped lang="scss">
.site_config {
  display: flex;

  .left {
    width: 50%;

    .config_update {
      margin-top: 10px;
      button{
        margin-right: 10px;
      }
    }
  }

  .arco-form {
    margin-top: 10px;
  }

  .right {
    width: 50%;
    margin-left: 20px;
  }

}
</style>
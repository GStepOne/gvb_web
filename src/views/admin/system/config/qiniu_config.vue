<script setup lang="ts">

import Gvb_title from "@/components/common/gvb_title.vue";
import {reactive, ref} from "vue";
import gvb_help from "@/components/admin/gvb_help.vue";
import type {EmailType, QiniuType, QQType, JwtType} from "@/api/settings_api";
import {settingsInfoUpdateApi, settingsInfoApi} from "@/api/settings_api";
import {Message} from "@arco-design/web-vue";
import type {baseResponse} from "@/api";

const form = reactive({
  access_key: "",
  secret_key: "",
  bucket: "",
  cdn: "",
  zone: "",
  size: 0,
  prefix: "",
  enable: true
})

async function getData() {
  let res = await settingsInfoApi("qiniu") as baseResponse<EmailType>
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(form, res.data)
}

getData();

const formRef = ref()
const helpTitle = ref("七牛云帮助")
async function QiniuInfoUpdate() {
  let val = await formRef.value.validate()
  if (val) {
    Message.error(val.msg)
    return
  }
  let res = await settingsInfoUpdateApi("qiniu", form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

const helpList = [{
  title: "access_key，Secret_key",
  abs: "个人中心->秘钥管理",
  content: "",
}, {
  title: "bucket",
  abs: "图片存储的桶的名字",
  content: '对象存储->空间管理',
},
  {
    title: "prefix",
    abs: "链接前缀",
    content: '可以理解为图片上传到哪一个目录'
  },
  {
    title: "CDN域名",
    abs: "七牛云的对象存储域名，后面要加上斜杠",
    content: ''
  },
  {
    title: "zone",
    abs: "填写地区对应的代码",
    content: '华东-浙江</br> 华北-河北'
  },
]

</script>

<template>
  <div class="qiniu_config">
    <div class="left">
      <div class="site_info">
        <gvb_title title="七牛云配置"></gvb_title>
        <a-alert style="margin-top: 10px">启用七牛之后，图片将上传到七牛云服务器</a-alert>
        <a-form ref="formRef" :model="form" :label-col-props="{span:6}" :wrapper-col-props="{span:18}">
          <a-form-item field="access_key" label="access_key"
                       :rules="[{required:true,message:'access_key'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.access_key" placeholder="请输入access_key"></a-input>
          </a-form-item>

          <a-form-item field="secret_key" label="secret_key"
                       :rules="[{required:true,message:'请输入secret_key'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.secret_key" placeholder="secret_key"></a-input>
          </a-form-item>

          <a-form-item field="bucket" label="bucket"
                       :rules="[{required:true,message:'请输入bucket'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.bucket" placeholder="bucket"></a-input>
          </a-form-item>

          <a-form-item field="cdn" label="cdn"
                       :rules="[{required:true,message:'请输入cdn'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.cdn" placeholder="cdn"></a-input>
          </a-form-item>

          <a-form-item field="zone" label="zone"
                       :rules="[{required:true,message:'zone'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.zone" placeholder="zone"></a-input>
          </a-form-item>

          <a-form-item field="prefix" label="图片前缀">
            <a-input v-model="form.prefix" placeholder="前缀"></a-input>
          </a-form-item>

          <a-form-item field="size" label="图片大小限制(mb)">
            <a-input-number v-model="form.size"></a-input-number>
            <template #extra>单位是MB</template>
          </a-form-item>

          <a-form-item field="enable" label="是否启用七牛云">
            <a-switch v-model="form.enable"></a-switch>
          </a-form-item>
        </a-form>
        <div class="config_update">
          <a-button type="primary" @click="QiniuInfoUpdate">更新</a-button>
        </div>
      </div>
    </div>
    <div class="right">
      <gvb_help :data="helpList" :helpTitle="helpTitle"></gvb_help>
    </div>
  </div>
</template>

<style scoped lang="scss">
.qiniu_config {
  display: flex;

  .left {
    width: 50%;

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
    width: 50%;
    margin-left: 20px;
  }

}
</style>
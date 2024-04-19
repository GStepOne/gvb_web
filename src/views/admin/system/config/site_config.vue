<script setup lang="ts">

import Gvb_title from "@/components/common/gvb_title.vue";
import {reactive, ref} from "vue";
import type {siteInfoType} from "@/api/settings_api";
import Gvb_upload_image from "@/components/common/gvb_upload_image.vue";
import {siteInfoUpdateApi, siteInfoApi} from "@/api/settings_api";
import {Message} from "@arco-design/web-vue";

const form = reactive({
  addr: "",
  bei_an: "",
  bilibili: "",
  created_at: "",
  email: "",
  gitee_url: "",
  github_url: "",
  job: "",
  name: "",
  qq_image: "",
  slogan: "",
  slogan_en: "",
  title: "",
  version: "",
  web: "",
  wechat_image: "",
})

async function getData() {
  let res = await siteInfoApi()
  Object.assign(form, res.data)
}

getData();

const formRef = ref()

async function siteInfoUpdate() {
  let val = await formRef.value.validate()
  if (val) {
    Message.error(val.msg)
    return
  }

  let res = await siteInfoUpdateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

</script>

<template>
  <div class="site_config">
    <div class="left">
      <div class="site_info">
        <gvb_title title="站点配置"></gvb_title>
        <a-form ref="formRef" :model="form" :label-col-props="{span:5}" :wrapper-col-props="{span:18}">
          <a-form-item field="title" label="网站标题"
                       :rules="[{required:true,message:'网站标题'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.title" placeholder="网站标题"></a-input>
          </a-form-item>

          <a-form-item field="slogan" label="slogan"
                       :rules="[{required:true,message:'请输入英文slogan'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.slogan" placeholder="slogan"></a-input>
          </a-form-item>

          <a-form-item field="slogan_en" label="slogan_en"
                       :rules="[{required:true,message:'请输入英文slogan_en'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.slogan_en" placeholder="slogan_en"></a-input>
          </a-form-item>

          <a-form-item field="bei_an" label="备案号"
                       :rules="[{message:'请输入备案号'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.bei_an" placeholder="备案号"></a-input>
          </a-form-item>

          <a-form-item field="version" label="版本号"
                       :rules="[{message:'请输入版本号'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.version" placeholder="版本号"></a-input>
          </a-form-item>


          <a-form-item field="created_at" label="建站日期"
                       :rules="[{message:'建站日期'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.created_at" placeholder="建站日期"></a-input>
          </a-form-item>

          <a-form-item field="qq_image" label="qq二维码"
                       :rules="[{message:'qq二维码'}]"
                       :validate-trigger="['blur']"
          >
            <gvb_upload_image v-model="form.qq_image" placeholder="QQ二维码"></gvb_upload_image>
          </a-form-item>

          <a-form-item field="wechat_image" label="微信二维码"
                       :rules="[{message:'微信二维码'}]"
                       :validate-trigger="['blur']"
          >
            <gvb_upload_image v-model="form.wechat_image" placeholder="微信二维码"></gvb_upload_image>
          </a-form-item>


        </a-form>
        <div class="site_config_update">
          <a-button type="primary" @click="siteInfoUpdate">更新</a-button>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="user_info">
        <gvb_title title="用户信息"></gvb_title>
        <a-form :model="form" :label-col-props="{span:4}" :wrapper-col-props="{span:18}">
          <a-form-item field="name" label="昵称"
                       :rules="[{message:'请输入昵称'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.name" placeholder="昵称"></a-input>
          </a-form-item>

          <a-form-item field="job" label="工作"
                       :rules="[{message:'请输入工作'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.job" placeholder="工作"></a-input>
          </a-form-item>

          <a-form-item field="addr" label="地址"
                       :rules="[{message:'请输入地址'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.addr" placeholder="addr"></a-input>
          </a-form-item>

          <a-form-item field="email" label="邮箱"
                       :rules="[{message:'请输入邮箱'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.email" placeholder="email"></a-input>
          </a-form-item>
        </a-form>
      </div>
      <div class="link_info">
        <gvb_title title="链接信息"></gvb_title>
        <a-form :model="form" :label-col-props="{span:4}" :wrapper-col-props="{span:18}">
          <a-form-item label="bilibili" :validate-trigger="['blur']">
            <a-input v-model="form.name" placeholder="哔哩哔哩"></a-input>
          </a-form-item>

          <a-form-item label="gitee">
            <a-input v-model="form.job" placeholder="gitee"></a-input>
          </a-form-item>

          <a-form-item label="github">
            <a-input v-model="form.github_url" placeholder="github"></a-input>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
//这里千万不要直接.left 一定要套在site_config
.site_config {
  display: flex;

  .left {
    width: 50%;

    .site_config_update {
      margin-top: 10px;
    }
  }

  .arco-form {
    margin-top: 10px;
  }

  .right {
    width: 50%;
  }
}
</style>
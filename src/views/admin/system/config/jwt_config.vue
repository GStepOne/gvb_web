<script setup lang="ts">

import Gvb_title from "@/components/common/gvb_title.vue";
import {reactive, ref} from "vue";
import gvb_help from "@/components/admin/gvb_help.vue";
import type {JwtType} from "@/api/settings_api";
import {settingsInfoUpdateApi, settingsInfoApi} from "@/api/settings_api";
import {Message} from "@arco-design/web-vue";
import type {baseResponse} from "@/api";

const form = reactive({
  secret: "",
  expires: 0,
  issuer: "",
})

async function getData() {
  let res = await settingsInfoApi("jwt") as baseResponse<JwtType>
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(form, res.data)
}

getData();

const formRef = ref()
const helpTitle = ref("JWT登录帮助")

async function jwtInfoUpdate() {
  let val = await formRef.value.validate()
  if (val) {
    Message.error(val.msg)
    return
  }
  let res = await settingsInfoUpdateApi("jwt", form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

const helpList = [{
  title: "秘钥",
  abs: "用于jwt的加解密，请妥善保管",
  content: "",
},
]

</script>

<template>
  <div class="jwt_config">
    <div class="left">
      <div class="site_info">
        <gvb_title title="JWT登录配置"></gvb_title>
        <a-alert style="margin-top: 10px">配置jwt登录之后，可以用jwt登录本系统</a-alert>
        <a-form ref="formRef" :model="form" :label-col-props="{span:6}" :wrapper-col-props="{span:18}">
          <a-form-item field="secret" label="Jwt秘钥"
                       :rules="[{required:true,message:'请输入secret'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.secret" placeholder="secret"></a-input>
          </a-form-item>

          <a-form-item field="expires" label="过期时间"
                       :rules="[{required:true,message:'请输入expires'}]"
                       :validate-trigger="['blur']"
          >
            <a-input-number v-model="form.expires" placeholder="过期时间"></a-input-number>
            <template #extra>时间单位是小时</template>
          </a-form-item>

          <a-form-item field="issuer" label="发行人"
                       :rules="[{required:true,message:'请输入发行人'}]"
                       :validate-trigger="['blur']"
          >
            <a-input v-model="form.issuer" placeholder="发行人"></a-input>
          </a-form-item>
        </a-form>
        <div class="config_update">
          <a-button type="primary" @click="jwtInfoUpdate">更新</a-button>
        </div>
      </div>
    </div>
    <div class="right">
      <gvb_help :data="helpList" :helpTitle="helpTitle"></gvb_help>
    </div>
  </div>
</template>

<style scoped lang="scss">
.jwt_config {
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
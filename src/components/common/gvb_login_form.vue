<template>
  <Form class="gvb_login_form" ref="formRef" :model="form" :label-col-props="{span:0}" :wrapper-col-props="{span:24}">
    <div class="title">用户登录</div>
    <!--用户名-->
    <FormItem field="user_name" label="用户名"
                 :rules="[{required:true,message:'请输入用户名'}]"
                 :validate-trigger="['blur']"
    >
      <Input v-model="form.user_name" placeholder="用户名">
        <template #prefix>
          <icon-user/>
        </template>
      </Input>
    </FormItem>
    <!--密码框-->
    <FormItem field="password" label="密码"
                 :rules="[{required:true,message:'请输入密码'}]"
                 :validate-trigger="['blur']"
    >
      <Input type="password" v-model="form.password" placeholder="密码">
        <template #prefix>
          <icon-lock/>
        </template>
      </Input>
    </FormItem>

    <Button type="primary" @click="loginEmail">登录</Button>

    <div class="other-login">
      <div class="label">第三方登录</div>
      <div class="icons">
        <a href="javascript:void(0)" @click="qqLogin">
          <img src="/image/icon/qq.png" alt="qq登录">
        </a>
      </div>
    </div>
  </Form>
</template>

<style lang="scss">

.gvb_login_form {
  .title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 10px;
    color: var(--active);
    font-family: kuaikanshijieti;
  }

  .other-login {
    margin-top: 20px;
    //display: flex;
    //align-items: center;
    //color: var(--color-text-3);

    .label {
      display: flex;
      align-items: center;
      color: var(--color-text-3);
      justify-content: space-around;

      &::before {
        display: inline-flex;
        width: 35%;
        height: 1px;
        content: "";
        background-color: var(--color-text-4);
      }

      &::after {
        display: inline-flex;
        width: 35%;
        height: 1px;
        content: "";
        background-color: var(--color-text-4);
      }

    }

    .icons {
      display: flex;
      justify-content: center;
      margin-top: 10px;

      > a {
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
</style>

<script setup lang="ts">

import {IconLock, IconUser} from "@arco-design/web-vue/es/icon";
import {reactive, ref} from "vue";
import "@/assets/font.css"
import {loginEmailApi, loginQQPath} from "@/api/user_api";
import type {loginEmailType} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import {useStore} from "@/stores";
import {useRoute} from "vue-router";
import { Form,FormItem,Input,Button } from "@arco-design/web-vue";

const emits = defineEmits(["ok"])
// const route = useRoute()
//因为是模态窗 不会销毁组件
const store = useStore()

const form = reactive(<loginEmailType>{
  user_name: "",
  password: ""
})

const formRef = ref()

//清除form数据
function formReset() {
  formRef.value.resetFields(Object.keys(form));
  formRef.value.clearValidate(Object.keys(form));
}

defineExpose({
  formReset
})

async function loginEmail() {
  //校验一下参数
  let val = await formRef.value.validate()
  if (val) {
    return
  }
  //把form的值传入
  let res = await loginEmailApi(form)

  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  //直接调用404
  store.setToken(res.data)
  emits("ok")
}

const props = defineProps({
  qqRedirectPath: {
    type: String,
  }
})


async function qqLogin() {
  let res = await loginQQPath()
  if (res.code) {
    Message.error(res.msg)
    return
  }

  if (res.data === "") {
    Message.warning("未配置qq登录")
    return
  }

  //如果props的qq跳转路径不变化
  let path = location.pathname
  console.log("当前path",path)
  if (props.qqRedirectPath) {
      path = props.qqRedirectPath
  }
  localStorage.setItem("redirectPath", path)
  window.open(res.data, "_self")
}
</script>
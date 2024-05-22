<template>
  <div class="gvb_login">
    <div class="gvb_login_mask">
      <Gvb_login_form @ok="ok" :qq-redirect-path="back"></Gvb_login_form>
    </div>
  </div>
</template>

<style lang="scss">
.gvb_login {
  background: url(/image/bg.png) 50%/cover no-repeat;
  width: 100%;
  height: 100vh;

  .gvb_login_mask {
    position: absolute;
    right: 0;
    width: 400px;
    height: 100%;
    background-color: var(--login_bg);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 40px;
  }
}
</style>

<script setup lang="ts">
import "@/assets/font.css"
import Gvb_login_form from "@/components/common/gvb_login_form.vue";

import {useRoute, useRouter} from "vue-router"
import {Message} from "@arco-design/web-vue";
import {qqLogin} from "@/api/user_api";
import {useStore} from "@/stores";

const store = useStore()
const route = useRoute()
const router = useRouter()//这里才是真正的路由跳转的方法

interface routerQuery {
  flag?: string
  code?: string
}

interface historyState {
  back: string
}

const back = (window.history.state as historyState).back

//qq登录
async function init(query: routerQuery) {
  if (query.code === undefined || query.flag !== 'qq') {
    Message.warning("建议您用qq登录")
    return
  }
  let res = await qqLogin(query.code)
  if (res.code) {
    Message.error(res.msg)
    return
  } else {
    Message.success(res.msg)
    store.setToken(res.data)
    // 重定向到上次登录的页面
    window.history.state.back
    let redirectUrl = localStorage.getItem("redirectPath")
    if (redirectUrl === null) {
      redirectUrl = "/nana"
    }
    router.push(redirectUrl)
  }
}

//立马调这个方法
init(route.query)

function ok() {
  let back = window.history.state.back
  console.log("这个是ok的值", back)
  if (back === null || back === "/") {
    back = "/nana"
  }
  router.push(back)
}
</script>

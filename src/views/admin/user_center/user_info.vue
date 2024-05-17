<script setup lang="ts">
import {reactive, ref} from "vue";
import {useStore} from "@/stores";
import {type userInfoType, userInfoApi, userInfoUpdateApi} from "@/api/user_api";
import Gvb_title from "@/components/common/gvb_title.vue";
import type {userInfoUpdateType} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import Gvb_update_password from "@/components/common/gvb_update_password.vue";
import router from "@/router";
import Gvb_bind_email from "@/components/common/gvb_bind_email.vue";
import Gvb_cropper_image from "@/components/common/gvb_cropper_image.vue";
import Gvb_user_info_preview from "@/components/common/gvb_user_info_preview.vue";

const store = useStore();
const form = reactive<userInfoType>({
  id: 0,
  created_at: "",
  nick_name: "",
  user_name: "",
  avatar: "",
  email: "",
  tel: "",
  addr: "",
  token: "",
  ip: "",
  role: "",
  role_id: 0,
  sign_status: "",
  integral: 0,
  sign: "", //slogan
  link: "", //跳转链接
})

async function getData() {
  let res = await userInfoApi()
  Object.assign(form, res.data)
}

getData()

const formRef = ref()
const updatePasswordVisible = ref(false)

//更新用户参数
async function userInfoUpdate() {
  let val = await formRef.value.validate()
  if (val) {
    Message.error(val.msg)
    return
  }
  let data: userInfoUpdateType = {
    link: form.link,
    nick_name: form.nick_name,
    sign: form.sign,
    avatar: form.avatar,
  }

  console.log("user_info",data)
  let res = await userInfoUpdateApi(data)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

//注销登录
function logOut() {
  store.logout()
  //进行跳转
  router.push({
    name: "login"
  })
}


const clipperRef = ref()

//裁剪相关的
interface IClipper {
  type: string // 上传类型
  allowTypeList: string[] // 接收允许上传的图片类型
  limitSize: number // 限制大小
  fixedNumber: number[] // 截图框的宽高比例
  fixedNumberAider?: number[] // 侧边栏收起截图框的宽高比例
  previewWidth: number // 预览宽度
  previewWidthAider?: number // 侧边栏收起预览宽度
}

const clipperData = ref<IClipper>({
  type: '',
  allowTypeList: [],
  limitSize: 1,
  fixedNumber: [],
  previewWidth: 0
})

/* 浏览器logo上传 */
const browserUpload = (): void => {
  clipperData.value = {
    type: 'browserLogo', // 该参数可根据实际要求修改类型
    allowTypeList: ['png', 'jpg', 'jpeg'], // 允许上传的图片格式
    limitSize: 1, // 限制的大小
    fixedNumber: [1, 1],  // 截图比例，可根据实际情况进行修改
    previewWidth: 100 // 预览宽度
  }
  // 打开裁剪组件
  clipperRef.value.uploadFile()
}

/* 保存logo自定义事件, 实际业务在此编写 */
function onConfirm(val: any) {
  console.log("接收到confirm",val)
  console.log(val, '点击保存按钮后的图片信息')

  //调取头像更新的接口
  form.avatar = "/"+val
  userInfoUpdate()
}

const bindEmailVisible = ref(false)
</script>
<template>
  <div class="user_info_view">
    <div class="left">
      <gvb_title title="用户信息" :label-col-props="{span:3}" :wrapper-col-props="{span:4}"></gvb_title>
      <a-form ref="formRef" :model="form">
        <!--用户名-->
        <a-form-item label="用户名">
          <span>{{ form.user_name }}</span>
        </a-form-item>

        <a-form-item label="头像">
          <a-avatar :image-url="form.avatar" @click="browserUpload"></a-avatar>
        </a-form-item>
        <!--图片裁剪-->
        <gvb_cropper_image
            ref="clipperRef"
            :type="clipperData.type"
            :allow-type-list="clipperData.allowTypeList"
            :limit-size="clipperData.limitSize"
            :fixed-number="clipperData.fixedNumber"
            :fixed-number-aider="clipperData.fixedNumberAider"
            :preview-width="clipperData.previewWidth"
            @confirm="onConfirm"
        ></gvb_cropper_image>
        <a-form-item field="nick_name" label="昵称"
                     :rules="[{required:true,message:'请输入昵称'}]"
                     :validate-trigger="['blur']"
        >
          <a-input @change="userInfoUpdate" v-model="form.nick_name" placeholder="昵称"></a-input>
        </a-form-item>

        <a-form-item label="我的签名">
          <a-textarea @change="userInfoUpdate" v-model="form.sign" placeholder="我的签名"
                      :auto-size="{minRows:4,maxRows:5}"></a-textarea>
        </a-form-item>

        <a-form-item label="我的博客">
          <a-input @change="userInfoUpdate" v-model="form.link" placeholder="请以http或者https开头"></a-input>
        </a-form-item>

        <a-form-item label="邮箱">
          <span>{{ form.email }}</span>
        </a-form-item>
        <a-form-item label="当前角色">
          <span>{{ form.role }}</span>
        </a-form-item>
        <a-form-item label="注册来源">
          <span>{{ form.sign_status }}</span>
        </a-form-item>
        <a-form-item label="用户积分">
          <span>{{ form.integral }}</span>
        </a-form-item>

      </a-form>
      <gvb_title title="操作"></gvb_title>
      <gvb_update_password v-model:visible="updatePasswordVisible"></gvb_update_password>
      <!--绑定邮箱-->
      <gvb_bind_email v-model:visible="bindEmailVisible"></gvb_bind_email>
      <div class="action_group">
        <a-button type="primary" @click="bindEmailVisible=true">绑定邮箱</a-button>
        <a-button type="primary" @click="updatePasswordVisible=true">修改密码</a-button>
        <a-button type="primary" status="danger" @click="logOut">注销退出</a-button>
      </div>
    </div>
    <div class="right">
      <gvb_title title="预览"></gvb_title>
      <div class="user_info_preview" style="width:300px; margin-top: 20px">
        <gvb_user_info_preview
            :data="{
              avatar:form.avatar,
              nickname:form.nick_name,
              sign:form.sign,
              link:form.link,
              collects_count:0,
              digg_count:0,
              comment_count:0,
              look_count:0,
            }"
        ></gvb_user_info_preview>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.user_info_view {
  display: flex;
  background-color: var(--color-bg-1);
  padding: 20px;
  border-radius: 5px;
  min-height: calc(100vh - 130px);

  .left {
    width: 40%;

    .arco-form {
      margin-top: 10px;
    }

    .action_group {
      margin-top: 10px;

      > button {
        margin-right: 10px;
      }
    }
  }

  .right {
    margin-left: 20px;
    width: calc(60% - 20px);
  }
}
</style>
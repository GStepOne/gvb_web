<script setup lang="ts">
import {reactive, ref} from "vue";
import {userCreateApi, type userCreateRequest} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import {roleOptions} from "@/global/global";

const props = defineProps({
  visible: {
    type: Boolean
  }
})

const form = reactive<userCreateRequest & { confirm_password: string }>({
  nickname: "",
  password: "",
  role: 2,
  username: "",
  confirm_password: ""
})

const formRef = ref()
const defaultForm = {
  nickname: "",
  password: "",
  role: 0,
  username: "",
  confirm_password: ""
}

const gvbTable = ref()

//验证输入的密码
async function confirmPasswordValidator(value: string | undefined, callback: (error?: string) => void): void {
  if (value !== form.password) {
    return callback("确认密码不一致")
  }
}

//向后端请求创建用户
async function createUser() {
  let val = await formRef.value.validate()
  if (val) {
    return false
  }
  //调用后端接口
  let res = await userCreateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  //让模态窗消失
  emits("update:visible", false)
  emits("ok")
  //请求用户列表
  gvbTable.value.getList()
  //target、source 由后往前灌，目的在于清空form的数据
  Object.assign(form, defaultForm)
  return true //说明校验通过
}

const emits = defineEmits(["update:visible", "ok"])
</script>

<template>
  <div>
    <!--    on-before-ok 不是vue的官方事件-->
    <a-modal title="创建用户" :visible="props.visible" :on-before-ok="createUser">
      <a-form ref="formRef" :model="form">
        <!--用户名-->
        <a-form-item field="user_name" label="用户名"
                     :rules="[{required:true,message:'请输入用户名'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.user_name" placeholder="用户名"></a-input>
        </a-form-item>
        <!--昵称-->
        <a-form-item field="nick_name" label="昵称"
                     :rules="[{required:true,message:'请输入昵称'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.nick_name" placeholder="昵称"></a-input>
        </a-form-item>

        <!--密码框-->
        <a-form-item field="password" label="密码"
                     :rules="[{required:true,message:'请输入密码'}]"
                     :validate-trigger="['blur']"
        >
          <a-input type="password" v-model="form.password" placeholder="密码"></a-input>
        </a-form-item>
        <!--确认密码框-->
        <a-form-item field="confirm_password" label="确认密码"
                     :rules="[{required:true,message:'请输入确认密码'},{validator:confirmPasswordValidator}]"
                     :validate-trigger="['blur']"
        >
          <a-input type="password" v-model="form.confirm_password" placeholder="确认密码"></a-input>
        </a-form-item>
        <!--权限-->
        <a-form-item field="role" label="权限">
          <a-select v-model="form.role" :options="roleOptions" placeholder="请选择角色"></a-select>
        </a-form-item>

      </a-form>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">

</style>
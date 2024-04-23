<script setup lang="ts">
import {reactive, ref} from "vue";
import {userUpdatePasswordApi, type userUpdatePasswordType} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import router from "@/router";
import {useStore} from "@/stores";

interface Props {
  visible: boolean
}
const store = useStore()
const props = defineProps<Props>()
const emits = defineEmits(["update:visible"])

function close() {
  emits("update:visible", false)
}

const form = reactive<userUpdatePasswordType>({
  origin_password: "",
  re_password: "",
  password: ""
})

const formRef = ref()

//更新密码
async function updatePassword() {
  let val = await formRef.value.validate()
  console.log(val)
  if (val) {
    Message.error(val.msg)
    return
  }
  let res = await userUpdatePasswordApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }

  Message.success(res.msg)
  emits("update:visible", false)
  store.logout()

  router.push({
    name: "login"
  })
}

</script>

<template>
  <!-- 用户点击确认按钮之前触发的事件-->
  <a-modal title="修改密码" :visible="props.visible" @cancel="close" :on-before-ok="updatePassword">
    <a-form ref="formRef" :model="form">
      <a-form-item field="origin_password" label="旧密码" :rules="[{required:true,message:'请输入旧密码'}]"
                   :validate-trigger="['blur']">
        <a-input type="password" v-model="form.origin_password" autocomplete="current-password"
                 placeholder="旧密码"></a-input>
      </a-form-item>

      <a-form-item field="password" label="新密码" :rules="[{required:true,message:'请输入新密码'}]"
                   :validate-trigger='["blur"]'>
        <a-input type="password" v-model="form.password" new-password="new-password" placeholder="新密码"></a-input>
      </a-form-item>
      <a-form-item field="re_password" label="重复密码" new-password="new-password" :rules="[{required:true,message:'请输入新密码'},{
          validator: (value, cb) => {
            if (value !== form.password) {
              cb('两次密码输入不一致')
            }
          }
        }]"
                   :validate-trigger='["blur"]'>
        <a-input type="password" v-model="form.re_password" placeholder="请在输入新密码"></a-input>
      </a-form-item>
    </a-form>


  </a-modal>
</template>

<style scoped lang="scss">

</style>
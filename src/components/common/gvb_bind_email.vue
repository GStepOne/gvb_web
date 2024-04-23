<script setup lang="ts">
import {reactive, ref} from "vue";
import {type userBindEmailType, userBindEmailApi} from "@/api/user_api";

import {useStore} from "@/stores";
import {Message} from "@arco-design/web-vue";

interface Props {
  visible: boolean
}

const store = useStore()
const props = defineProps<Props>()
const emits = defineEmits(["update:visible"])

function close() {
  emits("update:visible", false)
  //清空数据和验证
  formRef.value.resetFields(["email","code","password"])
  formRef.value.clearValidate(["email","code","password"])
  form.code = undefined
  step.value = 1

}

const form = reactive<userBindEmailType>({
  code: undefined,
  email: "",
  password: undefined
})

const formRef = ref()

const step = ref<number>(1)

//绑定邮箱
async function bindEmail() {
  let val = await formRef.value.validateField(["code","password"])
  if (val) {
    console.log(val)
    return
  }

  let res = await userBindEmailApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }

  Message.success(res.msg)
}


async function next() {
  console.log("hi,下一步了")
  //局部验证
  let val = await formRef.value.validateField(["email"])
  if (val) {
    console.log(val)
    return
  }

  let res = await userBindEmailApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }

  Message.success(res.msg)
  step.value += 1
}


function preStep(){
  step.value = 1
}
</script>

<template>
  <!-- 用户点击确认按钮之前触发的事件-->
  <a-modal title="绑定邮箱" :visible="props.visible" @cancel="close" body-class="gvb_bind_email_modal_body">
    <!--下一步-->
    <a-steps type="navigation" v-model:current="step">
      <a-step>输入邮箱</a-step>
      <a-step>输入验证码</a-step>
    </a-steps>

    <!--form表单-->
    <a-form ref="formRef" :model="form">
      <a-form-item field="email" label="邮箱"
                   v-if="step===1"
                   :rules="[{required:true,message:'请输入邮箱'},{type:'email',message:'邮箱格式错误'}]"
                   :validate-trigger="['blur']">
        <a-input v-model="form.email" placeholder="邮箱"></a-input>
      </a-form-item>

      <a-form-item v-if="step===2" field="code" label="验证码" :rules="[{required:true,message:'请输入验证码'}]"
                   :validate-trigger='["blur"]'>
        <a-input v-model="form.code" placeholder="验证码"></a-input>
      </a-form-item>

      <a-form-item v-if="step===2" field="password" label="密码" :rules="[{required:true,message:'请输入登录密码'}]"
                   :validate-trigger='["blur"]'>
        <a-input type="password" v-model="form.password" placeholder="密码"></a-input>
      </a-form-item>
    </a-form>

    <template #footer>
      <a-button @click="close">取消</a-button>
      <a-button type="primary" v-if="step===1" @click="next">下一步</a-button>
      <a-button type="primary" v-if="step===2" @click="preStep">上一步</a-button>
      <a-button type="primary" v-if="step===2" @click="bindEmail">绑定邮箱</a-button>
    </template>

  </a-modal>
</template>

<style scoped lang="scss">
.gvb_bind_email_modal_body{
  .arco-form{
    margin-top: 20px;
  }
}
</style>
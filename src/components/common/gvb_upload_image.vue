<script setup lang="ts">
import {ref, watch} from "vue";

import {useStore} from "@/stores";
import {type FileItem, Message} from "@arco-design/web-vue";
import type {baseResponse} from "@/api";
//获取全局的token，赋予headers
const store = useStore();
const headers = {
  token: store.userInfo.token,
}

const props = defineProps({
  modelValue: {
    type: String
  },
  placeholder: {type: String, default: '图片链接'},
})

const emits = defineEmits(["update:modelValue"])
const text = ref("")
//解决一下点击编辑之后，图片链接还保存的问题
watch(() => props.modelValue, () => {
  text.value = props.modelValue as string
  // text.value = <string>props.modelValue //也可以这么写
})

function imageUploadSuccess(file: FileItem) {
  const response = file.response as baseResponse<string>
  if (response.code) {
    Message.error(response.msg)
    return
  }
  Message.success(response.msg)
  text.value = response.data
  console.log("我上传成功了", text.value)
}

//监听text,通知父组件text
watch(text, () => {
  emits("update:modelValue", text.value)
})

</script>

<template>
  <div class="gvb_upload_image">
    <div class="line">
      <!--v-model="text"-->
      <a-input :placeholder="props.placeholder" v-model="text"></a-input>
      <a-upload name="image" @success="imageUploadSuccess" :show-file-list="false" action="/api/image"
                :headers="headers"/>
    </div>
    <!--没有值不显示-->
    <a-image :src="text" v-if="text" height="80px"></a-image>
  </div>

</template>

<style scoped lang="scss">
.gvb_upload_image {
  width: 100%;

  .line {
    display: flex;

    .arco-input-wrapper {
      margin-right: 5px;
    }

    .arco-upload-wrapper {

      width: inherit; //继承父元素高度
    }

    .arco-btn {
      margin-left: 10px;
    }
  }

  .arco-image {
    border-radius: 5px;
    height: 80px;
    object-fit: cover;
    max-width: 100%;
  }
}
</style>
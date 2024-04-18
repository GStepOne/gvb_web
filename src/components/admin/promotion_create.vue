<script setup lang="ts">
import {reactive, ref} from "vue";
import type {baseResponse} from "@/api";
import {Message} from "@arco-design/web-vue";
import {
  promotionCreateApi,
  type promotionCreateType,
  type promotionType,
  promotionUpdateApi,
  defaultPromotionForm
} from "@/api/promotion_api";

import gvb_upload_image from "../common/gvb_upload_image.vue";

const emits = defineEmits(["update:visible", "ok"])
const form = reactive<promotionCreateType>({
  href: "",
  images: "",
  is_show: false,
  title: "",
})
//用来判断 编辑和添加
const editId = ref<number | undefined>(undefined)

const formRef = ref()

interface Props {
  visible: boolean,
  record: promotionCreateType
}

const props = defineProps<Props>()

//点击确定的时候，请求后端
async function okHandler() {
  //参数验证
  let val = await formRef.value.validate()
  if (val) {
    console.log("参数错误了", val)
    return false
  }
  let res: baseResponse<string>
  //id有值就更新，没有就创建
  if (editId.value) {
    console.log("请求的是更新接口", editId.value)
    res = await promotionUpdateApi(editId.value, form)
  } else {
    console.log("请求的是新增接口", editId.value)
    res = await promotionCreateApi(form)
  }

  if (res.code) {
    Message.error(res.msg)
    return false
  }
  //告诉客户成功
  Message.success(res.msg)
  //关闭弹窗
  emits("update:visible", false)
  emits("ok")
  //把空值给form
  Object.assign(form, defaultPromotionForm)

  return true
}

//在open打开之前 赋值给弹窗里的字段
function beforeOpen() {
  Object.assign(form, props.record)
  editId.value = props.record.id
}

</script>

<template>
  <div>
    <!--点击取消的时候 触发事件 update:visible,目的是关掉模态窗，before-open-->
    <a-modal :title="editId?'编辑广告':'创建广告'" :visible="props.visible" @before-open="beforeOpen"
             @cancel="emits('update:visible',false)"
             :on-before-ok="okHandler">
      <!-- :model 属性允许你将一个对象作为表单的数据模型，通过双向绑定的方式将表单控件的值与对象的属性进行关联。
      当表单控件的值发生变化时，对象中对应的属性也会相应地更新，反之亦然。-->
      <a-form ref="formRef" :model="form">
        <!-- 广告名称-->
        <a-form-item field="title" label="广告名称"
                     :rules="[{required:true,message:'广告名称'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.title" placeholder="广告名称"></a-input>
        </a-form-item>
        <!--跳转链接-->
        <a-form-item field="href" label="跳转链接"
                     :rules="[{required:true,message:'请输入跳转链接'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.href" placeholder="广告跳转链接"></a-input>
        </a-form-item>
        <!--图片链接 field 属性用于指定表单项的字段名 当表单被提交时，表单项的值将根据 field 属性的值被映射到表单数据对象中相应的字段-->
        <a-form-item field="images" label="图片链接"
                     :rules="[{required:true,message:'请输入图片链接'}]"
                     :validate-trigger="['blur']"
        >
          <gvb_upload_image v-model="form.images"></gvb_upload_image>
        </a-form-item>
        <!--是否显示-->
        <a-form-item field="is_show" label="是否显示"
                     :rules="[{message:'请选择是否显示'}]"
                     :validate-trigger="['blur']"
        >
          <a-switch v-model="form.is_show" placeholder="是否显示"></a-switch>
        </a-form-item>

      </a-form>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">
.banner_image_div {
  display: flex;
  align-items: center;

  image {
    margin-right: 5px;
    border-radius: 5px;
    padding: 5px 0;
  }
}

</style>
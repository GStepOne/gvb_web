<script setup lang="ts">
import {reactive, ref} from "vue";
import {type menuCreateRequest, type ImageIdSortList, type bannerType, menuUpdateApi} from "@/api/menu_api";
import {menuCreateApi} from "@/api/menu_api";
import {imageIdListApi, imageListApi} from "@/api/image_api";
import type {imageIdType} from "@/api/image_api";
import {Message} from "@arco-design/web-vue";
import type {baseResponse, listDataType} from "@/api";
import {defaultForm} from "@/api/menu_api";

const emits = defineEmits(["update:visible", "ok"])
const form = reactive<menuCreateRequest & { abstractString: string, imageIdList: number[] }>({
  image_sort_list: [],
  path: "",
  title: "",
  slogan: "",
  abstract: [],
  abstract_time: 7,
  banner_time: 7,
  sort: 1,
  abstractString: "",
  imageIdList: [],
  banners: []
})

const imageIdList = ref<any>([])

//获取图片列表
async function getImageList() {
  let res = await imageIdListApi()
  imageIdList.value = res.data
}

//直接调用一下获取数据
getImageList()

//用来判断 编辑和添加
const editId = ref<number | undefined>(undefined)

const formRef = ref()

interface Props {
  visible: boolean,
  record: menuCreateRequest & { banners: bannerType[], id?: number }
}

const props = defineProps<Props>()

async function okHandler() {
  //参数验证
  let val = await formRef.value.validate()
  if (val) {
    console.log("参数错误了", val)
    return false
  }

  form.abstract = form.abstractString.split("\n")

  let imageSortIdList: ImageIdSortList[] = []

  if (form.imageIdList.length > 0) {
    for (let i = 0; i < form.imageIdList.length; i++) {
      const imageId = form.imageIdList[i]
      imageSortIdList.push({
        image_id: imageId,
        sort: form.imageIdList.length - i //排序
      })
    }
  }

  form.image_sort_list = imageSortIdList
  let res: baseResponse<string>
  //id有值就更新，没有就创建

  if (editId.value) {
    console.log("请求的是更新接口", editId.value)
    res = await menuUpdateApi(editId.value, form)
  } else {
    console.log("请求的是新增接口", editId.value)
    res = await menuCreateApi(form)
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
  Object.assign(form, defaultForm)

  return true
}

//在open打开之前 赋值给弹窗里的字段
function beforeOpen() {
  Object.assign(form, props.record)
  form.abstractString = props.record.abstract.join("\n")
  const ImageIdList: number[] = []
  for (const banner of props.record.banners) {
    ImageIdList.push(banner.id)
  }
  form.imageIdList = ImageIdList
  editId.value = props.record.id
}

</script>

<template>
  <div>
    <!--点击取消的时候 触发事件 update:visible,目的是关掉模态窗，before-open-->
    <a-modal :title="editId?'编辑菜单':'创建菜单'" :visible="props.visible" @before-open="beforeOpen"
             @cancel="emits('update:visible',false)"
             :on-before-ok="okHandler">
      <!-- :model 属性允许你将一个对象作为表单的数据模型，通过双向绑定的方式将表单控件的值与对象的属性进行关联。
      当表单控件的值发生变化时，对象中对应的属性也会相应地更新，反之亦然。-->
      <a-form ref="formRef" :model="form">
        <a-form-item field="title" label="菜单标题"
                     :rules="[{required:true,message:'菜单标题'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.title" placeholder="菜单标题"></a-input>
        </a-form-item>
        <!-- 菜单path-->
        <a-form-item field="path" label="菜单路径"
                     :rules="[{required:true,message:'请输入菜单路径'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.path" placeholder="菜单路径"></a-input>
        </a-form-item>
        <!--slogan-->
        <a-form-item field="slogan" label="slogan"
                     :rules="[{message:'请输入slogan'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.slogan" placeholder="slogan"></a-input>
        </a-form-item>
        <!--简介-->
        <a-form-item field="abstract" label="简介"
                     :rules="[{message:'请输入菜单简介'}]"
                     :validate-trigger="['blur']"
        >
          <a-textarea v-model="form.abstractString" placeholder="菜单简介"
                      :autoSize="{maxRows:2,minRows:2}"></a-textarea>
        </a-form-item>
        <!--时间 filed 是针对校验的-->
        <a-form-item label="bannerT">
          <a-input-number v-model="form.banner_time" placeholder="banner切换时间">
          </a-input-number>
          <template #extra>
            <div>banner图的切换时间</div>
          </template>
        </a-form-item>
        <!--简介切换时间-->
        <a-form-item label="abstractT">
          <a-input-number v-model="form.abstract_time" placeholder="简介切换时间">
          </a-input-number>
          <template #extra>
            <div>简介切换时间</div>
          </template>
        </a-form-item>
        <!--序号-->
        <a-form-item label="序号">
          <a-input-number v-model="form.sort" placeholder="序号">
          </a-input-number>
          <template #extra>
            <div>序号大的在前面</div>
          </template>
        </a-form-item>

        <!-- banner图-->
        <a-form-item label="banner图">
          <a-select multiple v-model="form.imageIdList" placeholder="选择banner图" allow-clear>
            <!--            <template #label="{data}">-->
            <!--              <span><img :src="data.label" height="40"></span>-->
            <!--            </template>-->
            <a-option v-for="item in imageIdList" :value="item.id" :key="item.id">
              <div class="banner_image_div">
                <img height="20" :alt="item.name" :src="item.path"/> {{ item.name }}
              </div>
            </a-option>
          </a-select>
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
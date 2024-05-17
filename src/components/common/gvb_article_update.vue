<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {
  articleCreateApi,
  type articleDataType,
  type articleItemType, type articleType,
  articleUpdateApi,
  type articleUpdateType
} from "@/api/article_api";
import {imageIdListApi, type imageIdType} from "@/api/image_api";
import {tagOptionsApi} from "@/api/tag_api";
import {articleCategoryListApi} from "@/api/article_api"
import {Message} from "@arco-design/web-vue";
import type {optionType} from "@/api"
import Gvb_article_item from "@/components/common/gvb_article_item.vue";
import {Random} from "mockjs";
import {dateTimeFormat} from "@/utils/date";

interface Props {
  visible: boolean
  data: articleUpdateType
  title?: string
  type?: "add" | "update"
}

const props = defineProps<Props>()
const {title = "文章更新", type = "update"} = props

const form = reactive<articleDataType& articleUpdateType>({
  id: "",
  collects_count: Random.integer(0, 100),
  digg_count: Random.integer(0, 100),
  comment_count: Random.integer(0, 100),
  look_count: Random.integer(0, 100),
  created_at: dateTimeFormat(new Date().toLocaleString()),
  tags: []
})

const previewData = reactive<articleItemType>({
  abstract: "",
  banner_url: "",
  category: "",
  collects_count: 0,
  comment_count: 0,
  created_at: "",
  digg_count: 0,
  id: "",
  look_count: 0,
  title: "",
})

watch(() => props.data, () => {
  Object.assign(form, props.data)
  console.log(props.type) //type 不对
  previewData.abstract = props.data.abstract as string
  previewData.banner_url = props.data.banner_url as string
  previewData.category = props.data.category as string
  previewData.title = props.data.title as string
  previewData.id = props.data.id as string
  previewData.created_at = props.data.created_at as string
}, {deep: true, immediate: true})

//获取分类的接口
const categoryOptions = ref<optionType[]>([])
const tagOptions = ref<optionType[]>([])

async function getCategory() {
  let res = await articleCategoryListApi()
  categoryOptions.value = res.data
}

getCategory()

async function getTags() {
  let res = await tagOptionsApi()
  tagOptions.value = res.data
}

getTags()
//图片id
const imageIdList = ref<imageIdType[]>([])

//获取图片列表
async function getImageList() {
  let res = await imageIdListApi()
  imageIdList.value = res.data
}

//直接调用一下获取数据
getImageList()
const emits = defineEmits(["update:visible", "ok"])
const formRef = ref()


//文章修改3--修改元数据-点击确定按钮触发
async function updateArticleMeta() {
  console.log("updateArticleMeta,验证参数，关掉弹框、触发父组件ok事件", type);
  let res = await formRef.value.validate();
  // 验证通过，继续执行后续逻辑
  if (res) {
    return
  }
  if (type === "update") {
    //接收来自子组件的form参数
    let res = await articleUpdateApi(form)
    if (res.code) {
      Message.error(res.msg)
      return;
    }
    Message.success(res.msg)
    emits("update:visible", false)//关闭窗口
    //触发父组件的列表更新
    emits("ok", form)
    return
  }

  if (type === "add") {
    // console.log('created_at', form.created_at)
    // form.created_at = form.created_at?.replace(/\//g, '-');
    // let res = await articleCreateApi(form)
    // if (res.code) {
    //   Message.error(res.msg)
    //   return;
    // }
    // Message.success(res.msg)
    emits("update:visible", false)//关闭窗口
    //触发父组件的列表更新
    emits("ok",form)
  }
}

//文章修改4-修改元数据-点击确定按钮触发
function bannerChange(val: any) {
  const image = imageIdList.value.find((item) => item.id as number === val)
  form.banner_url = (image as imageIdType).path as string
}

function randomCover() {
  const image: imageIdType = Random.pick(imageIdList.value)
  form.banner_id = image.id
  form.banner_url = image.path
}

const coverSrc = (data: any): string => {
  let value = data.value;
  if (value) {
    const image = imageIdList.value.find((item) => item.id === value) as imageIdType;
    return image ? image.path : '';
  }
  return '';
}

// const currentTime = ref(new Date().toLocaleString())

console.log(new Date().toLocaleDateString())
console.log(new Date().toLocaleTimeString())

</script>

<template>
  <div class="article_update_gvb">
    <a-modal
        width="30%"
        :title="title"
        :visible="props.visible"
        modal-class="gvb_article_modal_body"
        @cancel="emits('update:visible',false)"
        @ok="updateArticleMeta"
    >
      <a-form ref="formRef" :model="form">
        <!-- 文章标题-->
        <a-form-item field="title" label="文章标题"
                     :rules="[{required:true,message:'文章标题必填'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.title" placeholder="文章标题"></a-input>
        </a-form-item>
        <!--文章简介-->
        <a-form-item field="abstract" label="文章简介"
                     :rules="[{message:'请输入文章简介'}]"
                     :validate-trigger="['blur']"
        >
          <a-textarea v-model="form.abstract" placeholder="文章简介" :auto-size="{minRows:4,maxRows:5}"></a-textarea>
        </a-form-item>

        <!--文章分类-->
        <a-form-item field="category" label="文章分类"

                     :rules="[{required:true,message:'请输入文章分类'}]"
                     :validate-trigger="['blur']"
        >
          <a-select v-model="form.category" allow-create placeholder="文章分类" :options="categoryOptions"></a-select>
        </a-form-item>

        <!--文章标签-->
        <a-form-item field="tags" label="文章标签"
                     :rules="[{message:'请文章标签'}]"
                     :validate-trigger="['blur']"
        >
          <a-select v-model="form.tags" multiple placeholder="文章标签" :options="tagOptions"></a-select>
        </a-form-item>

        <!-- banner图-->
        <a-form-item label="文章封面">
          <a-select v-model="form.banner_id" placeholder="选择封面" allow-clear @change="bannerChange">
            <a-option v-for="item in imageIdList" :value="item.id" :key="item.id">
              <div class="banner_image_div">
                <img height="20" :alt="item.name" :src="item.path"/> {{ item.name }}
              </div>
            </a-option>
            <template #label="{ data }">
              <img style="border-radius: 5px" width="40px" height="40px" :src="coverSrc(data) as string" alt=""/>
              <label style="margin-left: 10px ">{{ data.label }}</label>
            </template>
          </a-select>
          <a-button type="outline" style="margin-left: 10px" @click="randomCover">随机</a-button>
        </a-form-item>

        <!--原文地址-->
        <a-form-item field="link" label="原文地址"
                     :rules="[{message:'原文地址'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.link" placeholder="原文地址"></a-input>
        </a-form-item>
        <!--文章来源-->
        <a-form-item field="source" label="文章来源"
                     :rules="[{message:'文章来源'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="form.source" placeholder="文章来源"></a-input>
        </a-form-item>
        <!--发布时间-->
        <a-form-item field="created_at" label="发布时间"
                     :rules="[{message:'发布时间'}]"
                     :validate-trigger="['blur']"
        >
          <!--这里不要用default value 用model-value好使-->
          <a-date-picker
              show-time
              allow-clear
              showNowBtn
              v-model:modelValue="form.created_at"
          >
          </a-date-picker>
        </a-form-item>
        <a-form-item label="预览"
                     v-if="form.title && form.banner_url && form.category" content-class="preview_body">
          <gvb_article_item :data="form" preview></gvb_article_item>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">
.article_update_gvb {
  .banner_image_div {
    display: flex;
    align-items: center;

    image {
      margin-right: 5px;
      border-radius: 5px;
      padding: 5px 0;
    }

    .preview_body {
      max-width: inherit;
    }

    .gvb_article_modal_body .arco-modal-body {
      overflow-x: hidden;
    }
  }
}
</style>
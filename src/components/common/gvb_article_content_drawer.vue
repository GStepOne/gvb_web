<script setup lang="ts">
// 引入md的编辑器
import {reactive, ref, watch} from "vue";
import {MdEditor} from "md-editor-v3";
import 'md-editor-v3/lib/style.css'
import {Message} from "@arco-design/web-vue";
import {uploadImageApi} from "@/api/image_api"
import type {baseResponse} from "@/api";

import {useStore} from "@/stores";
import Gvb_article_update from "@/components/common/gvb_article_update.vue";
import {
  articleDetailApi,
  articleUpdateApi,
  type articleUpdateType
} from "@/api/article_api";
import {dateTimeFormat} from "@/utils/date";

const store = useStore();

interface Props {
  visible: boolean
  id: string
}

const updateVisible = ref(false)
const props = defineProps<Props>()
const emits = defineEmits(["update:visible", "ok"])

async function onUploadImg(files: Array<File>, callback: (urls: Array<string>) => void): Promise<void> {
  let resList: baseResponse<string>[] = []
  try {
    resList = await Promise.all(files.map(file => uploadImageApi(file)))
  } catch (e) {
    console.error("文章内的图片上传失败", e)
    return
  }
  const urlList: string[] = []
  resList.forEach(res => {
    if (res.code) {
      Message.error(res.msg)
      return
    }
    urlList.push(res.data)
  })

  callback(urlList)
}

const data = reactive<articleUpdateType>({
  content: "",
  id: "",
  abstract: "",
  banner_url: "",
  banner_id: 0,
  category: "",
  link: "",
  source: "",
  tags: [],
  title: "",
  created_at: "",
})

const articleActionType = ref<"add" | "update" | undefined>("add")


//文章修改6-真正的更新文章所有内容
async function updateArticle() {
  //接收来自子组件的form参数
  console.log("updateArticle，form之后的data", data)
  if (data.content === "") {
    Message.warning("文章内容不能为空")
    return
  }
  let res = await articleUpdateApi(data)
  if (res.code) {
    Message.error(res.msg)
    return;
  }
  Message.success(res.msg)
  data.content = "" //清空一下内容
  emits("update:visible", false)//关闭窗口
  //触发父组件的列表更新
  emits("ok")
}

//获取文章详情数据
async function getArticleDetail() {
  let res = await articleDetailApi(props.id as string);
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.content = res.data.content as string
  data.id = res.data.id as string

  Object.assign(data, res.data)
  data.created_at = dateTimeFormat(data.created_at as string)
}

//1 监听id，id变化了就去获取最新的id的文章数据
watch(() => props.id, () => {
  if (props.id) {
    getArticleDetail()
  }
}, {immediate: true,})

//目的是弹出标题等信息的框，并不修改真实的信息
async function alertArticleTitle() {
  updateVisible.value = true
  articleActionType.value = "update"
  console.log("alertArticleTitle", articleActionType.value)
}

//文章修改5-接收到文章元数据修改完成的-子组件的ok事件
function updateArticleMetaOk(form?:Object) {
  console.log("文章元数据修改完成的ok事件，关闭元数据窗口",form)
  updateVisible.value = false;
  //只是关闭窗口此时并未发生数据的变化,form是子组件传递过来的修改后的数据，赋值给data
  Object.assign(data, form)
}

function cancel() {
  console.log("客户点了取消,并不需要更新")
  emits('update:visible', false)
}
</script>

<template>
  <div class="gvb_article_drawer">
    <gvb_article_update v-model:visible="updateVisible"
                        :data="data"
                        title="文章元信息"
                        type="update"
                        @ok="updateArticleMetaOk"
    ></gvb_article_update>

    <a-drawer class="gvb_article_drawer_inner" width="85%" :visible="props.visible"
              @cancel="emits('update:visible',false)" unmountOnClose
              @close="cancel"
              title="编辑文章">
      <div>
        <MdEditor v-model="data.content" :on-upload-img="onUploadImg" :theme="store.themeString"/>
      </div>

      <template #footer>
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" status="success" @click="alertArticleTitle">修改元数据</a-button>
        <a-button type="primary" @click="updateArticle">更新</a-button>
      </template>
    </a-drawer>
  </div>
</template>

<style scoped lang="scss">
.gvb_article_drawer_inner {
  .md-editor {
    height: calc(100vh - 137px);
  }
}
</style>
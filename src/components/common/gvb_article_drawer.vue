<script setup lang="ts">
// 引入md的编辑器
import {reactive, ref} from "vue";
import {MdEditor} from "md-editor-v3";
import 'md-editor-v3/lib/style.css'
import {Message} from "@arco-design/web-vue";
import {uploadImageApi} from "@/api/image_api"
import type {baseResponse} from "@/api";

const text = ref("# 写篇文章吧，Sama")
import {useStore} from "@/stores";
import Gvb_article_upadte from "@/components/common/gvb_article_update.vue";
import {articleCreateApi, type articleUpdateType} from "@/api/article_api";
import {dateTimeFormat} from "@/utils/date";

const store = useStore();

interface Props {
  visible: boolean
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

const data = reactive<articleUpdateType>({})

//ok 事件
function okHandler(record: articleUpdateType) {
  Object.assign(data, record) //从新赋值给data
}

function publish() {

}

async function createArticle() {
  if (data.title === "") {
    Message.warning("文章标题不能为空")
    return
  }

  if (data.content === "") {
    Message.warning("文章内容不能为空")
    return
  }

  data.created_at = dateTimeFormat(data.created_at as string)
  let res = await articleCreateApi(data)
  if (res.code) {
    Message.error(res.msg)
    return;
  }
  Message.success(res.msg)

  emits("update:visible", false)
  //除了分类和标签都删除，一个小时内  写到store里面

  data.title = ""
  data.content = ""
  data.abstract = ""
  data.link = ""
  data.source = ""
  data.banner_id = undefined
  data.banner_url = ""
  data.created_at = dateTimeFormat(new Date().toDateString())

  const saveStore: articleSaveStoreType = {
    category: data.category,
    tags: data.tags,
    created_at: new Date().toDateString()
  }
  sessionStorage.setItem("saveStore", JSON.stringify(saveStore))
  emits("ok")
}

function getData() {
  let item = sessionStorage.getItem("saveStore")
  if (item === null) {
    return
  }
  try {
    const obj: articleSaveStoreType = JSON.parse(item)
    data.category = obj.category
    data.tags = obj.tags

  } catch (e) {
    console.error(e)
  }
}

getData()

interface articleSaveStoreType {
  category?: string
  tags?: string[]
  created_at?: string
}

</script>

<template>
  <div class="gvb_article_drawer">
    <gvb_article_upadte v-model:visible="updateVisible"
                        :data="data"
                        title="文章信息"
                        type="add"
                        @ok="okHandler"
    ></gvb_article_upadte>

    <a-drawer class="gvb_article_drawer_inner" width="85%" :visible="props.visible"
              @ok="publish"
              @cancel="emits('update:visible',false)" unmountOnClose
              title="发布文章">
      <div>
        <MdEditor v-model="data.content" :on-upload-img="onUploadImg" :theme="store.themeString"/>
      </div>

      <template #footer>
        <a-button @click="emits('update:visible',false)">取消</a-button>
        <a-button type="primary" status="success" @click="updateVisible=true">完善信息</a-button>
        <a-button type="primary" @click="createArticle">发布</a-button>
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
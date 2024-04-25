<script setup lang="ts">
import {reactive, watch} from "vue";
import {useStore} from "@/stores";
import {Message} from "@arco-design/web-vue";
import {
  type commentAddType,
  commentCreateApi,
  commentListApi,
  type commentType
} from "@/api/comment_api";
import type {listDataType, paramsType} from "@/api";
import Gvb_comment_list from "@/components/common/gvb_comment_list.vue";

interface Props {
  articleId: string
}

const props = defineProps<Props>()
const data = reactive<listDataType<commentType>>({
  list: [],
  count: 0
})

const addCommentForm = reactive<commentAddType>({
  article_id: "",
  content: "",
  parent_comment_id: undefined
})

watch(() => props.articleId, () => {
  console.log("传递过来文章id，开始请求文章评论", props.articleId)
  if (props.articleId) {
    //每次点击到文章列表中一篇文章之后，就把文章id 赋值
    addCommentForm.article_id = props.articleId;
    getData()
  }
}, {immediate: true})



const params = reactive<paramsType>()

async function getData() {
  console.log("获取列表")
  let res = await commentListApi(props.articleId)
  data.list = res.data.list
  data.count = res.data.count
}

function handleListEvent() {
  getData();
}

const store = useStore()

//发表评论

async function createComment() {
  if (!store.isLogin) {
    Message.warning("请先登录");
    return
  }

  if (addCommentForm.content.trim().length === 0) {
    Message.warning("总得说点什么嘛");
    return
  }

  if (addCommentForm.article_id === "") {
    Message.warning("请选择一篇文章");
    return
  }

  let res = await commentCreateApi(addCommentForm)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  //清空之前的
  addCommentForm.content = ""

  getData()
}

</script>

<template>
  <div class="gvb_comment_components">
    <div class="add_comment">
      <a-textarea placeholder="请输入高见"
                  @keydown.enter.ctrl="createComment"
                  v-model="addCommentForm.content"
                  :auto-size="{minRows:6, maxRows:6}"
      ></a-textarea>
      <a-button @click="createComment" type="primary">发布评论</a-button>
    </div>

    <!--list事件是从子组件传递的事件-->
    <gvb_comment_list :data="data.list" @list="handleListEvent"></gvb_comment_list>
  </div>

</template>

<style lang="scss">
.gvb_comment_components {
  border-radius: 5px;
  background-color: var(--color-bg-1);
  padding: 20px;
  max-height: 300px;

  .add_comment {
    width: 100%;
    position: relative;

    button {
      position: absolute;
      right: 10px;
      bottom: 15px;
    }

    textarea {
      width: 100%;
      resize: none; // 禁止textarea的大小可调节
    }

    button {
      margin-top: 10px; // 调整按钮与输入框的间距
      align-self: flex-end; // 按钮靠右对齐
    }
  }
}

</style>
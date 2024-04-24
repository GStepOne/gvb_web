<script setup lang="ts">
import {reactive, watch} from "vue";
import {
  type commentAddType,
  commentCreateApi,
  commentDeleteApi,
  commentListApi,
  type commentType
} from "@/api/comment_api";
import type {listDataType, paramsType} from "@/api";
import {dateFormat, relativeCurrentTime} from "@/utils/date";
import {IconDelete, IconMessage} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";

interface Props {
  articleId: string
}

const props = defineProps<Props>()

const data = reactive<listDataType<commentType>>({
  list: [],
  count: 0
})

watch(() => props.articleId, () => {
  console.log("传递过来没有", props.articleId)
  if (props.articleId) {
    //请求
    getData()
  }
})

const params = reactive<paramsType>()

async function getData() {
  let res = await commentListApi(props.articleId)
  data.list = res.data.list
  data.count = res.data.count
}

async function deleteComment(record: commentType) {
  let res = await commentDeleteApi(record.id)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  //目的是刷新列表
  getData()
}

const addCommentForm = reactive<commentAddType>({
  article_id: "",
  content: "",
  parent_comment_id: undefined
})


import {useStore} from "@/stores";

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

  let res = await commentCreateApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  //清空之前的
  addCommentForm.content = ""

  getData()
}


function applyShow(record: commentType) {
  record.isApply = true
}


async function applyComment(record: commentType) {
  //组装数据
  if (!store.isLogin) {
    Message.warning("请先登录");
    return
  }

  if (record.applyContent.trim().length === 0) {
    Message.warning("回复内容不能为空");
    return
  }

  const data: commentAddType = {
    article_id: record.article_id,
    content: record.applyContent,
    parent_comment_id: record.id,
  }

  let res = await commentCreateApi(data)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  //清空之前的
  record.applyContent = ""

  getData()
}


</script>

<template>
  <div class="gvb_comment_list_components">
    <div class="add_comment">
      <a-textarea placeholder="请输入高见"
                  @keydown.enter.ctrl="createComment"
                  v-model="addCommentForm.content"
                  :auto-size="{minRows:6, maxRows:6}"
      ></a-textarea>
      <a-button @click="createComment" type="primary">发布评论</a-button>
    </div>

    <a-comment
        v-for="item in data.list"
        :content="item.content"
        :author="item.user.nick_name"
        :avatar="item.user.avatar"
        :datetime="relativeCurrentTime(item.created_at)"
    >
      <!--父评论回复-->
      <template #actions>
        <span class="action" @click="applyShow(item)"><IconMessage/>回复</span>
        <a-popconfirm content="是否删除这条评论?" @ok="deleteComment(item)">
          <span class="action"><IconDelete/>删除</span>
        </a-popconfirm>
      </template>
      <a-comment
          :avatar="store.userInfo.avatar"
          :author="store.userInfo.nick_name"
          v-if="item.isApply"
      >
        <template #content>
          <div class="apply_comment">
            <a-input @keydown.enter.ctrl="applyComment(item)"
                     :content="'回复'+item.user.nick_name"
                     v-model="item.applyContent"
                     @click="applyShow(sub)"></a-input>
            <a-button type="primary" style="margin-left: 10px" @click="applyComment(item)">回复</a-button>
          </div>
        </template>
      </a-comment>
      <!--子评论回复-->
      <a-comment
          v-for="sub in item.sub_comments"
          :content="sub.content"
          :author="sub.user.nick_name"
          :avatar="sub.user.avatar"
          :datetime="relativeCurrentTime(sub.created_at)"
      >
        <!--子评论回复-->
        <template #actions>
          <span class="action" @click="applyShow(sub)"><IconMessage/>回复</span>
          <a-popconfirm content="是否删除这条评论?" @ok="deleteComment(sub)">
            <span class="action"><IconDelete/>删除</span>
          </a-popconfirm>
        </template>
        <a-comment
            :avatar="store.userInfo.avatar"
            :author="store.userInfo.nick_name"
            v-if="sub.isApply"
        >
          <template #content>
            <div class="apply_comment">
              <a-input @keydown.enter.ctrl="applyComment(sub)"
                       :content="'回复'+sub.user.nick_name"
                       v-model="sub.applyContent"
                       @click="applyShow(sub)"></a-input>
              <a-button type="primary" style="margin-left: 10px" @click="applyComment(sub)">回复</a-button>
            </div>
          </template>
        </a-comment>
      </a-comment>
    </a-comment>
  </div>

</template>

<style scoped lang="scss">
.gvb_comment_list_components {
  border-radius: 5px;
  //width: 100%;
  background-color: var(--color-bg-1);
  padding: 20px;

  > span {
    margin-left: 10px;
  }

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

  .action {
    cursor: pointer;
  }

  .apply_comment {
    display: flex;
  }

  .arco-comment-inner-comment {
    margin-top: 8px;
  }
}

</style>
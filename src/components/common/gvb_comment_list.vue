<script setup lang="ts">

import {relativeCurrentTime} from "@/utils/date";
import {IconDelete, IconMessage} from "@arco-design/web-vue/es/icon";
import {commentCreateApi, commentDeleteApi, commentListApi, type commentType} from "@/api/comment_api";
import Gvb_comment_list from "@/components/common/gvb_comment_list.vue";
import {Message} from "@arco-design/web-vue";
import {reactive} from "vue";
import type {paramsType} from "@/api";
import {useStore} from "@/stores";

const store = useStore()
interface Props {
  data: commentType[]
}

const props = defineProps<Props>()

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

const params = reactive<paramsType>()

async function getData() {
  let res = await commentListApi(props.articleId)
  data.list = res.data.list
  data.count = res.data.count
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
  <gvb_comment_list data=""></gvb_comment_list>
  <div class="gvb_comment_list">
    <a-comment
        v-for="item in data.list"
        :content="item.content"
        :author="item.user.nick_name"
        :avatar="item.user.avatar"
        :datetime="relativeCurrentTime(item.created_at)"
    >
      <gvb_comment_list :data="item.sub_comment"></gvb_comment_list>
    </a-comment>
  </div>
</template>

<style scoped lang="scss">

</style>
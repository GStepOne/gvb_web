<script setup lang="ts">

import {relativeCurrentTime} from "@/utils/date";
import {IconDelete, IconMessage, IconThumbUp} from "@arco-design/web-vue/es/icon";
import {
  type commentAddType,
  commentCreateApi,
  commentDeleteApi, commentDiggApi,
  type commentType
} from "@/api/comment_api";
import gvb_comment_list from "@/components/common/gvb_comment_list.vue";
import {Message} from "@arco-design/web-vue";
import {nextTick, reactive, ref} from "vue";
import type {paramsType} from "@/api";
import {useStore} from "@/stores";
import {showMessageRecord} from "@/components/common/gvb_message_record";

interface Props {
  data: commentType[]
}

const props = defineProps<Props>()
const params = reactive<paramsType>({})

const store = useStore();

const saveId = ref<number>(0)

function applyShow(record: commentType) {
  if (!record) {
    return
  }
  record.isApply = !record.isApply
  if (!record.isApply) {
    // saveId.value = 0
    return
  }
  nextTick(() => {
    let dom = document.querySelector(`.comment_apply_ipt_${record.id?.toString()} input`) as HTMLInputElement
    dom.focus()
  })
}

async function applyComment(record: commentType) {
  //组装数据
  if (!store.isLogin) {
    Message.warning("请先登录");
    return
  }

  if (record.applyContent?.trim().length === 0) {
    Message.warning("回复内容不能为空");
    return
  }

  const data: commentAddType = {
    article_id: record.article_id,
    content: record.applyContent as string,
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
  //刷新之后 仍旧保留回复的输入框
  saveId.value = record.id as number

  getListAgain()
}

async function deleteComment(record: commentType) {
  let res = await commentDeleteApi(record.id as number)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  //目的是刷新列表
  getListAgain()
}

const emits = defineEmits(["list"])

function getListAgain() {
  //让父组件去刷新
  emits("list")
}

//评论点赞
async function commentDigg(record: commentType) {
  let res = await commentDiggApi(record.id as number)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  record.digg_count = record.digg_count as number +1
}

function avatarClick(item: commentType) {
  if (store.userInfo.userId === item.user_id) {
    console.log('不能与自己聊天')
    return
  }
  showMessageRecord(item.user_id as number, item.user?.nick_name as string)
}

</script>

<template>
  <div class="gvb_comment_list">
    <a-comment
        v-for="item in data"
        :content="item.content"
        :author="item.user?.nick_name"
        :datetime="relativeCurrentTime(item.created_at as string)"
    >
      <!--回复信息-->
      <template #actions>
        <span class="action" @click="commentDigg(item)"><IconThumbUp/>点赞({{ item.digg_count }})</span>
        <span class="action" @click="applyShow(item)"><IconMessage/>回复</span>
        <a-popconfirm
            v-if="store.isAdmin || store.userInfo.userId === item.user_id"
            content="是否删除这条评论?"
            @ok="deleteComment(item)">
          <span class="action"><IconDelete/>删除</span>
        </a-popconfirm>
      </template>
      <template #avatar>
        <a-avatar @click="avatarClick(item)">
          <img :src="item.user?.avatar" alt="">
        </a-avatar>
      </template>

      <a-comment
          :avatar="store.userInfo.avatar"
          :author="store.userInfo.nick_name"
          v-if="item.isApply || saveId === item.id"
      >
        <template #content>
          <div class="apply_comment">
            <a-input :class="'comment_apply_ipt_'+item.id" @keydown.enter.ctrl="applyComment(item)"
                     :placeholder="'回复'+item.user?.nick_name"
                     v-model="item.applyContent"
                     @click="applyShow(item)"></a-input>
            <a-button type="primary" style="margin-left: 10px" @click="applyComment(item)">回复</a-button>
          </div>
        </template>
      </a-comment>
      <!--递归自己的组件-->
      <gvb_comment_list :data="item.sub_comments as commentType[]" @list="emits('list')"></gvb_comment_list>
    </a-comment>
  </div>
</template>

<style lang="scss">
.gvb_comment_list {
  height: 100%;
  overflow-x: auto;
  margin-top: 10px;

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
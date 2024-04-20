<script setup lang="ts">
import {reactive, ref} from "vue";
import type {messageRecordType, messageType, messageParams} from "@/api/message_api";
import gvb_message_list from "@/components/common/gvb_message_list.vue"
import {messageUserListApi, messageUserListByUserApi, messageUserRecordApi} from "@/api/message_api";
import type {listDataType} from "@/api";
import {Message} from "@arco-design/web-vue";

const messageData = reactive<listDataType<messageType>>({
  list: [],
  count: 0,
})

const messageUserData = reactive<listDataType<messageRecordType>>({
  list: [],
  count: 0,
})

//发送人和接受人
const sendUserId = ref(0)
const revUserId = ref(0)

const params = reactive<messageParams>({
  page: 1,
  limit: 10,
  nickname: undefined
})

//最左侧的数据
async function getMessageData() {
  let res = await messageUserListApi(params)
  messageData.list = res.data.list
  messageData.count = res.data.count
}

//1 加载即获取最左侧数据
getMessageData()


//2 点击最左侧调这里
async function messageCheck(data: messageType) {
  //把之前的数据清空掉
  messageRecordData.list = messageUserData.list = []
  messageRecordData.count = messageUserData.count = 0

  let userId = data.user_id
  let res = await messageUserListByUserApi(userId)
  //当前发信人记录一下
  sendUserId.value = userId
  messageUserData.list = res.data.list
  messageUserData.count = res.data.count
}

//2点获取消息记录
async function messageRecord(data: messageType) {
  //当前的收信人
  revUserId.value = data.user_id
  console.log("发信人" + sendUserId.value, "收信人" + revUserId.value)
  let res = await messageUserRecordApi(sendUserId.value, revUserId.value)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  //判断谁是is_me
  const list = []
  res.data.list.forEach(((item) => {
    item.is_me = (item.send_user_id == sendUserId.value)
    list.push(item)
  }))

  messageRecordData.list = res.data.list
  messageRecordData.count = res.data.count
}


const messageRecordData = reactive<listDataType<messageRecordType & { is_me: boolean }>>({
  list: [],
  count: 0,
})

</script>

<template>
  <div class="message_list_view">
    <div class="user_list_menu">
      <div class="head">
        <a-input-search placeholder="搜索用户名"
                        v-model="params.nickname"
                        @search="getMessageData"
                        @keydown.enter="getMessageData"></a-input-search>
      </div>
      <gvb_message_list @check="messageCheck" :data="messageData.list"></gvb_message_list>
      <div class="page">
        <a-pagination simple :total="messageData.count" v-model:current="params.page"
                      :page-size="params.limit" @change="getMessageData"></a-pagination>
      </div>
    </div>
    <!--点击上面的请求下面的-->
    <div class="user_menu" v-if="messageUserData.list.length">
      <gvb_message_list @check="messageRecord" :data="messageUserData.list"></gvb_message_list>
    </div>
    <!--  最右边部分-->
    <div class="user_record_menu" v-if="messageRecordData.list.length">
      <div :class="{message:true,is_me:item.is_me}" v-for="item in messageRecordData.list">
        <img class="avatar" :src="item.send_user_avatar" alt="发送人头像"/>
        <div class="message-main">
          <div class="message-user">{{ item.send_user_nick_name }}</div>
          <div class="message-content">
            <div class="content">
              <div class="txt-message">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.message_list_view {
  display: flex;

  > div {
    background-color: var(--color-bg-1); //背景色
    height: calc(100vh - 130px);
    border-radius: 5px;
    color: var(--color-text-2);
    overflow-y: auto;
    overflow-x: hidden;
  }

  .user_list_menu {
    width: 240px;
    padding: 20px;

    .head {
      margin-bottom: 10px;
    }

    .page {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      bottom: 0;
      position: relative;
    }
  }

  .user_menu {
    width: 240px;
    margin-left: 10px;
    padding: 20px;
  }

  .user_record_menu {
    margin-left: 10px;
    padding: 20px;
    width: calc(100% - 620px); //要多减掉margin-left的值
    flex-grow: 1;

    .message {
      display: flex;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .message-main {
        margin-left: 10px;

        .message-content {
          margin-top: 5px;

          .content {
            margin-left: 5px;
            display: flex;
          }
        }

        .txt-message {
          background-color: rgb(var(--success-4), 0.65);
          border-radius: 5px;
          padding: 10px;
          position: relative;
          width: fit-content;
          white-space: break-spaces;
          word-break: break-all;

          &:before {
            content: "";
            display: block;
            position: absolute;
            left: -20px;
            top: 35%;
            border-width: 5px 10px;
            border-style: solid;
            border-color: transparent rgb(var(--success-4), 0.65) transparent transparent;
          }
        }
      }

      &.is_me {
        justify-content: right;
        flex-direction: row-reverse;

        .message-main {
          margin-left: 0;
          margin-right: 10px;

          .message-user {
            text-align: right;
          }

          .txt-message {
            &:before {
              content: "";
              display: block;
              position: absolute;
              right: -20px;
              left: inherit;
              top: 40%;
              border-width: 5px 10px;
              border-style: solid;
              border-color: transparent transparent transparent rgb(var(--success-4), 0.65);
            }
          }
        }
      }
    }
  }
}

.gvb_admin main .gvb_container {
  padding: 10px;
}

</style>
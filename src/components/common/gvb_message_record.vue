<script setup lang="ts">
import {nextTick, reactive, ref, watch} from "vue";
import {
  type messageRecordType,
  type messageType,
  messageUserListByMeApi,
  type messagePublishType
} from "@/api/message_api";
import {messagePublishApi, messageUserRecordApi} from "@/api/message_api";
import type {listDataType} from "@/api";
import {Message} from "@arco-design/web-vue";
import {useStore} from "@/stores";

const messageData = reactive<listDataType<messageType>>({
  list: [],
  count: 0,
})

interface Props {
  rev_user_id: number,
  send_user_id: number,
  nickname: string
}

const props = defineProps<Props>()

const messagePublishData = reactive<messagePublishType>({
  content: "",
  send_user_id: props.send_user_id,
  rev_user_id: props.rev_user_id
})
//接受人
const store = useStore()

//最左侧的数据
async function getMessageData() {
  //获取当前登录者id
  let res = await messageUserListByMeApi(store.userInfo.userId)
  messageData.list = res.data.list
  messageData.count = res.data.count
}

//1 加载即获取最左侧数据
getMessageData()

async function getRecordData(revUserId: number) {
  let res = await messageUserRecordApi(store.userInfo.userId, revUserId)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  //判断谁是is_me
  const list = []
  res.data.list.forEach(((item) => {
    item.is_me = (item.send_user_id == store.userInfo.userId)
    list.push(item)
  }))

  messageRecordData.list = res.data.list
  messageRecordData.count = res.data.count
}


const messageRecordData = reactive<listDataType<messageRecordType & { is_me?: boolean }>>({
  list: [],
  count: 0,
})

async function messagePublish() {

  if (messagePublishData.content === "") {
    Message.warning("消息不能为空")
    return
  }

  let res = await messagePublishApi(messagePublishData)
  if (res.code) {
    Message.error(res.msg)
    return
  }

  getRecordData(messagePublishData.rev_user_id)
  //让滚动条自己往下滚动
  nextTick(() => {
    setTimeout(() => {
      let dom = document.querySelector(".record_list")
      dom.scrollTo(
          {
            top: dom.scrollHeight,
            behavior: "smooth"
          }, 500) //平滑滚动
    })
  })
}

watch(() => props.rev_user_id, () => {
  if (props.rev_user_id !== 0) {
    messagePublishData.rev_user_id = props.rev_user_id
    messagePublishData.send_user_id = props.send_user_id
    getRecordData(props.rev_user_id)
  }
})

</script>

<template>
  <div class="gvb_message_record_component">
    <div class="head">与{{ props.nickname ? props.nickname : '网友'}}的聊天</div>
    <div class="record_list">
      <div :class="{message:true,is_me:item.is_me}" v-for="item in messageRecordData.list">
        <img class="avatar" :src="item.send_user_avatar" alt="发送人头像"/>
        <div class="message-main">
          <div class="message-user">{{ item.send_user_nickname }}</div>
          <div class="message-content">
            <div class="content">
              <div class="txt-message">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="message_record">
      <a-textarea placeholder="请输入聊天内容" @keydown.enter.ctrl="messagePublish"
                  v-model="messagePublishData.content" auto-size
                  style="height:100%"></a-textarea>
      <a-button type="primary" @click="messagePublish">回复</a-button>
    </div>
  </div>
</template>

<style lang="scss">

.gvb_message_record_component {
  width: 100%;
  flex-grow: 1;
  height: calc(100vh - 90px);

  .head {
    height: 60px;
    border-bottom: 1px solid var(--bg);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
  }

  .record_list {
    padding: 20px;
    height: calc(100vh - 300px);
    overflow-y: auto;

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

  .message_record {
    border-top: 1px solid var(--bg);
    padding: 10px 20px;
    position: relative;
    height: 140px;

    button {
      position: absolute;
      right: 30px;
      bottom: 20px;
    }
  }
}

//
//.gvb_admin main .gvb_container {
//  padding: 10px;
//}

</style>
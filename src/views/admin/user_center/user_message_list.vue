<script setup lang="ts">
import Gvb_message_record from "@/components/common/gvb_message_record.vue";
import {reactive, ref} from "vue";
import {type messagePublishType, type messageType, messageUserListByMeApi} from "@/api/message_api";
import {useStore} from "@/stores";
import type {listDataType} from "@/api";
import Gvb_message_list from "@/components/common/gvb_message_list.vue";

const store = useStore()
//最左侧的数据
const messageData = reactive<listDataType<messageType>>({
  list: [],
  count: 0,
})

async function getMessageData() {
  let res = await messageUserListByMeApi(store.userInfo.userId)
  messageData.list = res.data.list
  messageData.count = res.data.count
}

getMessageData()

const revUserId = ref<number>(0)
const revNickname = ref<string>("")
const userId = ref<number>(0)
const sendUserId = ref<number>(0)

//2 获取当前登陆者消息记录
async function messageUserCheck(data: messageType) {
  //当前的收信人
  revUserId.value = data.user_id
  revNickname.value = data.nickname

  userId.value = data.user_id
  sendUserId.value = store.userInfo.userId
}
</script>

<template>
  <div class="user_message_list_view">
    <div class="user_menu">
      <gvb_message_list @check="messageUserCheck" :data="messageData.list"></gvb_message_list>
    </div>
    <div class="user_record_menu">
      <gvb_message_record :rev_user_id="revUserId" :userId="userId" :nickname="revNickname" :send_user_id="sendUserId"></gvb_message_record>
    </div>
  </div>

</template>
<style lang="scss">
.user_message_list_view {
  display: flex;

  > div {
    background-color: var(--color-bg-1); //背景色
    height: calc(100vh - 130px);
    border-radius: 5px;
    color: var(--color-text-2);
    overflow-y: auto;
    overflow-x: hidden;
  }

  .user_menu {
    width: 240px;
    margin-left: 10px;
    padding: 20px;
  }

  .user_record_menu {
    margin-left: 10px;
    width: calc(100% - 300px); //要多减掉margin-left的值
    flex-grow: 1;
    height: calc(100vh - 90px);

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
}

</style>

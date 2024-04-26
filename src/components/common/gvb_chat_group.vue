<script setup lang="ts">
import {Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import type {listDataType, paramsType} from "@/api";
import {type chatMessageType, chatRecordApi, chatRemoveApi, type chatType} from "@/api/chat_api";
import {useStore} from "@/stores";
import {settingsInfoApi} from "@/api/settings_api";
import type {chatGroupConfigType} from "@/api/chat_api";
import {IconImage, IconFile, IconRefresh} from "@arco-design/web-vue/es/icon";
import {dateTimeFormat} from "../../utils/date";
import 'md-editor-v3/lib/style.css'
import {MdEditor, MdPreview} from "md-editor-v3";

import {onUploadImg} from "@/api/image_api";

const chatRecordData = reactive<listDataType<chatType>>({
  list: [],
  count: 0,
})

const store = useStore();

interface Props {
  config: chatGroupConfigType
}

// 接收父组件传递的 config 数据作为 props
const props = defineProps<Props>()

const params = reactive<paramsType>({
  page: 1,
  limit: 200//props.config.default_limit ? props.config.default_limit : 100,
})

async function getGroupData() {
  let res = await chatRecordApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  // 判断谁是is_me
  const list = []
  res.data.list.forEach(((item) => {
    item.is_me = (item.nick_name == chatData.nick_name)
    list.push(item)
  }))
  loading.value = false
  chatRecordData.list = res.data.list
  // chatRecordData.list.reverse()
  chatRecordData.count = res.data.count
}

const emits = defineEmits(["getConfig"])

async function flush() {
  await emits("getConfig")
  await getGroupData()
  Message.success("刷新成功")
}

getGroupData()


const isManage = ref<boolean>(false)
const selectIdList = ref<string[]>([])

async function removeChatGroup() {
  let res = await chatRemoveApi(selectIdList.value)
  if (res.code) {
    Message.error(res.msg)
    return
  }

  Message.success(res.msg)
  selectIdList.value = []
  getGroupData()
}


const loading = ref<boolean>(true)
// websocket
let socket = ref<WebSocket>()
let index = 0

const chatData = reactive({
  nick_name: "",
  onlineCount: 0
})

function websocketConnect() {
  console.log(`ws://${location.host}/ws/api/chat_group`)
  socket.value = new WebSocket(`ws://${location.host}/ws/api/chat_group`)
  //socket
  socket.value.onmessage = function (event) {
    let _data = event.data
    let jsonData = JSON.parse(_data) as chatMessageType

    console.log('onmessage', jsonData)
    if (index === 0) {
      //第一条消息
      chatData.nick_name = jsonData.nick_name
      chatData.onlineCount = jsonData.online_count
      index++
      return
    }
    chatData.onlineCount = jsonData.online_count
    chatRecordData.list.push({
      avatar: jsonData.avatar,
      content: jsonData.content,
      created_at: jsonData.created_at,
      msg_type: jsonData.msg_type,
      nick_name: jsonData.nick_name,
      is_me: chatData.nick_name === jsonData.nick_name,
    })
    //重新获取一下消息
    index++
    setTimeout(() => {
      let dom = document.querySelector(".record_list") as HTMLDivElement
      dom.scrollTo({
        top: dom.scrollHeight,
        behavior: "smooth"
      }) //平滑滚动
    }, 100) // 增加一点延迟时间以确保 DOM 已更新

    getGroupData()
  }
  //链接成功
  socket.value.onopen = function (event) {
    console.log('进入聊天室成功', event)
    Message.success("进入聊天室成功!");
  }
  //关闭
  socket.value.onerror = function (event) {
    console.log("onerror:", event.ws)
    Message.error("进入聊天室失败!");

    chatRecordData.list.push({
      avatar: jsonData.avatar,
      content: jsonData.content,
      created_at: jsonData.created_at,
      msg_type: jsonData.msg_type,
      nick_name: jsonData.nick_name,
      is_me: chat.nick_name === jsonData.nick_name,
    })
    console.log(jsonData)
  }

  //错误
  socket.value.onclose = function (event) {
    console.log("onClose", event)
    Message.error("链接已经断开了!");
    socket.value = null
  }
}

const content = ref("")

//给socket发送数据
function sendData() {
  socket.value?.send(JSON.stringify(
      {
        content: content.value,
        message_type: 2
      }
  ))
//清空一下
  content.value = ""
}


function SendImageEvent() {

}

function SendFileEvent() {
  Message.warning("文件上传开发中")
}

</script>

<template>
  <div class="gvb_chat_group_components">
    <a-spin :loading="loading">
      <div class="head">
        <div class="title">
          {{ props.config.welcome_title }}
        </div>
        <div class="outline" v-if="props.config.is_online_people">在线人数: {{
            props.config.is_online_people ? chatData.onlineCount : '∞'
          }}
        </div>
        <div class="manage">
          <IconRefresh style="cursor: pointer" @click="flush"></IconRefresh>
          <a-checkbox v-model="isManage">管理模式</a-checkbox>
          <a-button @click="removeChatGroup" v-if="isManage && selectIdList.length" style="margin-left: 10px;"
                    size="small" type="primary" status="danger">删除
          </a-button>
        </div>
      </div>
      <div class="record_list">
        <a-checkbox-group v-model="selectIdList">
          <template v-for="item in chatRecordData.list">
            <div :class="{msg:true,isManage:isManage}">
              <a-checkbox :value="item.model.id" v-if="isManage"></a-checkbox>
              <!-- 这个是时间-->
              <div class="date" v-if="props.config.is_show_time">
                {{ dateTimeFormat(item.created_at) }}
              </div>

              <div v-if="item.message_type === 2" :class="{message:true,is_me:item.is_me}">
                <img class="avatar" :src="'/'+item.avatar" alt="发送人头像"/>
                <div class="message-main">
                  <div class="message-user">{{ item.nick_name }}</div>
                  <div class="message-content">
                    <div class="content">
                      <div :class="{'txt-message':true,is_markdown:props.config.is_markdown}">
                        <template v-if="!config.is_markdown">
                          {{ item.content }}
                        </template>

                        <template v-else>
                          <MdPreview v-model="item.content" :editorId="'md__'+item.id">
                          </MdPreview>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="item.message_type === 1 || item.message_type === 7 "
                   :class="'system '+'system_' +item.message_type">
                <div class="txt-message">{{ item.content }}</div>
              </div>

            </div>
          </template>
        </a-checkbox-group>
      </div>
      <div class="footer">
        <div class="menu">
          <div class="icon" v-if="props.config.is_send_image" @click="SendImageEvent">
            <IconImage></IconImage>
          </div>
          <div class="icon" v-if="props.config.is_send_file" @click="SendFileEvent">
            <IconFile></IconFile>
          </div>
        </div>
        <div class="inRoom" v-if="!socket">
          <a-button type="primary" @click="websocketConnect">进入聊天室</a-button>
        </div>

        <a-textarea v-if="!props.config.is_markdown"
                    show-word-limit :max-length=100
                    @keydown.enter.ctrl="sendData"
                    v-model="content" auto-size
                    placeholder="聊天内容"
                    style="height: 80%">
        </a-textarea>

        <MdEditor :max-length="props.config.content_length?props.config.content_length:100"
                  :on-upload-img="onUploadImg"
                  :show-word-limit="1"
                  v-else
                  placeholder="聊天内容"
                  v-model="content"
                  :toolbars="[]"
                  :preview="false"/>
        <a-button type="primary" class="send_button" @click="sendData">发送</a-button>
      </div>
    </a-spin>
  </div>
</template>

<style scoped lang="scss">
.gvb_chat_group_components {
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-1);
  border-radius: 5px;

  .arco-spin {
    width: 100%;
  }

  .head {
    padding: 5px;
    border-bottom: 1px solid var(--bg);
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 50px;
    justify-content: center;
    position: relative;

    .title {
      font-size: 16px;
      font-weight: 600;
    }

    .outline {
      margin-top: 5px;
      color: var(--color-text-2);
    }

    .manage {
      position: absolute;
      right: 10px;
      display: flex;
      align-items: center;
    }
  }

  .record_list {
    overflow-y: auto;
    padding: 10px;
    max-height: 600px;
    height: calc(100vh - 300px);

    .message {
      display: flex;
      margin-top: 10px;

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

            .txt-message {
              background-color: var(--color-fill-2);
              border-radius: 5px;
              padding: 2px;
              position: relative;
              width: fit-content;
              white-space: break-spaces;
              word-break: break-all;

              &.is_markdown {
                white-space: inherit;
                word-break: inherit;
              }

              &:before {
                content: "";
                display: block;
                position: absolute;
                left: -20px;
                top: 35%;
                border-width: 5px 10px;
                border-style: solid;
                border-color: transparent var(--color-fill-2) transparent transparent;
              }

              .md-editor {
                background-color: inherit;

                .md-editor-preview {

                  .md-editor-preview-wrapper {
                    padding: 0;

                    img {
                      border: 0;
                    }
                  }
                }
              }
            }
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

          .message-content {
            .content {
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
                  border-color: transparent transparent transparent var(--color-fill-2);
                }
              }
            }
          }
        }
      }
    }


    .system {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      margin-top: 20px;

      .txt-message {
        padding: 5px 10px;
        background-color: var(--color-fill-2);
        border-radius: 5px;
        color: var(--color-text-2);
      }
    }

    .msg {
      position: relative;

      &.isManage {
        background-color: var(--color-fill-2);
        border-radius: 5px;
      }
    }

    .date {
      position: absolute;
      right: 100px;
      top: 10px;
      color: var(--color-text-3);
      font-size: 12px;
      transform: scale(0.8);
      transform-origin: top right
    }

    .arco-checkbox-group {
      width: 100%;
      position: relative;

      .arco-checkbox {
        position: absolute;
        right: 10px;
        top: 8px;
      }
    }


  }

  .footer {
    height: 160px;
    border-top: 1px solid var(--bg);
    padding: 10px;
    position: relative;
    margin-top: 30px;

    .send_button {
      position: absolute;
      right: 15px;
      bottom: 40px;
    }

    .md-editor {
      height: 100%;
    }

    .menu {
      display: flex;
      align-items: center;
      width: auto;
      top: -33px;
      left: 20px;
      border: 1px solid var(--bg);
      position: absolute;
      height: 30px;
      background-color: var(--color-bg-1);
      border-radius: 5px;
      z-index: 2;

      .icon {
        font-size: 18px;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }

    .arco-textarea-wrapper {
      height: inherit;
    }

    .inRoom {
      position: absolute;
      width: calc(100% - 22px);
      height: calc(100% - 23px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      background-color: rgb(var(---6));;
    }
  }
}
</style>
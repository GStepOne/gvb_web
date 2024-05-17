<script setup lang="ts">
import {
  IconBook,
  IconLock,
  IconRobot,
  IconMessage,
  IconDashboard,
  IconFormula,
  IconUser,
  IconFilter,
  IconWifi, IconImage
} from "@arco-design/web-vue/es/icon";
import gvb_card from "@/components/common/gvb_card.vue";
import {type Component, onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import {relativeCurrentTime} from "../../../utils/date";
import Login_data_charts from "@/components/charts/login_data_charts.vue";
import {statisticsApi, type statisticsType} from "@/api/data_api";
import {Message} from "@arco-design/web-vue";
import {useStore} from "@/stores";
import Gvb_weather from "@/components/admin/gvb_weather.vue";

interface QuickEntryType {
  bg: string //背景色
  color: string //文字颜色
  icon: Component
  text: string
  name: string
  link: string
}

const router = useRouter()

const QuickEntryList: QuickEntryType[] = [
  {
    bg: "#d2ecff",
    color: "#69c0ff",
    icon: IconLock,
    text: "日志列表",
    name: "user_list",
    link: "",
  },
  {
    bg: "#d2ecff",
    color: "#7c206a",
    icon: IconBook,
    name:"",
    text: "博客列表",
    link: "https://www.liritian.com",
  },
  {
    bg: "#d2ecff",
    color: "#941eae",
    icon: IconUser,
    text: "用户列表",
    link: "",
    name:""
  },
  {
    bg: "#d2ecff",
    color: "#8c5120",
    icon: IconImage,
    text: "图片列表",
    name: "image_list",
    link: "",
  }, {
    bg: "#d2ecff",
    color: "#ff8469",
    icon: IconRobot,
    text: "群聊记录",
    name: "chat_list",
    link: "",
  }
]

function goLink(item: QuickEntryType) {
  if (item.name) {
    console.log('ttt', item.name)
    router.push({
      name: item.name
    })

    return
  }

  if (item.link) {
    window.open(item.link, "_blank")
  }
}

interface updateLogType {
  id?: number,
  title: string,
  created_at: string
}

const updateLogList: updateLogType[] = [
  {
    title: "Golang 微服务框架go-zero",
    created_at: "2024-04-21 12:04:00",
  }, {
    title: "英语的连读规则",
    created_at: "2024-04-22 12:04:00",
  },
  {
    title: "Protocol buffers （ProtoBuf)",
    created_at: "2024-04-23 12:06:00",
  },
  {
    title: "How to learn any language in six months",
    created_at: "2024-04-23 12:06:00",
  },
  {
    title: "LLM和Fune-tuning",
    created_at: "2024-04-23 12:06:00",
  },
  {
    title: "Stable Diffusion-生成AI图片",
    created_at: "2024-04-23 12:06:00",
  },
  {
    title: "Stable Diffusion-AI绘画工具",
    created_at: "2024-04-23 12:06:00",
  }
]

const statisticsData = reactive<statisticsType>({
  user_count: 0,
  article_count: 0,
  message_count: 0,
  chat_group_count: 0,
  now_login_count: 0,
  now_sign_count: 0,
})

async function getStatisticsData() {
  let res = await statisticsApi()
  if (res.code) {
    Message.error("获取统计数据失败");
    return
  }
  Object.assign(statisticsData, res.data)

  console.log(statisticsData)
}

getStatisticsData();

const store = useStore()

const user = store.userInfo.user_name

</script>

<template>
  <div class="home_view">
    <div class="welcome">
      <div class="title">
        Morning，{{ user }}，a new day will be better!
      </div>
      <div class="weather">
        <gvb_weather></gvb_weather>
      </div>
      <div class="statistics">
      <span>
        <IconFormula></IconFormula>
        在线流量:{{ statisticsData.now_sign_count }}
      </span>
        <span>
            <IconFilter></IconFilter>
        用户总数:{{ statisticsData.user_count }}
      </span>
        <span>
            <IconDashboard></IconDashboard>
        文章总数:{{ statisticsData.article_count }}
      </span>
        <span>
            <IconWifi></IconWifi>
        群聊消息:{{ statisticsData.chat_group_count }}
      </span>
        <span>
            <IconRobot></IconRobot>
        今日消息:{{ statisticsData.message_count }}
      </span>

        <span>
            <IconMessage></IconMessage>
        今日登录:{{ statisticsData.now_sign_count }}
      </span>

      </div>
      <div class="link">
        <div>
        <span>
          前端教程：<a href="https://www.liritian.com" target="_blank">https://www.liritian.com</a>
        </span>
          <span>
          后端教程：<a href="https://www.liritian.com" target="_blank">https://www.liritian.com</a>
        </span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="left">
        <gvb_card title="快捷入口" class="quick_entry">
          <div class="item" v-for="item in QuickEntryList" :style="{'--icon_bg':item.bg,'--icon_color':item.color}">
            <div class="icon" @click="goLink(item)">
              <component :is="item.icon"></component>
            </div>
            <div class="text">
              {{ item.text }}
            </div>
          </div>
        </gvb_card>
        <gvb_card class="statistics" title="数据统计">
          <login_data_charts></login_data_charts>
        </gvb_card>
      </div>
      <div class="right">
        <gvb_card title="更新日志" class="update_log">
          <div class="item" v-for="(item,index) in updateLogList">
            <span class="left">
            <span class="index">
              {{ index + 1 }}.
            </span>
              <span class="content">
                <a-typography-text :ellipsis="{
                  rows:1,
                  showTooltip:true,
                  css:true
                }">
                   {{ item.title }}
                </a-typography-text>
            </span>
            </span>
            <span class="date">
              {{ relativeCurrentTime(item.created_at) }}
            </span>
          </div>
        </gvb_card>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home_view {
  .welcome {
    width: 100%;
    background-image: url("https://demo.gin-vue-admin.com/assets/dashboard-70e55b71.png");
    background-repeat: no-repeat;
    background-position: right;
    background-color: var(--color-bg-1);
    border-radius: 5px;
    padding: 20px;
    background-size: 30%;

    .title {
      font-size: 20px;
      margin-top: 10px;
      font-weight: 600;
      color: var(--color-text-1);
    }

    .weather {
      margin: 20px 0 10px 0;
    }

    .statistics {
      margin: 20px 0 10px 0;
      font-size: 14px;
      //font-weight: 600;

      > span {
        margin-right: 20px;
      }
    }

    .link {
      margin: 30px 0 20px 0;

      > div {
        margin-bottom: 20px;

        > span {
          display: flex;
          margin-top: 20px;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }

      a {
        text-decoration: none;
        color: var(--active);
      }
    }
  }

  .main {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .left {
      width: 70%;

      .statistics {
        margin-top: 10px;
      }

      .quick_entry {
        .body {
          display: flex;
        }

        .item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-right: 30px;

          &:last-child {
            margin-right: 0;
          }

          .icon {
            background-color: var(--icon_bg);
            color: var(--icon_color);
            border-radius: 10px;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            transition: all .3s;
            cursor: pointer;

            svg {
              transition: all .3s;
            }

            &:hover {
              transform: scale(1.05);

              svg {
                transform: scale(1.20);
              }
            }
          }

          .text {
            margin-top: 10px;
            color: var(--color-text-1);
          }
        }
      }
    }

    .right {
      width: calc(30% - 20px);

      .update_log {
        .item {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-2);


          > span {
            display: flex;
            align-items: center;
            white-space: nowrap;

            .index {
              margin-right: 10px;
            }
          }

          .content {
            display: flex;

            .arco-typography {
              margin-bottom: 0;
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>
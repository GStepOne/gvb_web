<template>
  <div class="log_list_view">
    <a-modal title="日志详情" width="50%" v-model:visible="visible" :footer="false" body-class="log_modal_body">
      <div class="log_modal_content" v-html="logContent">
      </div>
    </a-modal>
    <gvb_table
        :url="logListApi"
        :columns="columns"
        default-delete
        no-add
        ref="gvbTable"
        delete-url="/api/log"
        search-placeholder="搜索日志、标题、用户名"
        no-confirm
    >
      <!--搜索的框-->
      <template #action_other_search="{record}:{record:logType}">
        <div class="search_addr">
          <a-input placeholder="地址搜索" v-model="params.addr" style="width: 110px" @change="getList"
                   @keydown.enter="getList"></a-input>
        </div>

        <div class="filter_status" v-if="params.type===1">
          <a-select :options="statusOptions" v-model="params.status" @change="getList" style="width: 110px"
                    placeholder="状态过滤"
                    allow-clear></a-select>
        </div>

        <div class="filter_status" v-if="params.type === 2 || params.type === 3">
          <a-select :options="logLevelOptions" v-model="params.level" @change="getList" style="width: 110px"
                    placeholder="等级过滤"
                    allow-clear></a-select>
        </div>

        <div class="search_date">
          <a-date-picker style="width: 115px" v-model="params.date" @change="getList" @keydown.enter="getList"
                         allow-clear></a-date-picker>
        </div>

        <div class="check_log_type">
          <a-radio-group v-model="params.type" @change="logTypeChange" :options="logTypeOptions"></a-radio-group>
        </div>
      </template>
      <!--用户名-->
      <template #user_name="{record}:{record:logType}">
        <a-dropdown trigger="contextMenu" alignPoint :style="{display:'block'}"
                    @select="selectDrop($event,'user_name')">
          <div style="cursor: pointer">{{ record.user_name }}</div>
          <template #content>
            <a-doption :value="record.user_name">只看该用户的</a-doption>
          </template>
        </a-dropdown>
      </template>

      <template #date="{record}:{record:logType}">
        <a-dropdown trigger="contextMenu" alignPoint :style="{display:'block'}"
                    @select="selectDrop($event,'date')">
          <div style="cursor: pointer">{{ dateTimeFormat(record.created_at) }}</div>
          <template #content>
            <a-doption :value="record.created_at">查看当天的</a-doption>
          </template>
        </a-dropdown>
      </template>

      <template #title="{record}:{record:logType}">
        <div class="log_column_title">
          <span @click="readLog(record)" :class="{isRead: record.read_status}">
            {{ record.title }}
          </span>
        </div>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">
import gvb_table from "@/components/common/gvb_table.vue";
import promotion_create from "@/components/admin/promotion_create.vue";
import {reactive, ref, h, nextTick} from "vue"
import {logListApi, logReadApi} from "@/api/log_api";
import {dateTimeFormat} from "@/utils/date";
import {Message, Tag} from "@arco-design/web-vue";
import type {logType, logRequest} from "@/api/log_api";

import VueJsonPretty from "vue-json-pretty"
import 'vue-json-pretty/lib/styles.css'

const gvbTable = ref()
const visible = ref(false)
const recordData = reactive<promotionCreateType>(
    {
      id: undefined,
      href: "",
      images: "",
      is_show: false,
      title: "",
    }
)

async function readLog(record: logType) {
  if (!record.read_status) {
    await logReadApi(record.id)
    record.read_status = true
  }
  visible.value = true
  logContent.value = record.content

  //组建渲染完之后，不能一加载就立即触发
  nextTick(() => {
    jsonPreview()
  })
  return
}

//重新调用列表
function getList() {
  if (params.status === "") {
    params.status = undefined
  }
  gvbTable.value.getList(params)

}


const columnDict = {
  1: [
    {title: 'ip', dataIndex: 'ip'},
    {title: '地址', dataIndex: 'addr'},
    {title: '标题', slotName: 'title'},
    {title: '内容', dataIndex: 'content'},
    {
      title: '状态', dataIndex: 'status', render: (data: any) => {
        const record = data.record as logType
        if (record.status) {
          return h(Tag, {color: "blue"}, {default: () => "成功"});
        }
        return h(Tag, {color: "red"}, {default: () => "失败"});
      }
    },
    {title: '日志级别', dataIndex: 'level'},
    {title: '用户名', slotName: 'user_name'},
    {title: '更新时间', slotName: 'date'},
    {title: '操作', slotName: 'action'},
  ],
  2: [
    {title: 'ip', dataIndex: 'ip'},
    {title: '地址', dataIndex: 'addr'},
    {title: '用户名', slotName: 'user_name'},
    {title: '内容', dataIndex: 'content'},
    {
      title: '等级', dataIndex: 'level', render: (data: any) => {
        const record = data.record as logType
        switch (record.level) {
          case "info":
            return h(Tag, {color: "blue"}, {default: () => "info"});
          case "warning":
            return h(Tag, {color: "orange"}, {default: () => "warning"});
          case "error":
            return h(Tag, {color: "red"}, {default: () => "error"});

        }
      }
    },
    {title: '标题', slotName: 'title'},
    {title: '更新时间', slotName: 'date'},
    {title: '操作', slotName: 'action'},
  ],
  3: [
    {title: 'ip', dataIndex: 'ip'},
    {title: '标题', slotName: 'title'},
    {title: '服务', dataIndex: 'content'},
    {
      title: '等级', dataIndex: 'level', render: (data: any) => {
        const record = data.record as logType
        switch (record.level) {
          case "info":
            return h(Tag, {color: "blue"}, {default: () => "info"});
          case "warning":
            return h(Tag, {color: "orange"}, {default: () => "warning"});
          case "error":
            return h(Tag, {color: "red"}, {default: () => "error"});

        }
      }
    },
    {title: '日志时间', slotName: 'date'},
    {title: '操作', slotName: 'action'},
  ]
}

//这里一定要先undefined
const params = reactive<logRequest>({
      level: undefined, //1 info 2 warning 3 err
      type: 2,  //1 登录 2操作 3 运行
      ip: undefined,
      user_id: undefined,
      addr: undefined,
      date: undefined,
      status: undefined, //1 成功 2失败
      user_name: undefined,
    }
)
//ref会动态变化
const columns = ref(columnDict[params.type as keyof typeof columnDict])

const statusOptions = [
  {label: "成功", value: true},
  {label: "失败", value: false}
]

const logTypeOptions = [
  {label: "登录日志", value: 1},
  {label: "操作日志", value: 2},
  {label: "运行日志", value: 3}
]

const logLevelOptions = [
  {label: "info", value: 1},
  {label: "warning", value: 2},
  {label: "error", value: 3}
]


//切换日志类型
function logTypeChange() {
  gvbTable.value.clearData()
  columns.value = columnDict[params.type as keyof typeof columnDict]
  gvbTable.value.getList(params)
}


const logContent = ref("")


function jsonPreview() {
  let jsonDomList = document.querySelectorAll(".log_json_body")
  jsonDomList.forEach((value: Element) => {
    // value.innerHTML
    if (value.innerHTML === "") return
    let jsonObj = JSON.parse(value.innerHTML)
    //生成虚拟dom
    const vNode = h(VueJsonPretty, {data: jsonObj})
    //创建虚拟节点
    const app = createApp({render: () => vNode})
    //挂载到value上
    app.mount(value)
  })
}

import {dateFormat} from "@/utils/date";

function selectDrop(value: string | number | boolean | undefined, column: "user_name" | "addr" | "date") {
  if (column === "date") {
    value = dateFormat(value)
  }
  params[column] = value
  getList()
}

</script>

<style lang="scss">
@mixin logLabel($title,$color:var(--color-text-2)) {
  &::before {
    display: block;
    content: $title;
    position: relative;
    right: 10px;
    top: 10px;
    color: $color;
  }
}

.log_modal_body {
  max-height: 60vh;
  overflow-y: auto;

  .log_modal_content {
    color: var(--color-text-2);

    > div {
      padding: 20px;
      background-color: var(--color-fill-2);
      margin-bottom: 20px;
      border-radius: 5px;
      position: relative;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .log_request_header {
    @include logLabel("请求头");
  }

  .log_request {
    @include logLabel("请求");

    .log_request_head {
      color: var(--color-text-2);

      .log_request_method {
        font-weight: 700;

        &.delete {
          color: var(--red-6);

          & ~ .log_request_path {
            color: var(--red-4);
          }
        }

        &.post {
          color: var(--green-6);

          & ~ .log_request_path {
            color: var(--green-4);
          }
        }


        &.put {
          color: var(--orange-6);

          & ~ .log_request_path {
            color: var(--orange-4);
          }
        }

        &.get {
          color: var(--arcoblue-6);

          & ~ .log_request_path {
            color: var(--arcoblue-4);
          }
        }
      }


      .log_request_body {

      }
    }

    .log_request_body {

    }
  }

  .log_item {
    display: flex;

    .log_item_label {
      white-space: nowrap; //不换行 连续的空白符会被合并
      &::after {
        content: "";
        display: inline-block;
        margin-right: 10px;
      }
    }

    .log_modal_content {
      word-break: break-all;
    }

    &.info {
      @include logLabel("info", rgb(var(--arcoblue-5)));
    }

    &.warning {
      @include logLabel("warning", rgb(var(--orange-5)));
    }

    &.error {
      @include logLabel("error", rgb(var(--red-6)));
    }
  }

  .log_response {
    @include logLabel("响应");
  }

  .vjs-tree-no.is-highlight, .vjs-tree-node:hover {
    background-color: var(--color-fill-1);
  }

  .vjs-value {
    word-break: break-all;
    white-space: break-spaces;
  }
}

.log_list_view {
  .log_column_title {
    span {
      color: var(--active);
      cursor: pointer;

      &.isRead {
        color: var(--color-text-1)
      }
    }
  }
}
</style>
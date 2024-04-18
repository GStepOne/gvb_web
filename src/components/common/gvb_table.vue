<template>
  <div class="gvb_table">
    <div class="gvb_table_head">
      <div class="action_create" v-if="!props.noAdd">
        <a-button type="primary" @click="add">{{ addLabel }}</a-button>
      </div>
      <div class="action_group" v-if="!noActionGroup">
        <a-select placeholder="操作" style="width: 120px"
                  allow-clear
                  :options="actionOptions"
                  v-model="actionValue"
        >
        </a-select>
        <a-popconfirm content="是否确认执行此操作?" v-if="!props.noConfirm" @ok="actionMethod">
          <a-button status="danger" type="primary">执行</a-button>
        </a-popconfirm>
        <a-button v-else type="primary" status="danger" v-if="actionValue !== undefined" @click="actionMethod">执行
        </a-button>
      </div>
      <div class="action_search">
        <a-input-search
            :placeholder="props.searchPlaceholder"
            v-model="params.key"
            @keydown.enter="search"
            @search="search">
        </a-input-search>
      </div>
      <slot name="action_other_search">
      </slot>

      <div class="action_filter" v-if="filterGroup.length > 0">
        <a-select
            :placeholder="item.label"
            :options="item.options"
            v-for="item in filterGroup"
            @change="filterChange(item,$event)"
        ></a-select>
      </div>
      <slot name="action_slot">
      </slot>

      <div class="action_slot"></div>
      <div class="action_flush" @click="flush">
        <a-button>
          <IconRefresh></IconRefresh>
        </a-button>
      </div>
    </div>
    <!--  gvb_table_source  -->
    <a-spin class="gvb_table_data" :loading="isLoading" tip="加载中……">
      <div>
        <div class="gvb_table_source">
          <a-table
              :row-key="rowKey" :columns="props.columns" :data="data.list"
              :row-selection="props.noCheck ? undefined :rowSelection"
              v-model:selectedKeys="selectedKeys"
              :pagination="false"
          >
            <!--         -->
            <!--一定要再包一层 不然会报错  record 是从父组件传递的-->
            <template #columns>
              <!--有render 走render-->
              <template v-for="item in props.columns">
                <a-table-column v-if="item.render" :title="item.title as string">
                  <template #cell="data">
                    <component :is="item.render(data) as Component"></component>
                  </template>
                </a-table-column>
                <!--没有render,没有slotName -->
                <a-table-column v-else-if="!item.slotName" :title="item.title as string"
                                :data-index="item.dataIndex">
                </a-table-column>

                <!--slotName 为action 操作-->
                <a-table-column v-else :title="item.title as string">
                  <template #cell="{record}" v-if="item.slotName==='action'">
                    <div class="gvd_cell_action">
                      <slot name="action_left" :record="record"></slot>
                      <a-button type="primary" @click="edit(record)" v-if="!props.noEdit">编辑</a-button>
                      <slot name="action_middle" :record="record"></slot>
                      <a-popconfirm v-if="!props.noDelete" content="是否确认删除?" @ok="remove(record)">
                        <a-button status="danger" type="primary">删除</a-button>
                      </a-popconfirm>
                      <slot name="action_right" :record="record"></slot>

                    </div>
                  </template>
                  <!-- 时间格式处理 -->
                  <template #cell="{record}" v-else-if="item.slotName==='created_at'">
                    <span>{{ dateTimeFormat(record.created_at) }}</span>
                  </template>

                  <template v-else #cell="{record}">
                    <slot :name="item.slotName" :record="record"></slot>
                  </template>
                </a-table-column>
              </template>
            </template>
          </a-table>

        </div>
        <div class="gvb_table_page" v-if="!noPage">
          <a-pagination
              :total="data.count"
              @change="pageChange()"
              v-model:current="params.page"
              :default-page-size="params.limit"
              show-total
              show-jumper
          >
          </a-pagination>
        </div>
      </div>
    </a-spin>
  </div>
</template>


<script setup lang="ts">
import {IconRefresh} from "@arco-design/web-vue/es/icon";
import {type Component, reactive, ref} from "vue"
import {type baseResponse, defaultOptionApi, type listDataType, type paramsType} from "@/api";
import {defaultDeleteApi, type optionType} from "@/api/index";
import {Message, type TableColumnData, type TableData, type TableRowSelection} from "@arco-design/web-vue";
import {dateTimeFormat} from "../../utils/date";

//定义一些属性 由父组件传递过来
interface Props {
  //一个函数
  url: (params: paramsType) => Promise<baseResponse<listDataType<any>>>;
  columns: TableColumnData[];
  limit?: number,
  rowKey?: string,
  addLabel?: string,
  defaultDelete?: boolean //是否启用默认删除
  deleteUrl?: string,
  noActionGroup?: boolean //是否启用操作组
  actionGroup?: actionOptionType[],
  noCheck?: boolean
  filterGroup?: filterOptionType[] //过滤组
  noConfirm?: boolean //关闭二次确认
  noAdd?: boolean
  noEdit?: boolean
  noDelete?: boolean
  searchPlaceholder?: string //搜索模糊匹配的提示词
  defaultParams?: paramsType & any //默认第一次查询的参数
  noPage?: boolean //不要分页
}

const props = defineProps<Props>()
//默认属性数据，如果父组件不传递，就默认为此值
const {limit = 10, rowKey = "id", addLabel = "添加", searchPlaceholder = "搜索"} = props //默认10条
const data = reactive<listDataType<any>>({
  list: [],
  count: 0
})

const params = reactive<paramsType>({
  page: 1,
  limit: limit,
  key: "",
})


const isLoading = ref(false)

async function getList(p?: paramsType & any) {
  if (p !== undefined) {
    //把p的值赋值给params
    Object.assign(params, p)
  }
  isLoading.value = true
  let res = await props.url(params)
  isLoading.value = false

  data.list = res.data.list
  data.count = res.data.count
}

//立马执行
getList(props.defaultParams)


defineExpose({
  getList
})

function pageChange() {
  getList()
}

//搜索
function search() {
  params.page = 1
  getList()
}

function flush() {
  Message.success("刷新成功")
  getList()
}

export type RecordType<T> = T & {}

const emits = defineEmits<{
  (e: "add"): void //添加的事件
  (e: "edit", record: RecordType<any>): void //编辑的事件
  (e: "remove", idList: (number | string)[]): void //删除的事件，单删，批量删除
}>()

//查看他的类型
const selectedKeys = ref<(number | string)[]>([]);
const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false, //当前页
});

export interface actionOptionType {
  label: string
  value?: number
  callback?: (idList: (number | string)[]) => Promise<boolean>
}

const actionValue = ref<string | number | undefined>(undefined)
const actionOptions = ref<actionOptionType[]>([
  {label: "批量删除", value: 0}
])

function initActionGroup() {
  if (!props.actionGroup) {
    return
  }
  for (let i = 0; i < props.actionGroup.length; i++) {
    actionOptions.value.push({
      label: props.actionGroup[i].label,
      value: i + 1,
      callback: props.actionGroup[i].callback,
    })
  }
}

//增加options
initActionGroup()

function actionMethod() {
  if (actionValue.value === 0) {
    //批量删除
    if (selectedKeys.value.length === 0) {
      Message.warning("请选择要删除的记录")
      return
    }
    removeIdData(selectedKeys.value)
    return
  }

  const action = actionOptions.value[actionValue.value as number]
  if (!action.callback) {
    return
  }

  action.callback(selectedKeys.value).then(res => {
    if (res) {
      //重新置空
      selectedKeys.value = []
      getList()
      return
    }
  })
}

function add() {
  emits("add")
}

function edit(record: RecordType<any>) {
  emits("edit", record)
}

async function remove(record: RecordType<any>) {
  //这里用正则表达式匹配解析
  let id = record[rowKey]
  removeIdData([id])
}

async function removeIdData(idList: (number | string)[]) {
  //代理是从api开始的所以url 要以api开头
  if (props.deleteUrl && props.defaultDelete) {
    let res = await defaultDeleteApi(props.deleteUrl, idList)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    //执行成功
    Message.success(res.msg)
    getList()
    emits("remove", idList)
    return
  }
  Message.error("尚未配置删除链接")
}

//过滤
const filterGroup = ref<filterOptionType[]>([])

async function initFilterGroup() {
  if (!props.filterGroup) {
    console.log("filterGroup is empty")
    return
  }
  for (let i = 0; i < props.filterGroup.length; i++) {
    //处理source的数据
    const item = props.filterGroup[i]
    let source: optionType[] = []
    //不同种类
    switch (typeof item.source) {
      case "function":
        let res = await (item.source as filterFunc)()
        source = res.data
        break;
      case "object":
        source = item.source
        break;
      case "string":
        //请求接口
        let res2 = await defaultOptionApi(item.source as string)
        source = res2.data
        break
    }

    filterGroup.value.push({
      label: item.label,
      value: i,
      source: item.source,
      column: item.column,
      options: source,
    })
  }
}

initFilterGroup()
//写完type 就可以写到下面source 里面
type filterFunc = (params?: paramsType) => Promise<baseResponse<optionType[]>>

export interface filterOptionType {
  label: string
  value?: number
  column: string
  source: optionType[] | string | filterFunc //数据源
  options?: optionType[]
}

function filterChange(item: any, val: any) {
  getList({[item.column]: val})
}

//添加
</script>

<style lang="scss">
.gvb_table {
  background-color: var(--color-bg-1);
  border-radius: 5px;

  .gvb_table_head {
    padding: 20px 20px 10px 20px;
    border-bottom: 1px solid var(--bg);
    display: flex;
    align-items: center;

    > div {
      margin-right: 10px;
    }

    .action_group {
      display: flex;

      button {
        margin-left: 10px;
      }
    }

    .action_filter {
      display: flex;

      > .arco-select {
        margin-right: 10px;
      }
    }

    .action_flush {
      margin-left: auto; /* 将按钮推到右侧 */
      padding: 0 10px;

      button {
        padding: 0 10px;
        margin-right: 10px;
      }
    }
  }

  .arco-spin {
    display: block;
  }

  .gvb_table_data {
    padding: 10px 20px 20px 20px;
    width: inherit;

    .gvb_table_page {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    .gvb_table_source {
      .gvd_cell_action {
        display: flex;
        > button {
          margin-right: 10px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}

</style>
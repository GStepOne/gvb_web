<template>
  <div class="menu_list_view">
    <menu_create v-model:visible="visible" @ok="handleOk" :record="recordData">
    </menu_create>
    <gvb_table
        :url="menuListApi"
        :columns="columns"
        default-delete
        add-label="创建菜单"
        ref="gvbTable"
        delete-url="/api/menus"
        search-placeholder="搜索菜单名称"
        @add="add"
        @edit="edit"
        no-page
        no-check
        no-action-group
        no-confirm
    >
      <template #banners="{record}:{record:menuType}">
        <div class="menu_column_image">
          <a-image
              v-for="item in record.banners"
              :key="item.id"
              height="40px"
              :src="item.path"
          ></a-image>
        </div>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">
import type {
  actionOptionType,
  filterOptionType,
  RecordType
} from "@/components/common/gvb_table.vue";
import gvb_table from "@/components/common/gvb_table.vue";
import menu_create from "@/components/admin/menu_create.vue"
import {reactive, ref} from "vue"
import type {menuCreateRequest, menuType} from "@/api/menu_api";
import {menuListApi} from "@/api/menu_api";
import type {imageIdType} from "@/api/image_api";
import {defaultForm} from "@/api/menu_api";

const columns = [
  {title: '序号', dataIndex: 'sort'},
  {title: '菜单标题', dataIndex: 'title'},
  {title: '路径', dataIndex: 'path'},
  {title: 'slogan', dataIndex: 'slogan'},
  {title: '简介', dataIndex: 'abstract'},
  {title: 'slogan切换时间', dataIndex: 'banner_time'},
  {title: '简介切换时间', dataIndex: 'abstract_time'},
  {title: 'banner', slotName: 'banners'},
  {title: '更新时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]

const gvbTable = ref()
const visible = ref(false)

const recordData = reactive<menuCreateRequest & { banners: imageIdType[], id?: number }>({
  image_sort_list: [],
  path: "",
  title: "",
  slogan: "",
  abstract: [],
  abstract_time: 0,
  banner_time: 0,
  sort: 1,
  banners: []
})

function edit(record: menuType) {
  Object.assign(recordData, record)
  visible.value = true
}

//重新调用列表
function handleOk() {
  gvbTable.value.getList()
}

function add() {
  Object.assign(recordData, defaultForm)
  recordData.banners = []
  recordData.id = undefined
  visible.value = true
}
</script>

<style lang="scss">
.menu_list_view {
  width: 100%;
  overflow-x: auto; /* 添加水平滚动条 */
  .menu_column_image {
    display: grid;
    grid-template-columns:repeat(3, 1fr); //一行显示3个
    grid-row-gap: 5px;

    .arco-image-img {
      margin-right: 5px;
      border-radius: 5px;
    }
  }

}
</style>
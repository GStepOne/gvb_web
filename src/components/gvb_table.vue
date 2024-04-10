<template>
  <div class="gvb_table">
    <div class="gvb_table_head">
      <div class="action_create">
        <a-button type="primary">添加</a-button>
      </div>
      <div class="action_group">
        <a-select placeholder="操作">操作</a-select>
      </div>
      <div class="action_search">
        <a-input-search placeholder="搜索"></a-input-search>
      </div>
      <div class="action_other_search"></div>
      <div class="action_filter">
        <a-select placeholder="过滤"></a-select>
      </div>
      <div class="action_slot"></div>
      <div class="action_flush">
        <a-button>
          <IconRefresh></IconRefresh>
        </a-button>
      </div>
    </div>
    <!--  gvb_table_source  -->
    <div class="gvb_table_source">
      <a-table :columns="columns" :data="data.list" :row-selection="rowSelection"
               v-model:selectedKeys="selectedKeys" :pagination="false"/>

      <template #action="{record}">
        <a-avatar image-url="data.avatar"></a-avatar>
      </template>

      <template #action="{record}">
        <a-button type="primary">编辑</a-button>
        <a-button status="danger" type="primary">删除</a-button>
      </template>
    </div>
    <!--  gvb_table_source end  -->
    <!-- gvb_table_page   -->
    <div class="gvb_table_page">
      <a-pagination :total="data.count" show-total show-jumper/>
    </div>
    <!--    gvb_table_page end-->
  </div>
</template>


<script setup lang="ts">
import {IconRefresh} from "@arco-design/web-vue/es/icon";
import {reactive, ref} from "vue"
import type {paramsType, listResponse} from "@/api";
import type {TableColumnData} from "@arco-design/web-vue";


interface Props {
  //一个函数
  url: (params: paramsType) => Promise<listResponse<any>>;
  columns: TableColumnData[];
}

const props = defineProps<Props>()

const data = reactive({
  list: [],
  count: 0
})

async function getList() {
  let res = await props.url({page:1,limit:10})
  data.list = res.data.list
  data.count = res.data.count
  console.log(res.data)
}
//
// getList()

const selectedKeys = ref(['Jane Doe', 'Alisa Ross']);
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});


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

    .action_flush {
      position: absolute;
      right: 20px;
      margin-right: 0;

      button {
        padding: 0 10px;
        margin-right: 10px;
      }
    }
  }

  .gvb_table_page {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .gvb_table_source {
    padding: 10px 20px 20px 20px;
  }
}

</style>
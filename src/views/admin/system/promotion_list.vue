<template>
  <div class="menu_promotion_view">
    <promotion_create v-model:visible="visible" @ok="handleOk" :record="recordData">
    </promotion_create>
    <gvb_table
        :url="promotionListApi"
        :columns="columns"
        default-delete
        add-label="创建广告"
        ref="gvbTable"
        delete-url="/api/advert"
        search-placeholder="搜索广告名称"
        @add="add"
        @edit="edit"
        no-confirm
    >
      <template #images="{record}:{record:promotionType}">
        <a-image height="60px" style="border-radius: 5px" :src="record.images"></a-image>
      </template>

      <template #href="{record}:{record:promotionType}">
        <a-link :href="record.href" target="_blank">{{ record.href }}</a-link>
      </template>


      <template #updated_at="{record}:{record:promotionType}">
<!--        <a-link :href="record.href" target="_blank">{{ record.href }}</a-link>-->
        <span>{{ dateTimeFormat(record.updated_at) }}</span>
      </template>

      <template #is_show="{record}:{record:promotionType}">
        <a-tag v-if="record.is_show" color="arcoblue">显示</a-tag>
        <a-tag v-else>不显示</a-tag>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">
import gvb_table from "@/components/common/gvb_table.vue";
import promotion_create from "@/components/admin/promotion_create.vue";
import {reactive, ref} from "vue"
import {
  defaultPromotionForm,
  type promotionCreateType,
  promotionListApi,
  type promotionType
} from "@/api/promotion_api";
import Promotion_create from "@/components/admin/promotion_create.vue";
import {dateTimeFormat} from "@/utils/date";

const columns = [
  {title: '标题', dataIndex: 'title'},
  {title: '图片', slotName: 'images'},
  {title: '链接', slotName: 'href'},
  {title: '是否显示', slotName: 'is_show'},
  {title: '更新时间', slotName: 'updated_at'},
  {title: '操作', slotName: 'action'},
]

const gvbTable = ref()
const visible = ref(false)

const recordData = reactive<promotionCreateType>(
    {
      href: "",
      images: "",
      is_show: false,
      title: "",
    }
)

function edit(record: promotionType) {
  Object.assign(recordData, record)
  recordData.id = 0
  visible.value = true
}

//重新调用列表
function handleOk() {
  gvbTable.value.getList()
}

function add() {
  Object.assign(recordData, defaultPromotionForm)
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
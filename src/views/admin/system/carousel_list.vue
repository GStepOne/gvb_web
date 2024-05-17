<style scoped lang="scss">
</style>
<template>
  <div class="image_list_view">
    <a-modal title="图片上传" @before-open="beforeOpen" v-model:visible="visible" @ok="refresh">
      <!-- v-model:file-list="fileList" 建立双向绑定，:file-list="fileList" 子组件传递数据-->
      <a-upload :headers="{token: store.userInfo.token}"
                list-type="picture-card"
                action="/api/carousel"
                name="image"
                class="gvb_image_upload"
                v-model:file-list="fileList"
                image-preview
                multiple
                @success="imageUploadSuccessEvent"
      ></a-upload>
    </a-modal>

    <gvb_table :url="carouselListApi"
               delete-url="/api/carousels"
               :columns="columns"
               default-delete
               add-label="图片上传"
               ref="gvbTable"
               search-placeholder="搜索图片名称"
               @add="visible=true"
               no-edit
               no-confirm
    >
      <template #path="{record}:{record:imageType}">
        <a-image :src="record.path" style="border-radius: 5px;" height="50px"></a-image>
      </template>

      <template #action_left="{record}:{record:imageType}">
        <a style="margin-right: 10px" :href="record.path" :download="record.name">
          <a-button type="primary">下载图片
            <template #icon>
              <IconDownload></IconDownload>
            </template>
          </a-button>
        </a>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">
import {IconDownload} from "@arco-design/web-vue/es/icon";
import {h, reactive, ref} from "vue";
import {roleOptions} from "@/global/global";
import {type userInfoType, type userUpdateRequest} from "@/api/user_api";

import gvb_table, {
  type actionOptionType,
  type filterOptionType,
  type RecordType
} from "@/components/common/gvb_table.vue";

import {type imageType, type imagesUploadResponse} from "@/api/carousel_api";
import {Message, Tag} from "@arco-design/web-vue";
import type {FileItem} from "@arco-design/web-vue";
import {useStore} from "@/stores";
import type {baseResponse} from "@/api";
import {carouselListApi} from "@/api/carousel_api";

const store = useStore()
const fileList = ref<FileItem[]>([])

const columns = [
  {title: 'id', dataIndex: 'id'},
  {title: '名字', dataIndex: 'name'},
  {
    title: '上传类型', dataIndex: 'image_type', render: (data: any) => {
      const record = data.record as imageType
      let color = "red"
      if (record.image_type === "本地") {
        color = "green"
      }
      return h(Tag, {color: color}, {default: () => record.image_type})
    }
  },
  {title: '预览', slotName: 'path'},
  {title: '上传时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]

const visible = ref(false)
const gvbTable = ref()

//目的是刷新列表
function refresh() {
  gvbTable.value.getList()
}

function imageUploadSuccessEvent(fileItem: FileItem) {
  console.log(fileItem)
  const response = fileItem.response as baseResponse<imagesUploadResponse>
  //找里面有false的
  if (response.code) {
    Message.error(response.msg)
    return
  }
}

function beforeOpen() {
  fileList.value = []
}
</script>
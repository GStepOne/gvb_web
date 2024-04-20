<style lang="scss">

//.gvb_image_upload {
//  .arco-upload-list-picture {
//    //width: inherit; //这就取消了自己的宽度
//  }
//}

</style>
<template>
  <div class="image_list_view">
    <a-modal title="图片上传" @before-open="beforeOpen" v-model:visible="visible" @ok="refresh">
      <a-upload :headers="{token: store.userInfo.token}"
                list-type="picture-card"
                action="/api/images"
                name="images"
                class="gvb_image_upload"
                v-model:file-list="fileList"
                image-preview
                multiple
                @success="imageUploadSuccessEvent"
      ></a-upload>
    </a-modal>

    <gvb_table :url="imageListApi"
               delete-url="/api/images"
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

import {imageListApi, type imageType, type imagesUploadResponse} from "@/api/image_api";
import {Message, Tag} from "@arco-design/web-vue";
import type {FileItem} from "@arco-design/web-vue";
import {useStore} from "@/stores";
import type {baseResponse} from "@/api";

const store = useStore()

const fileList = ref<FileItem[]>([])

const columns = [
  {title: 'id', dataIndex: 'id'},
  {title: '名字', dataIndex: 'name'},
  {
    title: '上传类型', dataIndex: 'image_type', render: ({record}: { record: imageType }) => {
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
//编辑用户
const updateVisible = ref(false)

const updateUserForm = reactive<userUpdateRequest>({
  nick_name: "",
  role: 0,
  user_id: 0
})

//点击编辑按钮弹出框，并给他赋值
function edit(record: RecordType<userInfoType>): void {
  updateUserForm.user_id = record.id
  updateUserForm.role = record.role_id //点开弹框的时候
  updateUserForm.nick_name = record.nick_name
  updateVisible.value = true

}


const visible = ref(false)
const gvbTable = ref()

//目的是刷新列表
function refresh() {
  gvbTable.value.getList()
}

function imageUploadSuccessEvent(fileItem: FileItem) {
  const response = fileItem.response as baseResponse<imagesUploadResponse[]>
  if (response.data.length > 0) {
    //找里面有false的
    response.data.forEach((item) => {
      if (!item.is_success) {
        Message.error(item.msg)
        return
      }
      Message.success(item.msg)
    })
  }
}

function beforeOpen() {
  fileList.value = []
}


</script>
<template>
  <div>
    <!--    ok是自定义的事件名-->
    <user_create v-model:visible="visible" @ok="createOk"></user_create>
    编辑用户
    <a-modal title="编辑用户" v-model:visible="updateVisible" :on-before-ok="updateUserOk">
      <a-form ref="formUpdateRef" :model="updateUserForm">
        <a-form-item field="nick_name" label="昵称"
                     :rules="[{required:true,message:'请输入昵称'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="updateUserForm.nick_name" placeholder="昵称"></a-input>
        </a-form-item>
        <a-form-item field="role" label="权限">
          <a-select v-model="updateUserForm.role" :allow-clear="true" :options="roleOptions"
                    placeholder="选择角色"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <gvb_table :url="userListApi"
               delete-url="/api/user_delete"
               :columns="columns"
               default-delete
               add-label="创建用户"
               :limit="10"
               ref="gvbTable"
               :filter-group="filterGroup"
               search-placeholder="搜索用户名和昵称"
               @add="visible=true"
               @edit="edit"
               @remove="remove"
               no-confirm
    >
      <!--               :action-group="actionGroup"-->
      <template #avatar="{record}">
        <a-avatar :imageUrl="record.avatar"></a-avatar>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {roleIDListApi} from "@/api/role_api";
import {roleOptions} from "@/global/global";
import {Message} from "@arco-design/web-vue";
import user_create from "@/components/admin/user_create.vue"
import {type userInfoType, userListApi, userUpdateApi, type userUpdateRequest} from "@/api/user_api";
import gvb_table, {
  type actionOptionType,
  type filterOptionType,
  type RecordType
} from "@/components/common/gvb_table.vue";

const columns = [
  {title: '昵称', dataIndex: 'nick_name'},
  {title: '用户名', dataIndex: 'user_name'},
  {title: '头像', slotName: 'avatar'},
  {title: '邮箱', dataIndex: 'email'},
  {title: '角色', dataIndex: 'role'},
  {title: 'IP', dataIndex: 'ip'},
  {title: '注册时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]
// const actionGroup: actionOptionType[] = [{
//   label: "批量拉黑",
//   callback: async (idList: (number | string)[]): Promise<boolean> => {
//     //由子组件负责调列表页
//     return true
//   }
// }]

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

  console.log("角色列表", roleOptions)
}


const visible = ref(false)
const gvbTable = ref()

function remove(idList: (number | string)[]) {
  // console.log(idList)
}

function createOk() {
  gvbTable.value.getList()
}

function add() {
  console.log(gvbTable.value)
}

const filterGroup: filterOptionType[] = [
  {
    label: "角色过滤",
    value: 0,
    column: "role",//后端的字段
    source: roleIDListApi,
  }
]

const formUpdateRef = ref()

async function updateUserOk() {
  let val = await formUpdateRef.value.validate()
  if (val) {
    return false
  }
  //调用后端接口 更新数据
  let res = await userUpdateApi(updateUserForm)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  //重新拉取列表
  gvbTable.value.getList()
  return true //说明校验通过
}

</script>
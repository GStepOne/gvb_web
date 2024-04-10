<template>
  <div>
    <gvb_table :url="userListApi" :columns="columns"></gvb_table>
  </div>
</template>

<script setup lang="ts">
import Gvb_table from "@/components/gvb_table.vue";
import {userListApi} from "@/api/user_api";

const columns = [
  {title: '昵称', dataIndex: 'nick_name'},
  {title: '头像', slotName: 'avatar'},
  {title: '邮箱', dataIndex: 'email'},
  {title: '角色', dataIndex: 'role'},
  {title: 'IP', dataIndex: 'ip'},
  {title: '注册时间', dataIndex: 'created_at'},
  {title: '操作', slotName: 'action'},
]
</script>
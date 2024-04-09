<script setup lang="ts">
import {ref} from "vue";

const visible = ref(false)
import gvb_login from "@/components/common/gvb_login.vue";
import Gvb_theme from "@/components/common/gvb_theme.vue";
console.log(import.meta.env.VITE_SERVER_URL)
</script>

<style setup lang="scss">

</style>

<template>
  <div>
    <gvb_login v-model:visible="visible"></gvb_login>
    <gvb_theme></gvb_theme>
    <a-button @click="visible=true">登录</a-button>
    <router-link to="/admin">后台</router-link>
  </div>
</template>

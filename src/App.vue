<template>
  <RouterView/>
</template>


<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {useStore} from "@/stores";

const store = useStore();
store.loadTheme()
store.loadToken()
</script>

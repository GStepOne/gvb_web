<script setup lang="ts">
</script>

<template>
  <router-view class="web_view"></router-view>
</template>

<style lang="scss">
.web_view {
  background-color: var(--bg);
}

@media screen and (min-width: 1400px) and (max-width: 1800px) {
  body{
    --container_width: 1200px;
  }
}

@media screen and (min-width: 1000px) and (max-width: 1200px) {
  body{
    --container_width: 800px;
  }
}
</style>
<script setup lang="ts">

</script>

<template>
  <div class="system_view">
    <div class="system_menu">
      <router-link :to="{name:'site_config'}">网站设置</router-link>
      <router-link :to="{name:'email_config'}">邮箱设置</router-link>
      <router-link :to="{name:'qiniu_config'}">七牛云设置</router-link>
      <router-link :to="{name:'qq_config'}">QQ设置</router-link>
      <router-link :to="{name:'jwt_config'}">JWT设置</router-link>
    </div>
    <div class="system_container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.system_view {
  display: flex;

  .system_menu {
    width: 160px;
    height: calc(100vh - 130px);
    background-color: var(--color-bg-1);
    border-radius: 5px;
    display: flex;
    margin-left: 20px;
    flex-direction: column; //平着排
    padding: 20px;

    a {
      color: var(--color-text-2);
      text-decoration: none;
      display: flex;
      border-radius: 5px;
      justify-content: center;
      height: 40px;
      align-items: center;
      margin-bottom: 10px;
      background-color: var(--color-fill-2);

      &.router-link-exact-active {
        background-color: var(--active);
        color: white;
      }
    }
  }

  .system_container {
    width: calc(100% - 160px);
    min-height: calc(100vh - 150px);
    background-color: var(--color-bg-1);
    border-radius: 5px;
    margin-left: 20px;
    padding: 20px;
  }
}
</style>
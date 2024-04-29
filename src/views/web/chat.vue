<script setup lang="ts">
import {ref} from "vue";
import Gvb_nav from "@/components/web/gvb_nav.vue";
import Gvb_chat_group from "@/components/common/gvb_chat_group.vue";
</script>

<template>
  <div class="chat_view">
    <gvb_nav no-scroll></gvb_nav>
    <main>
      <div class="container">
        <gvb_chat_group config="">
        </gvb_chat_group>
      </div>
    </main>
  </div>
</template>

<style lang="scss">
.chat_view {
  height: 100vh;
  background-color: var(--bg);

  main {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 60px;

    .container {
      width: var(--container_width);
    }
  }
}
</style>
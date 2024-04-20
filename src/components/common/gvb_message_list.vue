<script setup lang="ts">
import type {messageType} from "@/api/message_api";
import {ref} from "vue";

interface Props {
  data: messageType[];
}

const props = defineProps<Props>()
//选中的是哪个
const active = ref<number>(0)

const emits = defineEmits(["check"])

function checkItem(record: messageType) {
  active.value = record.user_id
  emits("check", record)
}
</script>

<template>
  <div class="gvb_message_list">
    <div :class="{item:true,active:active===item.user_id}" @click="checkItem(item)" v-for="item in props.data">
      <img class="avatar" :src="item.avatar" alt="">
      <div class="nickname">
        <!--        名字如果长的话就一行，省略号显示-->
        <a-typography-text :ellipsis="{rows:1,showTooltip:true,css:true}">
          {{ item.nickname }}
        </a-typography-text>
      </div>
      <div class="count">{{ item.count }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.gvb_message_list {
  width: 100%;

  .item {
    //width: auto;
    height: 40px;
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    cursor: pointer;

    .nickname {
      .arco-typography {
        margin-bottom: 0;
        max-width: 5rem;
      }
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    &.active {
      background-color: var(--color-fill-2);
      border-radius: 5px;
    }
  }
}
</style>
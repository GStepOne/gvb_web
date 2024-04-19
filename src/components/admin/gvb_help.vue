<script setup lang="ts">
import Gvb_title from "@/components/common/gvb_title.vue";

interface helpData {
  title: string;
  abs?: string,
  content: string,
}


interface Props {
  helpTitle?: string,
  data: helpData[]
}
const props = defineProps<Props>()
const {helpTitle = "帮助"} = props



</script>

<template>
  <div class="gvb_help">
    <gvb_title :title="props.helpTitle"></gvb_title>
    <div class="col" v-for="item in props.data">
      <div class="title">
        <div class="column">{{ item.title }}</div>
        <div class="abs">{{ item.abs }}</div>
      </div>
      <div class="content" v-html="item.content"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gvb_help {


  .col {
    margin-top: 20px;

    .title {
      display: flex;

      .column {
        font-weight: 600;
        margin-right: 10px;

        &::after {
          content: ":";
        }
      }
    }

    .content {
      line-height: 1.5rem;

      img {
        max-width: 100%;
        border-radius: 5px;
      }

      a {
        color: var(--active)
      }
    }
  }
}
</style>
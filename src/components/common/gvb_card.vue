<script setup lang="ts">
interface Props {
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="gvb_card">
    <div class="head">
      <div class="title">{{ props.title }}</div>
      <div class="right">
        <slot name="head-right"></slot>
      </div>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>

</template>

<style lang="scss">
.gvb_card {
  margin-top: 10px;
  background-color: var(--color-bg-1);
  border-radius: 5px;
  padding: 10px;

  .head {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid var(--bg);
    justify-content: space-between;

    .title {
      font-size: 18px;
      font-weight: 600;
    }

    .right {
      a {
        color: var(--color-text-2);
        text-decoration: none;
      }
    }
  }

  .body {
    //padding: 10px;
    //min-height: 20px;
    //width: inherit;
    //display: flex;
    //align-items: center;
    //justify-content: space-between;
  }
}
</style>
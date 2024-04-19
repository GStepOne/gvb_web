<script setup lang="ts">
const props = defineProps({
  title: {type: String},
})
</script>

<template>
  <div class="gvb_title">
    {{ props.title }}
  </div>
</template>

<style scoped lang="scss">
.gvb_title {
  font-size: 16px;
  font-weight: 900;
  align-items: center;
  //元素前面添加一个特定样式的装饰元素，通常用于美化界面或实现一些特殊效果
  &::before {
    width: 4px;
    height: 1.2rem; //1个文字的高度
    margin-right: 5px;
    content: "";
    display: inline-block;
    background-color: var(--active);
  }
}
</style>
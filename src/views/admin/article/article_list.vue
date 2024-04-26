<style lang="scss">
@mixin marginRight($width) {
  margin-right: $width;
  &:last-child {
    margin-right: 0;
  }
}

.article_list_view {
  .article_data_col {
    > span {
      color: var(--color-text-2);
      @include marginRight(10px);

      i {
        margin-right: 5px
      }
    }
  }

  .article_tags_col {
    .arco-tag {
      @include marginRight(5px)
    }
  }

  .article_title_col {
    > em {
      color: rgb(var(--red-6));
    }
  }
}
</style>
<template>
  <div class="article_list_view">
    <gvb_article_list :is_user="false"></gvb_article_list>
  </div>
</template>

<script setup lang="ts">
import Gvb_article_list from "@/components/admin/gvb_article_list.vue";
</script>
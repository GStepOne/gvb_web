<script setup lang="ts">
import type {articleUpdateType, articleDataType} from "@/api/article_api";
import {dateFormat} from "../../utils/date";

interface Props {
  data: articleUpdateType & articleDataType
  preview?: boolean
}

import {IconClockCircle} from "@arco-design/web-vue/es/icon";

const props = defineProps<Props>()
</script>

<template>
  <div :class="{gvb_article_item:true,preview:props.preview}">
    <!--封面图-->
    <div class="cover">
      <a-image :src="props.data.banner_url"></a-image>
    </div>

    <div class="info">
      <div class="title">{{ props.data.title }}</div>
      <div class="abstract">
        <!--文本的截断和省略-->
        <a-typography-paragraph :ellipsis="{rows:2,showTooltip:true,css:true}">
          {{ props.data.abstract }}
        </a-typography-paragraph>
      </div>
      <div class="data">
        <span class="category">
          <a-tag color="red">{{ props.data.category }}</a-tag>
        </span>

        <div class="date">
          <IconClockCircle></IconClockCircle>
          {{ dateFormat(props.data.created_at as string) }}
        </div>
        <span class="article_data">
              <span>
                <i class="fa fa-thumbs-o-up"></i>
                <span>{{ props.data.digg_count }}</span>
              </span>
              <span>
                <i class="fa fa-eye"></i>
                <span>{{ props.data.look_count }}</span>
              </span>
              <span>
                <i class="fa fa-comments"></i>
                <span>{{ props.data.comment_count }}</span>
              </span>
              <span>
                <i class="fa fa-star"></i>
                <span>{{ props.data.collects_count }}</span>
              </span>
        </span>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
.gvb_article_item {
  //padding: 10px;
  display: flex;
  width: 100%;

  background-color: var(--color-fill-2);
  border-radius: 5px;

  &.preview {
    //transform: scale(0.9); //缩小一点 30% 就不会变乱了
    transform-origin: left top;
    width: 800px;
  }

  .cover {
    width: 30%;
    border-radius: 5px;
    overflow: hidden;

    &:hover {
      img {
        transform: scale(1.05);
      }
    }

    .arco-image {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all .3s;
      }
    }
  }

  .info {
    width: 70%;
    padding-left: 20px;
    color: var(--color-text-2);

    .title {
      font-weight: 400;
      font-size: 16px;
    }

    .abstract {
      .arco-typography {
        margin-bottom: 0;
      }
    }

    .data {
      margin-top: 5px;

      .category {
        margin-right: 10px;
      }

      .date {
        margin-right: 10px;
      }
    }

    .article_data {
      > span {
        margin-right: 8px;

        i {
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
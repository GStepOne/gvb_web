<script setup lang="ts">
import {ref} from "vue";
import Gvb_nav from "@/components/web/gvb_nav.vue";
import Gvb_banner from "@/components/web/gvb_banner.vue";
import Gvb_card from "@/components/common/gvb_card.vue";
import {IconDoubleRight} from "@arco-design/web-vue/es/icon";
import Gvb_footer from "@/components/web/gvb_footer.vue";
</script>

<template>
  <div class="index_view">
    <gvb_nav></gvb_nav>
    <gvb_banner></gvb_banner>
    <main>
      <div class="container">
        <!--左侧开始-->
        <div class="left">
          <gvb_card title="今日热搜">
            <template #head-right>
              <router-link :to="{name:'news'}">
                更多
                <IconDoubleRight></IconDoubleRight>
              </router-link>
            </template>
          </gvb_card>
          <gvb_card title="文章日历"></gvb_card>
          <gvb_card title="文章列表">
            <template #head-right>
              <a-input-search placeholder="搜索文章标题"></a-input-search>
            </template>
          </gvb_card>
        </div>
        <!--右侧开始-->
        <div class="right">
          <gvb_card title="独家推广"></gvb_card>
          <gvb_card title="标签云"></gvb_card>
          <gvb_card title="个人名片"></gvb_card>
          <gvb_card title="意见反馈"></gvb_card>
        </div>
      </div>
    </main>
    <gvb_footer></gvb_footer>
  </div>
</template>

<style lang="scss">
.index_view {
  background-color: var(--bg);

  main {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .container {

      width: var(--container_width);
      justify-content: space-between; //两端对齐
      display: flex;

      > .right {
        width: 380px;
      }

      > .left {
        width: calc(100% - 400px);
      }

      .gvb_card {
        margin-bottom: 20px;
      }
    }

  }
}

</style>
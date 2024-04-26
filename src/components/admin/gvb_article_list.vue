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
    <!--@ok 接收子组件发出的ok事件 emits(ok)-->
    <gvb_article_upadte
        v-model:visible="updateVisible"
         :data="recordData"
    ></gvb_article_upadte>

    <!--抽屉-->
    <gvb_article_drawer
        v-model:visible="createVisible"
        @ok="refresh">
    </gvb_article_drawer>

    <!--内容的抽屉-->
    <gvb_article_content_drawer
        v-model:visible="articleContentVisible"
        :id="articleUpdateId">
    </gvb_article_content_drawer>

    <gvb_table :url="articleListApi"
               delete-url="/api/article"
               :columns="columns"
               default-delete
               add-label="发布文章"
               :filter-group="filterGroup"
               ref="gvbTable"
               :default-params="params"
               search-placeholder="搜索文章名称、内容、分类"
               @add="createVisible=true"
               no-confirm
               @ok="refresh"
               @edit="editArticleInfo"
    >

      <!--封面图片-->
      <template #banner_url="{record}:{record: articleType}">
        <a-image :src="record.banner_url" style="border-radius: 5px;" height="50px"></a-image>
      </template>
      <!--文章数据-->
      <template #data="{record}:{record:articleType}">
        <div class="article_data_col">
          <span>
            <i class="fa fa-thumbs-o-up"></i>
            <span>{{ record.digg_count }}</span>
          </span>
          <span>
            <i class="fa fa-eye"></i>
            <span>{{ record.look_count }}</span>
          </span>
          <span>
            <i class="fa fa-comments"></i>
            <span>{{ record.comment_count }}</span>
          </span>
          <span>
            <i class="fa fa-star"></i>
            <span>{{ record.collects_count }}</span>
          </span>
        </div>
      </template>
      <!--标签-->
      <template #tags="{record}:{record:articleType}">
        <div class="article_tags_col">
          <a-tag v-for="item in record.tags" :color="colorList[Random.integer(0,12)]">
            {{ item }}
          </a-tag>
        </div>
      </template>
      <template #title="{record}:{record:articleType}">
        <div class="article_title_col" v-html="record.title"></div>
      </template>

      <template #action_middle="{record}:{record:articleType}">
        <a-button type="outline" @click="editArticleContent(record)">编辑正文</a-button>
      </template>
    </gvb_table>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {articleCategoryListApi, articleListApi, type articleUpdateType} from "@/api/article_api"
import {type articleType} from "@/api/article_api"
import gvb_table, {
  type actionOptionType,
  type filterOptionType,
  type RecordType
} from "@/components/common/gvb_table.vue";
import type {FileItem} from "@arco-design/web-vue";
import {useStore} from "@/stores";
import {Random} from "mockjs";
import Gvb_article_upadte from "@/components/common/gvb_article_update.vue";
import {tagOptionsApi} from "@/api/tag_api";
import Gvb_article_drawer from "@/components/common/gvb_article_drawer.vue";
import Gvb_article_content_drawer from "@/components/common/gvb_article_content_drawer.vue";
import type {paramsType} from "@/api";

const store = useStore()
const fileList = ref<FileItem[]>([])
const columns = [
  {title: '文章标题', slotName: 'title'},
  {title: '分类', dataIndex: 'category'},
  {title: '封面', slotName: 'banner_url'},
  {title: '作者', dataIndex: 'user_nick_name'},
  {title: '标签', slotName: 'tags'},
  {title: '文章数据', slotName: 'data'},
  {title: '创作时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]
//编辑用户
const visible = ref(false)
const gvbTable = ref()
const colorList = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray'
]


interface Props {
  is_user: boolean
}

const props = defineProps<Props>()
const {is_user = false} = props

const params = reactive<paramsType & { is_user: boolean }>({
  is_user: is_user
})

const filterGroup: filterOptionType[] = [
  {
    label: "文章分类",
    column: "category",
    source: articleCategoryListApi
  }, {
    label: "文章标签",
    column: "tag",
    source: tagOptionsApi
  },
]

//目的是刷新列表
function refresh() {
  gvbTable.value.getList();
}

function beforeOpen() {
  fileList.value = []
}

//让更新文章的弹窗不为真
const updateVisible = ref(false)
//对象是响应式的，意味着对其属性的任何更改都会触发组件中的响应性，从而在数据更改时自动更新 UI。
const recordData = reactive<articleUpdateType>({
  id: "",
  tags: [],
  abstract: "",
  banner_id: 0,
  category: "",
  content: "",
  link: "",
  source: "",
  title: "",
  banner_url: "",
})

function editArticleInfo(record: articleType) {
  updateVisible.value = true
  recordData.abstract = record.abstract
  recordData.banner_id = record.banner_id
  recordData.category = record.category
  recordData.content = record.content
  recordData.link = record.link
  recordData.source = record.source
  recordData.tags = record.tags
  recordData.title = record.title
  recordData.id = record.id
  recordData.banner_url = record.banner_url
}

const createVisible = ref(false)
const articleContentVisible = ref(false)
const articleUpdateId = ref<string | undefined>(undefined)


//编辑文章内容
function editArticleContent(record: articleType) {
  articleContentVisible.value = true
  articleUpdateId.value = record.id
}


</script>
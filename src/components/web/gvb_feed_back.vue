<script setup lang="ts">
import type {feedBackCreateType, feedBackType} from "@/api/feed_back_api";
import {reactive, ref} from "vue";
import {dateFormat} from "../../utils/date";
import {Message} from "@arco-design/web-vue";

const form = reactive<feedBackCreateType>({
  email: "",
  content: ""
})

const list = ref<feedBackType[]>(
    [
      {
        content: "支持移动端",
        created_at: "2023-06-01",
      },
      {
        content: "多写点rpc相关的啊",
        created_at: "2022-02-27",
      }
    ]
)

function onSubmit() {
  Message.success("提交成功，感谢反馈");
}


</script>

<template>
  <div class="gvb_feed_back">
    <a-form :model="form" :label-col-props="{span:0}" :wrapper-col-props="{span:24}">
      <a-form-item field="email"
                   :rules="[{required:true,message:'请输入邮箱',type:'string'},{message:'邮箱格式不正确',type:'email'}]"
                   :validate-trigger="['blur']"
      >

        <a-input placeholder="请输入邮箱" v-model="form.email"></a-input>
      </a-form-item>

      <a-form-item>
        <a-textarea :rules="[{required:true,message:'请输入反馈内容',type:'string'}]"
                    :validate-trigger="['blur']"
                    placeholder="请输入反馈内容"
                    field="content"
                    :autosize="{minRows: 5, maxRows: 6}"
                    v-model="form.content"></a-textarea>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" style="width: 100%" @click="onSubmit">发布</a-button>
      </a-form-item>
    </a-form>

    <div class="feed_back_list">
      <div class="title">反馈列表</div>
      <div class="list">
        <div class="item" v-for="item in list">
          <div class="content">
            {{ item.content }}
          </div>
          <div class="date">
            {{ dateFormat(item.created_at) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gvb_feed_back {
  .feed_back_list {
    color: var(--color-text-2);

    .title {
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &::before {
        display: inline-flex;
        width: 35%;
        height: 1px;
        content: "";
        background-color: var(--color-text-4);
      }

      &::after {
        display: inline-flex;
        width: 35%;
        height: 1px;
        content: "";
        background-color: var(--color-text-4);
      }
    }

    .list {
      margin-top: 20px;

      .item {
        margin-bottom: 10px;
        padding: 20px;
        border-radius: 5px;
        background-color: var(--color-fill-2);
        display: flex;
        justify-content: space-between;
        font-size: 14px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
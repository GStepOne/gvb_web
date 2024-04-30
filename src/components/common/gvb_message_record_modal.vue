<script setup lang="ts">
import gvb_message_record from "@/components/common/gvb_message_record.vue";
import {useStore} from "@/stores";
import {nextTick, ref, watch} from "vue";

const store = useStore();
const sendUserId = ref<number>(0)
const revUserId = ref<number>(0)

interface Props {
  visible: boolean | undefined;
  userId: number;
  nickname: string;
}

const props = defineProps<Props>()

watch(() => props.userId, () => {
  if (props.userId !== 0) {
    revUserId.value = props.userId
    sendUserId.value = store.userInfo.userId
  }
})


const emits = defineEmits(["update:visible", "close"])

function close() {
  emits("update:visible", false)
  emits("close")
}

const title = ref("聊天")
watch(() => props.nickname, () => {
  title.value = "与" + props.nickname + "聊天"
})
import {Modal, Input, Button, Checkbox} from "@arco-design/web-vue";

const messageRecordRef = ref()

function getData() {
  nextTick(() => {
    messageRecordRef.value.getRecordData()
  })
}

defineExpose({
  getData
})

</script>

<template>
  <Modal
      :title="title"
      width="40%"
      :visible="props.visible"
      :footer="false"
      @cancel="close"
      body-class="gvb_message_record_modal_body">
    <gvb_message_record
        :userId="props.userId"
        :rev_user_id="revUserId"
        :send_user_id="sendUserId"
        :nickname=nickname
        ref="messageRecordRef"
    ></gvb_message_record>
  </Modal>
</template>

<style scoped lang="scss">
.gvb_message_record_modal_body {
  padding: 0;
}
</style>
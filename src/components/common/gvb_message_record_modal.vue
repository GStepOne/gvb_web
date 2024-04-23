<script setup lang="ts">
import gvb_message_record from "@/components/common/gvb_message_record.vue";
import {useStore} from "@/stores";
import {ref, watch} from "vue";

const store = useStore();
const sendUserId = ref<number>(0)
const revUserId = ref<number>(0)

interface Props {
  visible: boolean;
  userId: number;
}
const props = defineProps<Props>()

watch(() => props.userId, () => {
  if (props.userId !== 0) {
    revUserId.value = props.userId
    sendUserId.value = store.userInfo.userId
  }
})


const emits = defineEmits(["update:visible"])

function close() {
  emits("update:visible", false)
}
</script>

<template>
  <a-modal  title="聊天" :visible="props.visible" :footer="false" @cancel="close"
           body-class="gvb_message_record_modal_body">
    <gvb_message_record :userId="props.userId" :rev_user_id="revUserId" :send_user_id="sendUserId"></gvb_message_record>
  </a-modal>
</template>

<style scoped lang="scss">
.gvb_message_record_modal_body {
  padding: 0;
}
</style>
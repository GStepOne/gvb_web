import {defineComponent, h, createApp, ref} from "vue";
import Gvb_message_record_modal from "@/components/common/gvb_message_record_modal.vue";

const visible = ref<undefined | boolean>(undefined)

const userIdRef = ref<number>(0)
const nicknameRef = ref<string>("")

const messageRecordRef = ref()

export function showMessageRecord(userId: number, nickname: string) {

    if (visible.value === undefined) {
        const component = defineComponent({
            setup() {
                const onClose = () => {
                    visible.value = false
                }
                return {visible, onClose, userIdRef, nicknameRef}
            },
            render() {
                return h(Gvb_message_record_modal, {
                    visible: visible.value,
                    nickname: this.nicknameRef,
                    userId: this.userIdRef,
                    onClose: this.onClose,
                    ref: messageRecordRef,
                })
            }
        })

        const app = createApp(component)
        const div = document.createElement("div")
        app.mount(div)
        document.body.appendChild(div)
    }

    if (userId == userIdRef.value) {
        //id一致的时候 请求
        messageRecordRef.value.getData()
    }
    visible.value = true
    userIdRef.value = userId
    nicknameRef.value = nickname
    //为什么请求两次，userid 变化了


}
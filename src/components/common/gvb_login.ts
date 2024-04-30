import {defineComponent, h, createApp, ref} from "vue";
import Gvb_login from "@/components/common/gvb_login.vue";

const visible = ref<undefined | boolean>(undefined)

export function showLogin() {
    if (visible.value === undefined) {
        const component = defineComponent({
            setup() {
                const onClose = () => {
                    visible.value = false
                }

                return {visible, onClose}
            },
            render() {
                return h(Gvb_login, {
                    visible: this.visible,
                    onClose: this.onClose
                })
            }
        })

        const app = createApp(component)
        const div = document.createElement("div")
        app.mount(div)
        document.body.appendChild(div)
    }
    visible.value = true
}
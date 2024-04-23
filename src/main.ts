import {createApp} from 'vue'
import {createPinia} from 'pinia'
import "@/assets/base.css" //引入css
import "@/assets/theme.css"
import ArcroVue from '@arco-design/web-vue'
import App from './App.vue'
import router from './router'
import '@arco-design/web-vue/dist/arco.css'
// 引入awesome
import 'font-awesome/css/font-awesome.min.css'
const app = createApp(App)
app.use(ArcroVue)
app.use(createPinia())
app.use(router)

app.mount('#app')

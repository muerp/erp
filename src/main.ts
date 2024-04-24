import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
// import ErpUI from '../src'
const app = createApp(App).use(router)
app.use(ElementPlus);
// app.use(ErpUI);
app.mount('#app')

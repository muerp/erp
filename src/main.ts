import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import ErpUI from '@muerp/ui'
import 'element-plus/dist/index.css'
import '@muerp/ui/dist/index.css'
import './assets/css/root.scss'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'virtual:svg-icons-register';
import SvgIcon from './components/SvgIcon.vue'

import registerDirective from './directive'

const app = createApp(App).use(router)
registerDirective(app);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('SvgIcon', SvgIcon);
app.use(ElementPlus);
app.use(ErpUI);
app.mount('#app')

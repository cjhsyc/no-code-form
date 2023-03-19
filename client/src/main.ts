import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// 路由
import router from './router'

// 基础样式
import './styles/base.css'

// 组件
import * as ElementPlusComponents from '@/element-plus'
// 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 注册element-plus组件
for (const [key, component] of Object.entries(ElementPlusComponents)) {
  app.component(key, component)
}
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)

app.mount('#app')

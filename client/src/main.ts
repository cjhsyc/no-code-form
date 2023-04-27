import { createApp } from 'vue'
import { pinia } from '@/stores'

import App from './App.vue'
// 路由
import router from './router'

// 基础样式
import './styles/base.css'

// 组件
import * as ElementPlusComponents from '@/element-plus'
// 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 二次封装的素材组件
import widgets from '@/materials/widgets'
// 属性设置器
import setters from '@/materials/setters'

const app = createApp(App)

// 注册element-plus组件
for (const [key, component] of Object.entries(ElementPlusComponents)) {
  app.component(key, component)
}
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册所有二次封装的素材组件
app.use(widgets)
// 注册所有属性设置器组件
app.use(setters)

app.use(pinia)
app.use(router)

app.mount('#app')

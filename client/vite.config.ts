import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue vue-router pinia 相关函数
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [
        // 自动导入 Element Plus 方法
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'i'
        })
      ]
    }),
    // 默认自动导入 src/components 下的组件
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      // 从 @iconify-json 自动安装图标集
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

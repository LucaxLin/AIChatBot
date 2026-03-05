import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import UnoCss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import vue from '@vitejs/plugin-vue'

export default () => {
  return defineConfig({
    plugins: [
      UnoCss(),
      AutoImport({
        imports: ['vue'],
        dts: 'src/types/auto-imports.d.ts',
        eslintrc: {
          enabled: true // 是否自动修复
        }
      }),
      VueRouter({
        routesFolder: 'src/views',
        extensions: ['.vue'], // 需要扫描的文件扩展名，默认为 ['.vue']
        dts: 'src/types/typed-router.d.ts' // 可选：生成类型声明文件，提升IDE类型提示体验
      }),
      Components({
        dts: 'src/types/components.d.ts'
      }),
      vue()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]'
        }
      }
    }
  })
}

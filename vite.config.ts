import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import stringHash from 'string-hash'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'; 
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
console.log('monacoEditorPlugin', monacoEditorPlugin)
export default defineConfig({
  base: '/erp',// 强制预构建插件包
//   optimizeDeps: {
//    include: [
//      `monaco-editor/esm/vs/language/json/json.worker`,
//      `monaco-editor/esm/vs/language/css/css.worker`,
//      `monaco-editor/esm/vs/language/html/html.worker`,
//      `monaco-editor/esm/vs/language/typescript/ts.worker`,
//      `monaco-editor/esm/vs/editor/editor.worker`
//    ], 
//  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[name]'
    }),
    (monacoEditorPlugin as any).default({
      languageWorkers: ['editorWorkerService', 'json']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3002
  },
  css: {
    modules: {
      generateScopedName: (name, filename, css) => {
        const f = filename.split('?')[0].split('.')[0]
        const file = path.basename(f)
        const hash = stringHash(css).toString(36).substr(0, 5);
        return `${file}_${name}_${hash}`
      }
    }
  }
})

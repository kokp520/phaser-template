import { defineConfig } from 'vite'


// 使用vite的dev server only for example index
// 僅提供測試用 index.html example
// 要移除可以一併移除 example/index.ts
export default defineConfig({
    server: {
        open: true
    }
}) 
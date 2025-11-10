// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000, // Cấu hình cổng tại đây
//   },
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // vẫn giữ nguyên cho dev
    },
    base: '/', // quan trọng: đảm bảo tất cả route map về index.html
    build: {
        outDir: 'dist', // thư mục output cho Vercel
    },
})

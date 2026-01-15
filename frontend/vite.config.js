import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Vite 프로젝트 설정 파일입니다.
export default defineConfig({
  // React 플러그인을 사용하여 React 전용 기능(JSX 변환, Fast Refresh 등)을 활성화합니다.
  plugins: [react()],
})

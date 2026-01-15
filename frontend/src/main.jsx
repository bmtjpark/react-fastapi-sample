import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// React root를 생성하고 HTML의 'root' id를 가진 요소에 React 앱을 렌더링합니다.
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode는 개발 모드에서 잠재적인 문제를 감지하기 위한 도구입니다. 
  // 개발 중에는 컴포넌트를 두 번 렌더링하여 부작용을 검사합니다.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

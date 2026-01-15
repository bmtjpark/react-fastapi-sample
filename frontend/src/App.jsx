// React 패키지에서 상태 관리(useState)와 사이드 이펙트 관리(useEffect) 훅을 가져옵니다.
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // 백엔드에서 받아온 메시지를 저장할 상태 변수 선언
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  const fetchGreeting = () => {
    fetch(`http://127.0.0.1:8000/api/hello?name=${name}`)
      .then(response => response.json()) // 응답을 JSON 형식으로 파싱
      .then(data => {
        setMessage(data.message); // 파싱된 데이터의 message 필드로 상태 업데이트
        toast.success("성공적으로 데이터를 가져왔습니다!");
      })
      .catch(error => {
        console.error('Error fetching data:', error); // 에러 발생 시 콘솔에 출력
        toast.error("오류가 발생했습니다.");
      });
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', textAlign: 'center', marginTop: '50px' }}>
      <h1>React + FastAPI Sample</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button
          onClick={fetchGreeting}
          style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px', cursor: 'pointer' }}
        >
          전송
        </button>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', display: 'inline-block', minWidth: '300px' }}>
        <p>Backend says:</p>
        <h2 style={{ color: '#0070f3' }}>{message || '이름을 입력하고 전송 버튼을 누르세요'}</h2>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  )
}

export default App

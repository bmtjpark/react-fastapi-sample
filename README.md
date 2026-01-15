# React + FastAPI Sample Application

이 프로젝트는 React(Frontend)와 FastAPI(Backend)를 연동하는 기본적인 Hello World 예제입니다.

## 📂 프로젝트 구조

```
root/
├── api/             # Backend (FastAPI)
│   ├── main.py      # 메인 진입점 및 API 정의
│   └── requirements.txt # Python 의존성 목록
└── frontend/        # Frontend (React + Vite)
    ├── src/         # React 소스 코드
    └── package.json # pnpm 의존성 및 스크립트
    └── vite.config.js # Vite 설정
```

## 🚀 실행 방법

### 1. Backend (FastAPI) 실행

1. `api` 폴더로 이동합니다.
2. 가상환경(.venv)을 생성하고 활성화하는 것을 권장합니다 (Windows 기준).
   > **가상환경이란?** 프로젝트별로 독립된 Python 패키지 실행 환경을 만들어, 다른 프로젝트와의 의존성 충돌을 방지합니다.

   **가상환경 생성:**
   ```powershell
   # 현재 폴더에 .venv 라는 이름의 가상환경 폴더 생성
   python -m venv .venv
   ```

   **가상환경 활성화 (Activate):**
   ```powershell
   # PowerShell
   .\.venv\Scripts\Activate.ps1

   # Command Prompt (cmd)
   .\.venv\Scripts\activate.bat
   ```
   > *Tip: PowerShell에서 "스크립트 실행 권한" 오류가 발생하면 `Set-ExecutionPolicy ExecutionPolicy RemoteSigned -Scope CurrentUser` 를 관리자 권한 없이 실행해 보세요.*

   **가상환경 비활성화 (Deactivate):**
   ```powershell
   # 가상환경 사용을 종료할 때
   deactivate
   ```
3. 의존성을 설치합니다.
   ```bash
   pip install -r requirements.txt
   ```
4. 서버를 실행합니다.
   ```bash
   uvicorn main:app --reload
   ```
   - 서버는 `http://127.0.0.1:8000` 에서 실행됩니다.
   - API 문서는 `http://127.0.0.1:8000/docs` 에서 확인할 수 있습니다.

### 2. Frontend (React) 실행

**pnpm 소개 및 npm과의 차이점**

pnpm은 npm보다 빠르고 디스크 공간을 효율적으로 사용하는 패키지 매니저입니다.

| 특성 | npm | pnpm |
| :--- | :--- | :--- |
| **디스크 공간** | 프로젝트마다 중복 저장 (비효율적) | 전역 저장소 공유 (효율적) |
| **설치 속도** | 보통 | 매우 빠름 |
| **node_modules 구조** | 평탄화 (Flat) | 중첩 및 심볼릭 링크 |
| **안전성** | 유령 의존성 발생 가능 | 엄격한 접근 제어 |

**pnpm 설치 (필요 시):**
```bash
npm install -g pnpm
```

1. 새로운 터미널을 열고 `frontend` 폴더로 이동합니다.
2. 의존성을 설치합니다.
   ```bash
   pnpm install
   ```
3. 개발 서버를 실행합니다.
   ```bash
   pnpm dev
   ```
   > **💡 컴파일 및 실행 과정 상세:**
   > - **사전 번들링 (Pre-bundling)**: `pnpm dev`를 실행하면, Vite는 먼저 `esbuild`(매우 빠른 Go 기반 빌드 도구)를 사용하여 `node_modules`의 의존성 패키지들을 브라우저가 이해할 수 있는 형태로 미리 컴파일합니다.
   > - **On-demand Serving**: 전체 소스 코드를 한 번에 번들링하는 Webpack과 달리, Vite는 브라우저가 특정 페이지나 모듈을 요청할 때(on-demand) 해당 파일만 즉시 컴파일(JSX → JS 변환 등)하여 전달합니다.
   > - **Native ESM**: 최신 브라우저의 기본 모듈 시스템(ES Modules)을 그대로 활용하여 개발 서버 구동 속도와 갱신 속도(HMR)가 획기적으로 빠릅니다.
   >
   > **📂 컴파일 결과물 (`pnpm build` 실행 시):**
   > - **출력 경로**: `frontend/dist/`
   > - **생성 파일**:
   >   - `index.html`: 공백 제거 및 최적화된 HTML 진입점.
   >   - `assets/index-[hash].js`: React 앱 코드와 라이브러리가 하나로 번들링된 JS 파일.
   >   - `assets/index-[hash].css`: 앱의 모든 스타일이 병합된 CSS 파일.
   > - *주의: 개발 서버(`pnpm dev`)는 파일을 메모리에서 제공하므로, 위 파일들이 디스크에 생성되지 않습니다.*

4. 브라우저에서 터미널에 표시된 주소(보통 `http://localhost:5173`)를 엽니다.

## 📝 소스 설명

### Backend (`api/main.py`)
- **FastAPI**: Python 기반의 고성능 웹 프레임워크입니다.
- **CORS 설정**: Frontend(포트 5173)에서 Backend(포트 8000)로의 요청을 허용하기 위해 `CORSMiddleware`를 사용했습니다.
- **Endpoint**: `/api/hello` 경로로 GET 요청을 받으며, `name` 쿼리 파라미터를 처리하여 인사말을 반환합니다.

### Frontend Structure

#### 1. Entry Point (`frontend/index.html`)
- **역할**: 애플리케이션의 진입점(Entry Point)이 되는 HTML 파일입니다.
- **Root Element**: `<div id="root"></div>` 요소가 있으며, React 앱이 이 곳에 마운트(렌더링)됩니다.
- **Module Script**: `<script type="module" src="/src/main.jsx"></script>`를 통해 JavaScript 진입점 파일을 로드합니다. Vite는 이 파일을 시작점으로 의존성을 분석하고 번들링합니다.

#### 2. React Bootstrapping (`frontend/src/main.jsx`)
- **역할**: React 애플리케이션을 초기화하고 실제 DOM에 연결하는 역할을 합니다.
- **createRoot**: `index.html`에 정의된 `root` DOM 요소를 찾아 React 루트(Root)를 생성합니다.
- **StrictMode**: `<React.StrictMode>`로 앱을 감싸, 개발 모드에서 잠재적인 문제(부작용 등)를 감지하고 경고를 출력합니다.
- **Rendering**: 메인 컴포넌트인 `<App />`을 렌더링하여 화면에 표시합니다.

#### 3. Main Component (`frontend/src/App.jsx`)
- **역할**: 사용자가 상호작용하는 실제 UI 화면을 구성하는 최상위 컴포넌트입니다.
- **React Hooks**: `useState`로 이름 입력값(`name`)과 백엔드 응답 메시지(`message`) 상태를 관리합니다.
- **Event Handling**: '전송' 버튼 클릭 이벤트를 감지하여 `fetchGreeting` 함수를 실행합니다.
- **API Communication**: `fetch` API를 사용하여 Backend(`http://127.0.0.1:8000/api/hello`)에 비동기 요청을 보내고 응답을 처리합니다.
- **Rendering**: 입력 폼과 결과 메시지를 JSX 문법으로 정의하여 화면에 그립니다.

#### 4. Frontend Config (`frontend/vite.config.js`)
- **역할**: Vite 빌드 도구의 설정 파일입니다. 플러그인(React 등), 개발 서버 설정(포트, Proxy), 빌드 옵션 등을 정의합니다.
- **실행 시점**: `pnpm dev`(개발 서버 시작) 또는 `pnpm build`(배포용 빌드) 명령어를 실행할 때 자동으로 로드되어 적용됩니다.

## 🔄 호출 흐름

1. 사용자가 브라우저를 통해 **Frontend (`localhost:5173`)** 에 접속합니다.
2. 사용자가 입력창에 **이름**을 입력하고 **전송** 버튼을 클릭합니다.
3. 브라우저는 **Backend (`localhost:8000/api/hello?name=입력값`)** 로 비동기 HTTP GET 요청을 보냅니다.
4. **FastAPI** 서버는 요청을 받아 처리하고, `{"message": "입력값님 안녕하세요"}` 포맷의 JSON 응답을 보냅니다.
5. **React App**은 응답을 받아 `setMessage`를 통해 상태를 업데이트합니다.
6. 화면에 Backend에서 온 인사말 메시지가 표시됩니다.

## 🛠️ Frontend 기능 추가 가이드 (라이브러리 추가 예시)

새로운 기능을 추가하기 위해 외부 라이브러리가 필요한 경우, 일반적으로 **라이브러리 설치 -> 소스 코드 구현 -> 테스트**의 순서로 진행합니다.

여기서는 예시로 **알림 팝업(Toast Notification)** 기능을 추가하는 과정을 통해 설명합니다.

### 1단계: 라이브러리 추가 및 설치

라이브러리를 추가하는 방법은 두 가지가 있습니다.

**방법 A: 터미널 명령어 사용 (권장)**
가장 간편한 방법으로, 명령어를 실행하면 `package.json` 수정과 `pnpm install` 과정이 자동으로 수행됩니다.
```bash
# frontend 폴더로 이동
cd frontend

# react-toastify 라이브러리 설치 (package.json에 자동 추가됨)
pnpm add react-toastify
```

**방법 B: `package.json` 직접 수정**
1. `frontend/package.json` 파일을 엽니다.
2. `dependencies` 항목에 라이브러리와 버전을 직접 추가합니다.
   ```json
   "dependencies": {
     "react": "^18.2.0",
     "react-toastify": "^9.1.3" // 추가
   }
   ```
3. 터미널에서 변경 사항을 적용하기 위해 설치 명령어를 실행합니다.
   ```bash
   pnpm install
   ```

### 2단계: 소스 코드 수정 (`frontend/src/App.jsx`)

설치한 라이브러리를 실제 코드에 적용합니다.

1. **Import 추가**: 사용할 컴포넌트와 스타일 파일을 파일 상단에 불러옵니다.
   ```jsx
   import { ToastContainer, toast } from 'react-toastify';
   import 'react-toastify/dist/ReactToastify.css';
   ```

2. **기능 구현**: 전송 버튼 클릭 후 응답 결과에 따라 알림을 띄우도록 `fetchGreeting` 함수를 수정합니다.
   ```jsx
   const fetchGreeting = () => {
     fetch(...)
       .then(response => {
           // ... 데이터 처리
           toast.success("성공적으로 데이터를 가져왔습니다!"); // 성공 알림 실행
       })
       .catch(error => {
           console.error(error);
           toast.error("오류가 발생했습니다."); // 실패 알림 실행
       });
   }
   ```

3. **컴포넌트 배치**: 알림 팝업이 화면에 나타날 수 있도록 JSX내에 `<ToastContainer />`를 배치합니다.
   ```jsx
   return (
     <div>
       {/* ... 기존 UI 코드 ... */}
       <ToastContainer position="bottom-center" />
     </div>
   )
   ```

### 3단계: 확인

개발 서버(`pnpm dev`)가 실행 중이라면 브라우저에서 기능을 테스트합니다. 이름을 입력하고 전송을 눌렀을 때 하단에 알림 팝업이 뜨는지 확인합니다.

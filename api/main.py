from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# FastAPI 애플리케이션 인스턴스 생성
app = FastAPI()

# CORS(Cross-Origin Resource Sharing) 설정
# React Vite의 기본 포트는 5173입니다. 
# 브라우저 보안 정책상 다른 출처(포트)에서의 요청을 허용하려면 허용된 출처 목록(origins)에 추가해야 합니다.
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# 미들웨어 추가: CORS 설정 적용
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,    # 허용할 출처 목록
    allow_credentials=True,   # 쿠키 등 인증 정보 포함 허용
    allow_methods=["*"],      # 허용할 HTTP 메서드 (GET, POST 등 전체 허용)
    allow_headers=["*"],      # 허용할 HTTP 헤더 (전체 허용)
)

# 루트 경로 ("/")에 대한 GET 요청 처리
@app.get("/")
def read_root():
    return {"message": "Hello World from FastAPI Root!"}

# "/api/hello" 경로에 대한 GET 요청 처리
# React 프론트엔드에서 이 엔드포인트를 호출합니다.
@app.get("/api/hello")
def read_hello(name: str = "World"):
    return {"message": f"{name}님 안녕하세요"}

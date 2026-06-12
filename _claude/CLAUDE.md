# lucky — 프론트엔드 CLAUDE.md

> 루트 원칙: [`../CLAUDE.md`](../CLAUDE.md) 를 먼저 읽는다.

---

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프레임워크 | Next.js (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS + shadcn/ui (`components.json`) |
| 백엔드 API | `http://localhost:8000` (개발) / Docker Compose 연결 |
| 배포 | Docker Compose (`lucky/Dockerfile`) |

---

## 디렉터리 구조

```
lucky/
├── app/               # Next.js App Router 페이지·레이아웃
├── components/        # 재사용 UI 컴포넌트
├── hooks/             # 커스텀 React 훅
└── lib/               # 유틸리티·API 클라이언트
```

---

## 백엔드 API 연동 규칙

- 모든 백엔드 API 경로는 `/api/` 접두사로 시작한다.
  - titanic: `/api/titanic/{name}/...`
  - fridge: `/inventory`, `/foods`, `/categories`, `/receipts`
- API 호출은 `lib/` 아래 클라이언트 모듈에서 관리한다. 컴포넌트에 직접 fetch 넣지 않는다.
- 인증이 필요한 fridge API는 `X-User-Email` 헤더를 포함한다.

---

## 컴포넌트 규칙

- shadcn/ui 컴포넌트를 우선 사용한다. 없을 때만 직접 작성한다.
- 컴포넌트는 단일 책임: UI 렌더링만 담당, 데이터 패칭은 훅·서버 컴포넌트에 위임.
- `"use client"` 는 필요한 경우에만 붙인다. 기본은 서버 컴포넌트.

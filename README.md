# AI Tool Archive

기획자, 디자이너, 개발자를 위한 **AI 툴 큐레이션 웹사이트 MVP**입니다. 카드 기반 목록에서 AI 툴을 카테고리별로 탐색하고, 평점/평가 수/댓글 수/최근 업데이트를 비교한 뒤 `/tools/[slug]` 상세 페이지에서 개요, 사용법 영상, 업데이트 히스토리, 리뷰를 확인할 수 있습니다.

## 기술 스택

- Next.js App Router
- npm 기준 설치 및 실행
- TypeScript
- Tailwind CSS
- Google Sheets API / public CSV fallback / seed data fallback
- Vercel 배포 기준

## 실행 방법

이 저장소는 Vercel 배포와 로컬 실행 모두 npm 기준으로 설정합니다. Node.js는 Next.js 16 기준으로 20.9 이상을 권장합니다.

### npm

```bash
npm install
npm run dev
```

### 검사용 명령어

```bash
npm run lint
npm run typecheck
npm run build
```

로컬 검증과 Vercel 배포는 `npm install`, `npm run dev`, `npm run build`를 기준으로 진행합니다.

### npm registry 403 진단

현재 컨테이너에서는 `curl -I https://registry.npmjs.org/next`와 npm 설치 요청이 proxy의 `403 Forbidden`을 반환할 수 있습니다. proxy를 제거하면 DNS 조회가 실패하므로, 이는 `package.json` 문제가 아니라 이 실행 환경의 외부 registry 접근 제한으로 판단됩니다. 로컬 또는 Vercel처럼 registry 접근이 허용된 환경에서는 아래 설정을 기준으로 설치하면 됩니다.

- `.npmrc`: `registry=https://registry.npmjs.org/`
- `package.json`: Next/React/Tailwind/TypeScript/ESLint 버전을 `latest`가 아닌 semver range로 명시

의존성을 설치할 수 있는 환경에서는 npm 기준 `package-lock.json` 생성을 권장합니다.

## 환경변수 설정

`.env.local` 예시:

```bash
GOOGLE_SHEETS_ID=10xqsKKL21u0WkFRqjUBjW2Gw_Tk24owzNTEZsFQnJTI
GOOGLE_SHEETS_API_KEY=사용자_입력_API_KEY
```

- `GOOGLE_SHEETS_API_KEY`가 있으면 Google Sheets API를 우선 사용합니다.
- API key가 없거나 실패하면 public CSV URL로 fallback합니다.
- API/CSV 모두 실패하면 `lib/data/seed.ts`의 mock seed data로 사이트가 깨지지 않게 렌더링합니다.

## Google Sheets 권장 컬럼 구조

### Sheet 1: `Tools`

| 필드 | 입력 형식 / 예시 | 설명 |
| --- | --- | --- |
| `tool_id` | `tool_chatgpt` | 고유 ID |
| `slug` | `chatgpt` | URL 공유용 slug |
| `tool_name` | `ChatGPT` | AI 이름 |
| `category` | `기획` / `디자인` / `개발` / `기타` | 1차 카테고리 |
| `sub_category` | `리서치`, `이미지`, `코드 작성` | 대표 세부 카테고리 |
| `category_paths` | `기획/리서치, 개발/코드 작성` | 여러 카테고리에 노출할 때 사용 |
| `tags` | `리서치, 문서 작성` | 기존 태그 입력값. 카드에는 `use_tags`가 우선 표시됩니다. |
| `use_tags` | `리서치, 문서 작성, PPT` | 카드/검색용 활용 태그. 비어 있으면 `tags`와 기존 `활용` 값을 정규화합니다. |
| `short_description` | 한 문장 | 카드용 기능 설명. Sheet 값이 최우선입니다. |
| `editor_quote` 또는 `one_liner` | 짧은 한줄평 | 카드와 상세 개요의 에디터 한줄평. 실제 운영 문구가 있을 때만 입력합니다. |
| `full_description` | 2~3문장 | 상세 페이지 개요 설명. Sheet 값이 최우선입니다. |
| `usage_steps` | `단계1 | 단계2 | 단계3` | 사용법 탭의 기본 사용 흐름. Sheet 값이 있으면 영상 유무와 관계없이 최우선 표시됩니다. |
| `recommended_use_cases` | `자료 조사, 문서 초안, 발표자료 구조화` | 추천 사용 업무 목록 |
| `recommended_users` | `기획자, 마케터, 팀 리드` | 추천 사용자 목록 |
| `strengths` | `출처 기반 검색, 최신 정보 파악` | 상세 페이지 장점 목록. 기존 `pros`도 호환됩니다. |
| `cautions` | `답변 검증 필요, 일부 출처 품질 확인 필요` | 상세 페이지 주의할 점 목록. 기존 `cons`도 호환됩니다. |
| `pricing` | `무료` / `부분 유료` / `유료` | 가격 정보 |
| `difficulty` | `쉬움`, `중급`, `초보자 추천` | 사용 난이도 |
| `korean_support` | `true`, `false`, `지원`, `예` | 한국어 지원 여부 |
| `official_url` | `https://...` | 공식 사이트 URL |
| `logo_url` | `https://...` | 로고 URL |
| `image_url` | `https://...` | 카드 이미지 URL |
| `youtube_url` | `https://youtu.be/...` | 사용법 영상 URL. 없으면 `usage_steps`만 표시합니다. |
| `youtube_summary` | `핵심1 | 핵심2 | 핵심3` | 영상 또는 사용법 핵심 요약 |
| `rating_average` | 실제 평균 평점 숫자 | 실제 사용자 평가가 있을 때만 입력합니다. 없으면 비워둡니다. |
| `rating_count` | 실제 평가 수 숫자 | 실제 사용자 평가가 있을 때만 입력합니다. 없으면 비워두며 UI는 “평가 전”으로 표시됩니다. |
| `comment_count` | 실제 댓글 수 숫자 | 실제 댓글 수가 있을 때만 입력합니다. 없으면 0으로 처리됩니다. |
| `popularity_score` | 운영자가 정한 수동 추천 점수 | 실제 사용량 데이터가 아닌 수동 추천 보정값입니다. |
| `last_update_date` | `2026-05-13` | 최신 업데이트 날짜 |
| `created_at` | `2026-05-13` | 등록일 |
| `is_featured` | `true` / `false` | 추천 노출 여부 |


### Sheet: `Core30_Content`

핵심 AI 30개의 카드/상세 콘텐츠는 `Core30_Content` 탭에서 보강할 수 있습니다. 메인 목록의 노출 수와 순서는 기존 `Tools` 탭을 기준으로 유지하고, `tool_name`이 일치하는 행이 있으면 아래 컬럼은 `Core30_Content` 값을 우선 사용합니다. `tool_name` 매칭은 공백과 대소문자 차이를 보정합니다.

| 필드 | 입력 형식 / 예시 | 우선 적용 대상 |
| --- | --- | --- |
| `tool_name` | `ChatGPT` | 기존 `Tools` 행과 병합할 기준 이름 |
| `official_url` | `https://...` | `Tools`의 URL이 비어 있을 때만 보조값으로 사용 |
| `category_paths` | `기획/리서치, 개발/코드 작성` | 카드/상세 카테고리 경로 |
| `use_tags` | `리서치, 문서 작성, PPT` | 카드 활용 태그와 검색 |
| `editor_quote` | 짧은 한줄평 | 카드/상세 한줄평 |
| `short_description` | 한 문장 | 카드 설명 |
| `full_description` | 2~3문장 | 상세 개요 |
| `recommended_use_cases` | `자료 조사, 문서 초안, 발표자료 구조화` | 추천 업무 |
| `recommended_users` | `기획자, 마케터, 팀 리드` | 추천 사용자 |
| `strengths` | `출처 기반 검색, 최신 정보 파악` | 상세 장점 |
| `cautions` | `답변 검증 필요, 일부 출처 품질 확인 필요` | 상세 주의할 점 |
| `usage_steps` | `단계1 | 단계2 | 단계3` | 사용법 탭 기본 흐름 |
| `youtube_url` | `https://youtu.be/...` | 사용법 영상 |
| `youtube_summary` | `핵심1 | 핵심2 | 핵심3` | 영상/사용법 요약 |
| `rating_average` | `0` 또는 실제 평균 평점 | 실제 평가가 없으면 `0` 유지 |
| `rating_count` | `0` 또는 실제 평가 수 | 실제 평가가 없으면 `0` 유지 |
| `comment_count` | `0` 또는 실제 댓글 수 | 실제 댓글이 없으면 `0` 유지 |
| `source_url` | `https://...` | 콘텐츠 출처 기록용. 현재 UI에는 표시하지 않습니다. |

병합 우선순위는 `Core30_Content` 값 → 기존 `Tools` 값 → seed/fallback 값입니다. 단, `Core30_Content`에 없는 AI를 새로 목록에 추가하지는 않습니다.

### Sheet 2: `Updates`

`update_id`, `tool_id`, `update_date`, `update_title`, `update_summary`, `work_impact`, `recommended_users`, `source_url`, `created_at`

### Sheet 3: `Reviews`

`review_id`, `tool_id`, `user_role`, `rating_total`, `rating_work_usefulness`, `rating_output_quality`, `rating_difficulty`, `rating_price`, `rating_korean_support`, `comment`, `helpful_count`, `approved`, `created_at`

### Sheet 4: `Categories`

`category_id`, `category_name`, `parent_category`, `sort_order`

## 데이터 추가 방법

1. Google Sheet에 위 컬럼명으로 시트를 추가하거나 기존 컬럼을 유지합니다.
2. 여러 값을 입력하는 컬럼은 쉼표(`,`), 파이프(`|`), 세미콜론(`;`), 줄바꿈으로 구분할 수 있습니다.
3. `lib/data/tools.ts`의 adapter가 `name`, `description`, `카테고리`, `editor_quote`, `one_liner` 같은 일부 기존 컬럼명도 자동 매핑합니다.
4. 새 툴은 `slug`와 `tool_id`를 명시하는 것을 권장합니다.
5. `rating_average`, `rating_count`, `comment_count`는 실제 사용자 평가/리뷰 데이터가 있을 때만 입력합니다. 비워두면 임의 평점 없이 “평가 전” 상태로 노출됩니다.
6. 업데이트 히스토리는 반드시 공식 출처 URL(`source_url`)을 함께 입력합니다.

## 정렬 정책

- 추천순: `rating_count`, `comment_count`, `rating_average`, `recent_update_bonus`, 수동 `popularity_score`를 함께 반영합니다.
- 실제 평가/댓글 데이터가 없으면 평점 관련 값은 0으로 유지하고, 수동 `popularity_score`와 업데이트 보너스만 추천 정렬에 반영됩니다.
- 최신 업데이트순: `last_update_date` 내림차순
- 평점순: `rating_average`에 `rating_count` 가중치를 반영해 표본이 너무 적은 툴의 우선순위를 낮춥니다.
- 댓글 많은 순: `comment_count` 내림차순
- 최근 등록순: `created_at` 내림차순

## Vercel 배포 방법

이 프로젝트는 `vercel.json`을 포함하고 있어 Vercel에서 Next.js 프로젝트로 자동 인식됩니다. 환경변수가 없어도 `lib/data/seed.ts`의 seed data로 메인/상세 화면이 렌더링되도록 설계되어 있습니다.

### Vercel 프로젝트 설정

- Framework Preset: `Next.js`
- Install Command: `npm install`
- Build Command: `npm run build`
- Development Command: `npm run dev`
- Output Directory: `.next`
- Node.js Version: `20.9` 이상

### 환경변수

Google Sheets를 연결하지 않아도 배포는 가능합니다. 연결하려면 Vercel Project Settings → Environment Variables에 아래 값을 추가하세요.

```bash
GOOGLE_SHEETS_ID=10xqsKKL21u0WkFRqjUBjW2Gw_Tk24owzNTEZsFQnJTI
GOOGLE_SHEETS_API_KEY=선택_값
```

- `GOOGLE_SHEETS_API_KEY`가 없으면 public CSV 방식을 시도합니다.
- API/CSV 접근이 실패하면 seed data로 fallback됩니다.
- Google Sheet가 비공개이면 API key 권한과 Sheets API 활성화를 확인해야 합니다.

### CLI 배포

Vercel CLI 또는 Codex Vercel plugin을 사용할 수 있는 환경에서는 아래처럼 배포할 수 있습니다.

```bash
vercel
# production 배포가 필요하면
vercel --prod
```

현재 Codex 컨테이너에서는 `npx plugins add vercel/vercel-plugin` 및 Vercel API/Registry 접근이 proxy `403 Forbidden`으로 차단되어 실제 preview URL 생성까지는 진행할 수 없었습니다. registry/API 접근이 허용된 CI 또는 로컬에서 위 설정으로 배포하면 preview URL이 생성됩니다.

## 향후 Supabase 이전 계획

현재 데이터 레이어는 `lib/data/*`와 `lib/googleSheets.ts`로 UI와 분리되어 있습니다. Supabase 이전 시 다음 순서로 교체하면 됩니다.

1. `tools`, `updates`, `reviews`, `categories` 테이블 생성
2. `lib/data/tools.ts`, `lib/data/updates.ts`, `lib/data/reviews.ts` 내부 fetch 구현을 Supabase query로 교체
3. `POST /api/reviews`에 `reviews.insert()` 연결
4. `POST /api/reviews/[reviewId]/helpful`에 중복 추천 방지 테이블 또는 RLS 정책 연결
5. 로그인 도입 시 localStorage 기반 추천 중복 방지를 사용자 ID 기반으로 전환

## 공식 업데이트 출처 원칙

업데이트 히스토리는 공식 블로그, 공식 release note, 공식 changelog, 공식 help center를 우선 사용합니다. 출처가 확인되지 않는 내용은 임의 작성하지 않고 **“공식 업데이트 출처 확인 필요”**로 표시해야 합니다. Seed 데이터도 `source_url` 필드를 반드시 포함하도록 구성되어 있습니다.

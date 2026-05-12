# AI Tool Archive

기획자, 디자이너, 개발자를 위한 **AI 툴 큐레이션 웹사이트 MVP**입니다. 카드 기반 목록에서 AI 툴을 카테고리별로 탐색하고, 평점/평가 수/댓글 수/최근 업데이트를 비교한 뒤 `/tools/[slug]` 상세 페이지에서 개요, 사용법 영상, 업데이트 히스토리, 리뷰를 확인할 수 있습니다.

## 기술 스택

- Next.js App Router
- pnpm 10.28.1 권장, npm/yarn 설치 지원
- TypeScript
- Tailwind CSS
- Google Sheets API / public CSV fallback / seed data fallback
- Vercel 배포 기준

## 실행 방법

이 저장소는 `packageManager`를 `pnpm@10.28.1`로 고정하고, npm/yarn도 같은 registry 설정으로 설치할 수 있게 `.npmrc`, `.yarnrc.yml`을 포함합니다. Node.js는 Next.js 16 기준으로 20.9 이상을 권장합니다.

### 권장: pnpm

```bash
corepack enable
pnpm install
pnpm dev
```

### npm

```bash
npm install
npm run dev
```

### yarn

```bash
corepack enable
yarn install
yarn dev
```

### 검사용 명령어

```bash
npm run lint
npm run typecheck
npm run build
```

동일한 스크립트는 `pnpm lint`, `pnpm typecheck`, `pnpm build` 또는 `yarn lint`, `yarn typecheck`, `yarn build`로도 실행할 수 있습니다.

### npm registry 403 진단

현재 컨테이너에서는 `curl -I https://registry.npmjs.org/next`와 npm/pnpm/yarn 설치 요청이 모두 proxy의 `403 Forbidden`을 반환했습니다. proxy를 제거하면 DNS 조회가 실패하므로, 이는 `package.json` 문제가 아니라 이 실행 환경의 외부 registry 접근 제한으로 판단됩니다. 로컬 또는 Vercel처럼 registry 접근이 허용된 환경에서는 아래 설정을 기준으로 설치하면 됩니다.

- `.npmrc`: `registry=https://registry.npmjs.org/`
- `.yarnrc.yml`: `npmRegistryServer: "https://registry.npmjs.org"`
- `package.json`: Next/React/Tailwind/TypeScript/ESLint 버전을 `latest`가 아닌 semver range로 명시

의존성을 설치할 수 있는 환경에서는 lockfile 생성을 권장합니다. pnpm 사용 시 `pnpm-lock.yaml`, npm 사용 시 `package-lock.json`, yarn 사용 시 `yarn.lock`을 생성해 커밋하세요.

## 환경변수 설정

`.env.local` 예시:

```bash
GOOGLE_SHEETS_ID=1_57qPpmnL66YndA1qJZRlnWzBjmNypxK_FsgyzNZPnc
GOOGLE_SHEETS_API_KEY=사용자_입력_API_KEY
```

- `GOOGLE_SHEETS_API_KEY`가 있으면 Google Sheets API를 우선 사용합니다.
- API key가 없거나 실패하면 public CSV URL로 fallback합니다.
- API/CSV 모두 실패하면 `lib/data/seed.ts`의 mock seed data로 사이트가 깨지지 않게 렌더링합니다.

## Google Sheets 권장 컬럼 구조

### Sheet 1: `Tools`

| 필드 | 설명 |
| --- | --- |
| `tool_id` | 고유 ID |
| `slug` | URL 공유용 slug |
| `tool_name` | AI 이름 |
| `category` | 기획 / 디자인 / 개발 / 기타 |
| `sub_category` | 리서치, 이미지, 코드 작성 등 |
| `tags` | 쉼표 또는 파이프 구분 태그 |
| `short_description` | 카드용 한 줄 설명 |
| `full_description` | 상세 페이지 개요 설명 |
| `recommended_use_cases` | 추천 업무 목록 |
| `recommended_users` | 추천 사용자 목록 |
| `pricing` | 무료 / 부분 유료 / 유료 |
| `difficulty` | 쉬움 / 중급 / 초보자 추천 등 |
| `korean_support` | true/false 또는 지원/미지원 |
| `official_url` | 공식 사이트 URL |
| `logo_url` | 로고 URL |
| `image_url` | 카드 이미지 URL |
| `youtube_url` | 사용법 영상 URL |
| `youtube_summary` | 사용법 핵심 요약 |
| `rating_average` | 평균 평점 |
| `rating_count` | 평가 수 |
| `comment_count` | 댓글 수 |
| `popularity_score` | 인기순 정렬 우선 점수 |
| `last_update_date` | 최신 업데이트 날짜 |
| `created_at` | 등록일 |
| `is_featured` | 추천 노출 여부 |

### Sheet 2: `Updates`

`update_id`, `tool_id`, `update_date`, `update_title`, `update_summary`, `work_impact`, `recommended_users`, `source_url`, `created_at`

### Sheet 3: `Reviews`

`review_id`, `tool_id`, `user_role`, `rating_total`, `rating_work_usefulness`, `rating_output_quality`, `rating_difficulty`, `rating_price`, `rating_korean_support`, `comment`, `helpful_count`, `approved`, `created_at`

### Sheet 4: `Categories`

`category_id`, `category_name`, `parent_category`, `sort_order`

## 데이터 추가 방법

1. Google Sheet에 위 컬럼명으로 시트를 추가하거나 기존 컬럼을 유지합니다.
2. `lib/data/tools.ts`의 adapter가 `name`, `description`, `카테고리` 같은 일부 기존 컬럼명도 자동 매핑합니다.
3. 새 툴은 `slug`와 `tool_id`를 명시하는 것을 권장합니다.
4. 업데이트 히스토리는 반드시 공식 출처 URL(`source_url`)을 함께 입력합니다.

## 정렬 정책

- 인기순: `popularity_score`가 있으면 우선 사용합니다.
- `popularity_score`가 없으면 `rating_count * 0.25 + comment_count * 0.25 + rating_average * 20 + recent_update_bonus`로 계산합니다.
- 최신 업데이트순: `last_update_date` 내림차순
- 평점순: `rating_average`에 `rating_count` 가중치를 반영해 표본이 너무 적은 툴의 우선순위를 낮춥니다.
- 댓글 많은 순: `comment_count` 내림차순
- 최근 등록순: `created_at` 내림차순

## Vercel 배포 방법

이 프로젝트는 `vercel.json`을 포함하고 있어 Vercel에서 Next.js 프로젝트로 자동 인식됩니다. 환경변수가 없어도 `lib/data/seed.ts`의 seed data로 메인/상세 화면이 렌더링되도록 설계되어 있습니다.

### Vercel 프로젝트 설정

- Framework Preset: `Next.js`
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Development Command: `pnpm dev`
- Output Directory: `.next`
- Node.js Version: `20.9` 이상

### 환경변수

Google Sheets를 연결하지 않아도 배포는 가능합니다. 연결하려면 Vercel Project Settings → Environment Variables에 아래 값을 추가하세요.

```bash
GOOGLE_SHEETS_ID=1_57qPpmnL66YndA1qJZRlnWzBjmNypxK_FsgyzNZPnc
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

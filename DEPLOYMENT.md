# 🚀 포커 마스터 프로 배포 가이드

## Vercel 배포 (추천)

### 1. 사전 준비
```bash
# 프로젝트 빌드 테스트
npm run build

# 빌드된 파일 확인
npm run preview
```

### 2. Vercel 배포 방법

#### 방법 A: Vercel CLI 사용
```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 폴더에서 배포
vercel

# 첫 배포 시 질문들:
# ? Set up and deploy "poker-master-pro"? Y
# ? Which scope do you want to deploy to? (개인 계정 선택)
# ? Link to existing project? N
# ? What's your project's name? poker-master-pro
# ? In which directory is your code located? ./
# ? Want to override the settings? N
```

#### 방법 B: GitHub 연동 (더 추천)
1. GitHub에 코드 업로드
2. https://vercel.com 접속 → 로그인
3. "Import Project" → GitHub 저장소 선택
4. 자동 배포 완료!

### 3. 배포 URL
배포 완료 후 다음과 같은 URL을 받게 됩니다:
- `https://poker-master-pro-[random].vercel.app`

---

## Netlify 배포

### 1. 빌드 명령어 설정
```bash
# package.json에 다음이 있는지 확인
"scripts": {
  "build": "vite build",
  "preview": "vite preview"
}
```

### 2. Netlify 배포 방법

#### 방법 A: 드래그 & 드롭
```bash
# 빌드
npm run build

# dist 폴더를 https://app.netlify.com/drop 에 드래그
```

#### 방법 B: GitHub 연동
1. https://netlify.com 접속 → 로그인
2. "New site from Git" → GitHub 연결
3. 저장소 선택
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### 3. 배포 URL
- `https://[random-name].netlify.app`

---

## GitHub Pages 배포

### 1. GitHub Actions 설정
`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 2. vite.config.js 수정
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/poker-master-pro/', // GitHub 저장소 이름
})
```

### 3. GitHub Pages 활성화
1. GitHub 저장소 → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `gh-pages` 선택

### 4. 배포 URL
- `https://[username].github.io/poker-master-pro/`

---

## Firebase Hosting 배포

### 1. Firebase CLI 설치 및 설정
```bash
# Firebase CLI 설치
npm install -g firebase-tools

# Firebase 로그인
firebase login

# Firebase 프로젝트 초기화
firebase init hosting

# 설정:
# ? What do you want to use as your public directory? dist
# ? Configure as a single-page app? Yes
# ? Set up automatic builds and deploys with GitHub? No
```

### 2. 배포
```bash
# 빌드
npm run build

# 배포
firebase deploy
```

### 3. 배포 URL
- `https://[project-id].web.app`

---

## 💡 **추천 순서**

1. **Vercel** - 가장 쉽고 빠름
2. **Netlify** - 많은 기능과 좋은 성능
3. **GitHub Pages** - GitHub과 완전 통합
4. **Firebase** - Google 생태계 활용

## 🔧 **배포 전 체크리스트**

- [ ] `npm run build` 성공적으로 실행
- [ ] `npm run preview`로 로컬 테스트
- [ ] 환경변수 설정 (필요시)
- [ ] 도메인 설정 (필요시)

## 🌐 **커스텀 도메인 연결**

무료 도메인 서비스:
- **Freenom** (`.tk`, `.ml`, `.ga`)
- **GitHub Pages** + 무료 도메인
- **Cloudflare** DNS 관리

각 플랫폼에서 커스텀 도메인 설정 가능합니다!
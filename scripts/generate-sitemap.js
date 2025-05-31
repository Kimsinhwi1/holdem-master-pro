#!/usr/bin/env node

/**
 * 홀덤마스터 프로 - 사이트맵 자동 생성 스크립트
 * 실행: npm run sitemap
 */

const fs = require('fs');
const path = require('path');

// 사이트 기본 설정
const SITE_CONFIG = {
  baseUrl: 'https://holdem-master.com',
  lastmod: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
};

// 페이지 구조 정의
const PAGES = [
  // 메인 페이지들
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/play', priority: '0.9', changefreq: 'weekly' },
  
  // 학습 모드
  { url: '/training', priority: '0.8', changefreq: 'weekly' },
  { url: '/training/preflop', priority: '0.7', changefreq: 'monthly' },
  { url: '/training/postflop', priority: '0.7', changefreq: 'monthly' },
  { url: '/training/bluffing', priority: '0.7', changefreq: 'monthly' },
  { url: '/training/reading', priority: '0.7', changefreq: 'monthly' },
  { url: '/training/math', priority: '0.7', changefreq: 'monthly' },
  
  // 가이드 & 전략
  { url: '/guide', priority: '0.6', changefreq: 'weekly' },
  { url: '/guide/beginner', priority: '0.6', changefreq: 'monthly' },
  { url: '/guide/intermediate', priority: '0.6', changefreq: 'monthly' },
  { url: '/guide/advanced', priority: '0.6', changefreq: 'monthly' },
  { url: '/strategy', priority: '0.6', changefreq: 'weekly' },
  { url: '/strategy/preflop-charts', priority: '0.6', changefreq: 'monthly' },
  { url: '/strategy/position-play', priority: '0.6', changefreq: 'monthly' },
  { url: '/strategy/bankroll-management', priority: '0.6', changefreq: 'monthly' },
  
  // 도구 & 기능
  { url: '/calculator', priority: '0.5', changefreq: 'monthly' },
  { url: '/hand-ranking', priority: '0.5', changefreq: 'monthly' },
  { url: '/glossary', priority: '0.5', changefreq: 'monthly' },
  { url: '/faq', priority: '0.5', changefreq: 'monthly' },
  
  // 통계 & 프로필
  { url: '/stats', priority: '0.4', changefreq: 'daily' },
  { url: '/achievements', priority: '0.4', changefreq: 'weekly' },
  { url: '/leaderboard', priority: '0.4', changefreq: 'daily' },
  
  // 설정 & 기타
  { url: '/settings', priority: '0.3', changefreq: 'monthly' },
  { url: '/about', priority: '0.3', changefreq: 'yearly' },
  { url: '/privacy', priority: '0.2', changefreq: 'yearly' },
  { url: '/terms', priority: '0.2', changefreq: 'yearly' },
];

/**
 * XML 사이트맵 생성
 */
function generateSitemap() {
  console.log('🚀 사이트맵 생성 시작...');
  
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  const xmlFooter = `
</urlset>`;

  // URL 엔트리들 생성
  const urlEntries = PAGES.map(page => {
    return `  
  <url>
    <loc>${SITE_CONFIG.baseUrl}${page.url}</loc>
    <lastmod>${SITE_CONFIG.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  }).join('');

  const sitemapContent = xmlHeader + urlEntries + xmlFooter;
  
  // public 디렉토리에 저장
  const publicDir = path.join(process.cwd(), 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  // public 디렉토리가 없으면 생성
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('📁 public 디렉토리 생성');
  }
  
  // 사이트맵 파일 저장
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  
  console.log('✅ 사이트맵 생성 완료!');
  console.log(`📍 위치: ${sitemapPath}`);
  console.log(`📊 총 ${PAGES.length}개 페이지 포함`);
  console.log(`🌐 베이스 URL: ${SITE_CONFIG.baseUrl}`);
  console.log(`📅 마지막 수정일: ${SITE_CONFIG.lastmod}`);
}

/**
 * 사이트맵 유효성 검사
 */
function validateSitemap() {
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ 사이트맵 파일이 존재하지 않습니다.');
    return false;
  }
  
  const content = fs.readFileSync(sitemapPath, 'utf8');
  
  // 기본 XML 구조 검사
  if (!content.includes('<?xml') || !content.includes('<urlset')) {
    console.error('❌ 잘못된 XML 형식입니다.');
    return false;
  }
  
  // URL 개수 검사
  const urlCount = (content.match(/<url>/g) || []).length;
  if (urlCount !== PAGES.length) {
    console.error(`❌ URL 개수가 일치하지 않습니다. 예상: ${PAGES.length}, 실제: ${urlCount}`);
    return false;
  }
  
  console.log('✅ 사이트맵 유효성 검사 통과!');
  return true;
}

/**
 * 메인 실행 함수
 */
function main() {
  try {
    generateSitemap();
    validateSitemap();
    
    console.log('\n🎯 다음 단계:');
    console.log('1. Google Search Console에 사이트맵 등록');
    console.log('2. 네이버 웹마스터도구에 사이트맵 등록');
    console.log('3. robots.txt에서 사이트맵 URL 확인');
    console.log('\n📋 사이트맵 URL: https://holdem-master.com/sitemap.xml');
    
  } catch (error) {
    console.error('❌ 사이트맵 생성 중 오류 발생:', error.message);
    process.exit(1);
  }
}

// 스크립트가 직접 실행될 때만 main 함수 실행
if (require.main === module) {
  main();
}

module.exports = {
  generateSitemap,
  validateSitemap,
  PAGES,
  SITE_CONFIG
};
import { test, expect } from '@playwright/test';

test('홈페이지 스타일 및 리소스 로딩 진단', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => {
    errors.push(`Request failed: ${request.url()} - ${request.failure()?.errorText}`);
  });

  await page.goto('https://plango-zeta.vercel.app/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'homepage-diagnose.png', fullPage: true });

  // 주요 CSS 파일이 정상 로드됐는지 확인
  const stylesheets = await page.$$eval('link[rel=stylesheet]', links => links.map(l => l.getAttribute('href')));
  expect(stylesheets.length).toBeGreaterThan(0);

  // 에러가 있으면 출력
  if (errors.length > 0) {
    console.log('에러/실패:', errors);
  }
  expect(errors.length).toBe(0);
}); 
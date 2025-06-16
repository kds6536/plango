import { test, expect } from '@playwright/test';

test('홈페이지 시각적 요소 확인', async ({ page }) => {
  await page.goto('https://plango-zeta.vercel.app/');

  // 헤더, 주요 버튼, 텍스트 등 시각적 요소가 보이는지 확인
  await expect(page.locator('header')).toBeVisible();
  // 예시: 메인 타이틀, 주요 버튼 등
  // await expect(page.locator('text=로그인')).toBeVisible();
  // 필요시 전체 페이지 스크린샷 저장
  await page.screenshot({ path: 'homepage.png', fullPage: true });
}); 
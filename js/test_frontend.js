import { test, expect } from '@playwright/test';

test('Verify Navbar and Mass Percentage Calculator', async ({ page }) => {
  // Start server (assuming it's running on 8080)
  await page.goto('http://localhost:8080/');

  // 1. Check Navbar — verify page title element is present
  const pageTitle = await page.locator('#page-title');
  await expect(pageTitle).toBeVisible();
  console.log('Page title visible.');

  // Verify search container is centered
  const searchContainer = await page.locator('.search-container');
  const justifyContent = await searchContainer.evaluate((el) => {
    return window.getComputedStyle(el).justifyContent;
  });
  expect(justifyContent).toBe('center');
  console.log('Search container centered.');

  // 2. Navigate to Mass Percentage Calculator
  await page.fill('#calc-search', 'Mass Percentage');
  await page.waitForTimeout(1000); // Wait for debounce

  // Click the visible nav item
  const navItem = await page.locator('.nav-item').filter({ hasText: 'Mass Percentage Calculator' }).first();
  await navItem.click();

  // Wait for calculator content
  await page.waitForSelector('h3:has-text("Mass Percentage Calculator")');
  console.log('Calculator loaded.');

  // Check for "What is this?" button and click if exists
  const infoBtn = page.getByRole('button', { name: 'What is this?' });
  if (await infoBtn.count() > 0) {
    await infoBtn.click();
    await page.waitForSelector('.educational-section');
    console.log('Clicked "What is this?".');
  }

  // Allow MathJax to render
  await page.waitForTimeout(2000);

  // Take screenshot
  await page.screenshot({ path: 'verification.png', fullPage: true });
  console.log('Screenshot saved to verification.png');
});

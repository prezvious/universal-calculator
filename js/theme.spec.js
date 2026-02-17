import { test, expect } from '@playwright/test';

test('Verify Theme Selection', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  const settingsBtn = page.locator('#settings-btn');
  await settingsBtn.waitFor({ state: 'visible' });
  await settingsBtn.click();

  const modal = page.locator('#settings-modal');
  await expect(modal).toBeVisible();

  const enhancedCard = page.locator('[data-variant="enhanced"]');
  await enhancedCard.click();

  // Verify logic
  const variant = await page.evaluate(() => document.documentElement.getAttribute('data-variant'));
  expect(variant).toBe('enhanced');

  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  expect(theme).toBe('dark');

  // Close Modal
  await page.locator('#close-modal').click();

  // Wait for animation or class removal
  await expect(modal).not.toHaveClass(/active/);
});

import { test, expect } from '@playwright/test';

test('Página de ejemplo tiene el título correcto', async ({ page }) => {
  // Navega a una página de ejemplo
  await page.goto('https://example.com');

  // Verifica que el título sea correcto
  const title = await page.title();
  expect(title).toBe('Example Domain');
});

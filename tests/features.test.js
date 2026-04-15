import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`Console error detected: ${msg.text()}`);

      throw new Error(`Console error detected: ${msg.text()}`);
    }
  });
});

test.describe('scroll feature test', () => {
  test('weapon to +1', async ({ page }) => {
    await page.goto('http://localhost:5173/#/pageGame');
    await expect(page.getByRole('figure', { name: '對武器施法的卷軸 能增加武器的攻擊力' }).getByRole('img')).toBeVisible();
    await page.getByRole('figure', { name: '對武器施法的卷軸 能增加武器的攻擊力' }).getByRole('img').click();
    await expect(page.locator('[id="🧱UIChat"]')).toContainText('請選擇一種武器。');
    await expect(page.locator('[id="🧱StatusEquips__Equip"]').first()).toBeVisible();
    await page.locator('[id="🧱StatusEquips__Equip"]').first().click();
    await expect(page.locator('[id="🧱UIChat"]')).toContainText('+0 瑟魯基之劍 一瞬間發出 藍色的 光芒。');
  });

  test('weapon to -1', async ({ page }) => {
    await page.goto('http://localhost:5173/#/pageGame');
    await expect(page.locator('.F12 > img')).toBeVisible();
    await page.locator('.F12 > img').click();
    await expect(page.locator('[id="🧱UIChat"]')).toContainText('請選擇一種武器。');
    await expect(page.locator('[id="🧱StatusEquips__Equip"]').first()).toBeVisible();
    await page.locator('[id="🧱StatusEquips__Equip"]').first().click();
    await expect(page.locator('[id="🧱UIChat"]')).toContainText('+0 瑟魯基之劍 一瞬間發出 黑色的 光芒。');
  });

  test('armor to +1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByRole('figure', { name: '對盔甲施法的卷軸 能增加防具的防禦力' }).getByRole('img')).toBeVisible();
    await page.getByRole('figure', { name: '對盔甲施法的卷軸 能增加防具的防禦力' }).getByRole('img').click();
    await expect(page.locator('.armor.shield')).toBeVisible();
    await page.locator('.armor.shield').click();
    await expect(page.locator('[id="🧱UIChat"]')).toContainText('+0 精靈盾牌 一瞬間發出 銀色的 光芒。');
    await expect(page.locator('[id="🧱UINumbers__X2__Ac"]')).toContainText('-8');
  });

  test('armor to -1', async ({ page }) => {
    await page.goto('http://localhost:5173/#/pageGame');
    await expect(page.getByRole('figure', { name: '對盔甲施法的卷軸 強化成功可將裝備強化數值(-1)' }).getByRole('img')).toBeVisible();
    await page.getByRole('figure', { name: '對盔甲施法的卷軸 強化成功可將裝備強化數值(-1)' }).getByRole('img').click();
    await expect(page.locator('.armor.gloves')).toBeVisible();
    await page.locator('.armor.gloves').click();
    await expect(page.locator('[id="🧱UIChat"]')).toContainText('+0 力量手套 一瞬間發出 黑色的 光芒。');
    await expect(page.locator('[id="🧱UINumbers__X2__Ac"]')).toContainText('-6');
  });
})
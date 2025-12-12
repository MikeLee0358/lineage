import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`Console error detected: ${msg.text()}`);

      throw new Error(`Console error detected: ${msg.text()}`);
    }
  });
});

test.describe('mouse scroll testing', () => {
  test('F5 stop function test', async ({ page }) => {
    await page.goto('http://localhost:5173/#/');
    await page.getByRole('figure', { name: '對盔甲施法的卷軸 能增加防具的防禦力' }).getByRole('img').click();
    await page.locator('img').first().click();
    await page.locator('li:nth-child(9)').click();
    await expect(page.locator('[id="🏠game-demo__X2"]')).toContainText('請選擇一種防具。');
  });

  test('F9 stop function test', async ({ page }) => {
    await page.goto('http://localhost:5173/#/');
    await page.getByRole('figure', { name: '對盔甲施法的卷軸 能增加防具的防禦力' }).getByRole('img').click();
    await page.locator('img').first().click();
    await page.locator('li:nth-child(10)').click();
    await expect(page.locator('[id="🏠game-demo__X2"]')).toContainText('請選擇一種防具。');
  });

  test('armor to +1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('figure', { name: '對盔甲施法的卷軸 能增加防具的防禦力' }).getByRole('img').click();
    await expect(page.locator('[id="🏠game-demo__X2"]')).toContainText('請選擇一種防具。');
    await page.locator('li:nth-child(9)').click();
    await expect(page.locator('id=🏠game-demo__X2')).toContainText('+0 精靈盾牌 一瞬間發出 銀色的 光芒。');
    await expect(page.locator('[id="🧱UINumbers__X2__Ac"]')).toContainText('-8');
    await expect(page.locator('[id="🧱StatusNumbers__X2__Ac"]:nth-of-type(3)')).toContainText('-8');
  });

  test('armor to -1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('figure', { name: '對盔甲施法的卷軸 強化成功可將裝備強化數值(-1)' }).getByRole('img').click();
    await expect(page.locator('[id="🏠game-demo__X2"]')).toContainText('請選擇一種防具。');
    await page.locator('li:nth-child(10)').click();
    await expect(page.locator('id=🏠game-demo__X2')).toContainText('+0 力量手套 一瞬間發出 黑色的 光芒。');
    await expect(page.locator('[id="🧱UINumbers__X2__Ac"]')).toContainText('-6');
    await expect(page.locator('[id="🧱StatusNumbers__X2__Ac"]:nth-of-type(3)')).toContainText('-6');
  });

  test('weapon to +1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('figure', { name: '對武器施法的卷軸 能增加武器的攻擊力' }).getByRole('img').click();
    await expect(page.locator('[id="🏠game-demo__X2"]')).toContainText('請選擇一種武器。');
    await page.locator('[id="🧱StatusEquips__Equip"]').first().click();
    await expect(page.locator('id=🏠game-demo__X2')).toContainText('+0 瑟魯基之劍 一瞬間發出 藍色的 光芒。');
  });

  test('weapon to -1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('figure', { name: '對武器施法的卷軸 強化成功可將武器強化數值(-1)' }).getByRole('img').click();
    await expect(page.locator('[id="🏠game-demo__X2"]')).toContainText('請選擇一種武器。');
    await page.locator('[id="🧱StatusEquips__Equip"]').first().click();
    await expect(page.locator('id=🏠game-demo__X2')).toContainText('+0 瑟魯基之劍 一瞬間發出 黑色的 光芒。');
  })
})
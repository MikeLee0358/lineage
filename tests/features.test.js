import { test, expect } from '@playwright/test';

test.describe('mouse scroll testing', () => {
  test('F5 stop function test', async ({ page }) => {
    await page.goto('http://localhost:5173/#/');
    await page.getByRole('figure', { name: '對盔甲施法的卷軸 能增加防具的防禦力' }).getByRole('img').click();
    await page.locator('img').first().click();
    await page.locator('li:nth-child(9)').click();
    await expect(page.locator('[id="⭐SinglePlayer__PanelUI"]')).toContainText('請選擇一種防具。');
  });

  test('F9 stop function test', async ({ page }) => {
    await page.goto('http://localhost:5173/#/');
    await page.getByRole('figure', { name: '對盔甲施法的卷軸 能增加防具的防禦力' }).getByRole('img').click();
    await page.locator('img').first().click();
    await page.locator('li:nth-child(10)').click();
    await expect(page.locator('[id="⭐SinglePlayer__PanelUI"]')).toContainText('請選擇一種防具。');
  });

  test('armor to +1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('figure', { name: '對盔甲施法的卷軸 能增加防具的防禦力' }).getByRole('img').click();
    await expect(page.locator('[id="⭐SinglePlayer__PanelUI"]')).toContainText('請選擇一種防具。');
    await page.locator('li:nth-child(9)').click();
    await expect(page.locator('id=⭐SinglePlayer__PanelUI')).toContainText('+0 精靈盾牌 一瞬間發出 銀色的 光芒。');
    await expect(page.locator('[id="🔥NumbersUI__Line2__Ac"]')).toContainText('-8');
    await expect(page.locator('[id="🔥StatusNumbers__Basic__Li"]:nth-of-type(3)')).toContainText('-8');
  });

  test('armor to -1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('figure', { name: '對盔甲施法的卷軸 強化成功可將裝備強化數值(-1)' }).getByRole('img').click();
    await expect(page.locator('[id="⭐SinglePlayer__PanelUI"]')).toContainText('請選擇一種防具。');
    await page.locator('li:nth-child(10)').click();
    await expect(page.locator('id=⭐SinglePlayer__PanelUI')).toContainText('+0 力量手套 一瞬間發出 黑色的 光芒。');
    await expect(page.locator('[id="🔥NumbersUI__Line2__Ac"]')).toContainText('-6');
    await expect(page.locator('[id="🔥StatusNumbers__Basic__Li"]:nth-of-type(3)')).toContainText('-6');
  });

  test('weapon to +1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('figure', { name: '對武器施法的卷軸 能增加武器的攻擊力' }).getByRole('img').click();
    await expect(page.locator('[id="⭐SinglePlayer__PanelUI"]')).toContainText('請選擇一種武器。');
    await page.locator('[id="🔥StatusEquips__Equip"]').first().click();
    await expect(page.locator('id=⭐SinglePlayer__PanelUI')).toContainText('+0 瑟魯基之劍 一瞬間發出 藍色的 光芒。');
  });


  test('weapon to -1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('figure', { name: '對武器施法的卷軸 強化成功可將武器強化數值(-1)' }).getByRole('img').click();
    await expect(page.locator('[id="⭐SinglePlayer__PanelUI"]')).toContainText('請選擇一種武器。');
    await page.locator('[id="🔥StatusEquips__Equip"]').first().click();
    await expect(page.locator('id=⭐SinglePlayer__PanelUI')).toContainText('+0 瑟魯基之劍 一瞬間發出 黑色的 光芒。');
  })
})

test.describe('keyboard scroll testing', () => {
  test('keyboard F5 stop function test', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('body').press('F6');
    await page.locator('body').press('F5');
    await page.locator('li:nth-child(10)').click();
    await expect(page.locator('[id="⭐SinglePlayer__PanelUI"]')).toContainText('請選擇一種防具。');
  });

  test('keyboard F9 stop function test', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('body').press('F6');
    await page.locator('body').press('F9');
    await page.locator('li:nth-child(10)').click();
    await expect(page.locator('[id="⭐SinglePlayer__PanelUI"]')).toContainText('請選擇一種防具。');
  });

  test.slow('armor to +1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('body').press('F6');
    await page.locator('li:nth-child(10)').click();
    await expect(page.locator('[id="⭐SinglePlayer__PanelUI"]')).toContainText('+0 力量手套 一瞬間發出 銀色的 光芒。');
    await expect(page.locator('[id="🔥NumbersUI__Line2__Ac"]')).toContainText('-8');
    await expect(page.locator('[id="🔥StatusNumbers__Basic__Li"]:nth-of-type(3)')).toContainText('-8');
  });

  test('armor to -1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('body').press('F8');
    await page.locator('li:nth-child(10)').click();
    await expect(page.locator('[id="⭐SinglePlayer__PanelUI"]')).toContainText('+0 力量手套 一瞬間發出 黑色的 光芒。');
    await expect(page.locator('[id="🔥NumbersUI__Line2__Ac"]')).toContainText('-6');
    await expect(page.locator('[id="🔥StatusNumbers__Basic__Li"]:nth-of-type(3)')).toContainText('-6');
  });

  test('weapon to +1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('body').press('F10');
    await page.locator('[id="🔥StatusEquips__Equip"]').first().click();
    await expect(page.locator('[id="⭐SinglePlayer__PanelUI"]')).toContainText('+0 瑟魯基之劍 一瞬間發出 藍色的 光芒。');
  });

  test('weapon to -1', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('body').press('F12');
    await page.locator('[id="🔥StatusEquips__Equip"]').first().click();
    await expect(page.locator('[id="⭐SinglePlayer__PanelUI"]')).toContainText('+0 瑟魯基之劍 一瞬間發出 黑色的 光芒。');
  });
})

test.describe('function feature testing', () => {
  test('Status_UI close', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('[id="🔥StatusUI__Close"]').click();
    await expect(page.locator('[id="⭐SinglePlayer__Knight"]')).toContainText('蛇髮 名模↙熱血狂志 熱血狂志:');
  });

  test('HelpUI close', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('li').filter({ hasText: 'Side project' }).first().click();
    await page.locator('[id="🔥HelpUI__Close"]').click();
    await expect(page.locator('[id="⭐SinglePlayer__Knight"]')).toContainText('蛇髮 名模↙熱血狂志 熱血狂志:');
  });

  test('MusicUI close', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('li').filter({ hasText: '選項 背景音效: 關' }).click();
    await page.locator('[id="🔥OptionsUI__Close"]').click();
    await expect(page.locator('[id="⭐SinglePlayer__Knight"]')).toContainText('蛇髮 名模↙熱血狂志 熱血狂志:');
  });

  test('MusicUI music toggle', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('li').filter({ hasText: '選項 背景音效: 關' }).click();
    await page.getByText('背景音效: 關').click();
    await expect(page.locator('[id="🔥OptionsUI__Music"]')).toContainText('背景音效: 開');
  });

  test('SystemUI close', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('.--btnLogout').click();
    await page.locator('[id="🔥SystemUI__Close"]').click();
    await expect(page.locator('[id="⭐SinglePlayer__Knight"]')).toContainText('蛇髮 名模↙熱血狂志 熱血狂志:');
  });


  test('SystemUI cancel', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('.--btnLogout').click();
    await page.locator('[id="🔥SystemUI__Cancel"]').click();
    await expect(page.locator('[id="⭐SinglePlayer__Knight"]')).toContainText('蛇髮 名模↙熱血狂志 熱血狂志:');
  });

  test('SystemUI exit', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.locator('.--btnLogout').click();
    await page.locator('[id="🔥SystemUI__Quit"]').click();
    await expect(page).toHaveURL(/logout/)
  });
})

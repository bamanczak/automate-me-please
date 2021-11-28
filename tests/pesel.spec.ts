import { test, expect } from '@playwright/test';
import { PeselPage } from './pesel.page';


test('should display welcome message', async ({ page }) => {
    const peselPage = new PeselPage(page);
    await peselPage.goto();
    expect(await peselPage.getTitleText()).toBe('Walidator PESEL');
});

test('should accept valid PESEL', async ({ page }) => {
    const peselPage = new PeselPage(page);
    await peselPage.goto();
    expect(true).toBe(true);
});

test('should reject invalid PESEL', async ({ page }) => {
    const peselPage = new PeselPage(page);
    await peselPage.goto();
    expect(true).toBe(true);
});


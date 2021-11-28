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
    await peselPage.fillPeselInput('19321212346');
    const message = await peselPage.getValidationMessage();
    expect(message).toBe('PESEL prawidłowy');

    const birthDate = await peselPage.getBirthDate();
    expect(birthDate).toBe('12.12.2019');

    const gender = await peselPage.getGender();
    expect(gender).toBe('Kobieta');
    // 96080101123
});

test('should reject invalid PESEL', async ({ page }) => {
    const peselPage = new PeselPage(page);
    await peselPage.goto();
    await peselPage.fillPeselInput('19321212347');
    const message = await peselPage.getValidationMessage();
    expect(message).toBe('PESEL nieprawidłowy');
});


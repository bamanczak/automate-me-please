import { LocationStrategy } from '@angular/common';
import { test, expect, Locator, Page } from '@playwright/test';

export class PeselPage {
    readonly page: Page;
    readonly title: Locator;
    readonly validationMessage: Locator;
    readonly gender: Locator;
    readonly birtdate: Locator;
    readonly peselInput: Locator;
    readonly submitButton: Locator;

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('app-root h1');
        this.validationMessage = page.locator('.isValidMessage span');
        this.gender = page.locator('#pesel-sex span');
        this.birtdate = page.locator('#pesel-dob span');
        this.peselInput = page.locator('[name=peselInput]');
        this.submitButton = page.locator('.big-input button');
    }

    async goto() {
        await this.page.goto('http://localhost:4200/');
    }

    async fillPeselInput(pesel) {
        await this.peselInput.fill(pesel);
        await this.submitButton.click();
        await this.waitForValidation();
    }

    async getBirthDate() {
        return await this.birtdate.textContent();
    }

    async getGender() {
        return await this.gender.textContent();
    }

    async getTitleText() {
        return (await this.title.textContent()).trim();
    }

    async getValidationMessage() {
        return (await this.validationMessage.textContent()).trim();
    }

    async waitForValidation() {
        await this.page.waitForSelector('.isValidMessage');
    }
}
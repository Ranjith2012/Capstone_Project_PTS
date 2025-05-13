import { expect, Locator, Page } from '@playwright/test';

export class LoginPageClass {
    private readonly otpButton: Locator;

    constructor(public page: Page) {
        this.otpButton = this.page.locator('.p-9 button');
    }

    async verifyuserOnLoginPage() {
        await expect(await this.otpButton).toBeVisible();
    }
}
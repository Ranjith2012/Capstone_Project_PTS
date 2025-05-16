import { expect, Locator, Page } from '@playwright/test';

export class LoginPageClass {
    private readonly otpButton: Locator;
    private readonly termsAndConditions: Locator;
    private readonly phoneNumber: Locator;
    private readonly errorMsg: Locator;
    private readonly countryList: Locator;

    constructor(public page: Page) {
        this.otpButton = this.page.locator('.p-9 button');
        this.termsAndConditions = this.page.locator("//a[contains(text(), 'Terms & Conditions')]");
        this.phoneNumber = this.page.getByPlaceholder('Enter your phone number');
        this.errorMsg = this.page.locator('.error-message-container p');
        this.countryList = this.page.locator('#country-list div');
    }

    async verifyuserOnLoginPage() {
        await expect(await this.otpButton).toBeVisible();
    }

    async userCilcktermsAndConditions() {
        await this.termsAndConditions.first().click();
    }

    async userEnterPhonenumber(num: number) {
        await this.phoneNumber.fill(num.toString());
    }

    async verifyPhoneNumber(): Promise<boolean> {
        const errorMsg = await this.errorMsg.getAttribute('style');
        if (errorMsg?.includes('display: block')) {
            return true;
        }
        return false;
    }

    async userSelectCountry(country: string) {
        await this.page.locator('.country-code-wrapper input').click();
        const countryCount = await this.countryList.allTextContents();
        for (let i = 0; i < countryCount.length; i++) {
            if (countryCount[i].includes(country)) {
                await this.countryList.nth(i).click();
                break;
            }
        }
    }

}
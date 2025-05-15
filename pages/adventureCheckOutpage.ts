import { Page, Locator, expect } from "@playwright/test";

export class AdventureCheckoutClass {
    private readonly discounttextBar: Locator;
    private readonly errorMsg: Locator;
    private readonly applyCouponButton: Locator;
    private readonly emailAddress: Locator;
    private readonly contactCheckBox: Locator;

    constructor(public page: Page) {
        this.discounttextBar = this.page.getByPlaceholder('Discount code or gift card');
        this.errorMsg = this.page.locator('#error-for-ReductionsInput0');
        this.applyCouponButton = this.page.locator('//button[@aria-label="Apply Discount Code"]');
        this.emailAddress = this.page.getByPlaceholder('Email');
        this.contactCheckBox = this.page.locator('#sms_marketing_opt_in');
    }

    async verifyUserOnCheckOutPage() {
        await expect(this.page.locator('#payment')).toBeVisible();
    }

    async userEnterDiscountCode(code: string) {
        await this.discounttextBar.fill(code);
    }

    async verifyInvalidDiscountCode() {
        await expect(this.errorMsg).toBeVisible();
    }

    async userClickApplyCouponButton() {
        await this.applyCouponButton.click();
    }

    async userEnterEmail(email: string) {
        await this.emailAddress.fill(email);
        await this.emailAddress.press('Enter');
        await this.emailAddress.press('Enter');
    }

    async verifyInvalidEmail() {
        await expect(this.page.locator('#error-for-email')).toBeVisible();
    }

    async userSelectContactCheckBox() {
        await this.contactCheckBox.click();
    }

    async verifyContactCheckBox() {
        await expect(this.contactCheckBox).toBeChecked();
    }

}

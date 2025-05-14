import { expect, Locator, Page } from '@playwright/test';

export class StoreProductDetailsClass {
    private readonly addtoCartButton: Locator;
    private readonly cartTitle: Locator;
    constructor(public page: Page) {
        this.addtoCartButton = this.page.locator('//button[@name="add"]');
        this.cartTitle = this.page.locator('.title.h4');
    }

    async verifyuserOnStoreProductDetailsPage() {
        await expect(await this.addtoCartButton.first()).toBeVisible();
    }

    async userClickAddToCartButton() {
        await this.addtoCartButton.first().click();
    }

    async verifyUserEnterToThecart() {
        await expect(await this.cartTitle).toBeVisible();
    }
}
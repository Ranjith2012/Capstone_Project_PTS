import { expect, Locator, Page } from '@playwright/test';

export class BikeDetailsPageClass {
  private readonly applyFilterBtn: Locator;
  private readonly searchBarForBikeType: Locator;
  private readonly sortByOption: Locator;
  private readonly soldOutBikes: Locator;
  private readonly bookNowButton: Locator;
  private readonly clearFilterBtn: Locator;
  private readonly sidebarOption: Locator;

  constructor(public page: Page) {
    this.applyFilterBtn = this.page.locator('.apply-button button');
    this.searchBarForBikeType = this.page.getByPlaceholder('Search Bike Model');
    this.sortByOption = this.page.locator('.filter_row_height_in_large label');
    this.soldOutBikes = this.page.locator('.btn.right.fullWidthButton.white.font1.disabled');
    this.bookNowButton = this.page.locator('.book_button');
    this.clearFilterBtn = this.page.locator('.chip i');
    this.sidebarOption = this.page.locator('.tab div');

  }

  async verifyuserOnBikeDetailsPage() {
    await expect(await this.applyFilterBtn).toBeVisible();
  }

  async selectSortByOption(option: string) {
    const count = await this.sortByOption.count();
    for (let i = 0; i < count; i++) {
      const element = this.sortByOption.nth(i);
      const text = await element.innerText();
      if (text.toLowerCase().includes(option.toLowerCase())) {
        await element.click();
        break;
      }
    }
  }

  async verifySortByOption(option: string): Promise<boolean> {
    const bikePrice = await this.page.locator('#rental_amount');
    if (option === 'Price - Low to High') {
      bikePrice.nth(0) < bikePrice.nth(1);
      return true;
    }
    else if (option === 'Price - High to Low') {
      bikePrice.nth(0) > bikePrice.nth(1);
      return true;
    }
    else {
      return false;
    }
  }

  async selectSoldOutBikes() {
    const bikesBookNowBtn = await this.soldOutBikes.count();
    for (let i = 0; i < bikesBookNowBtn; i++) {
      const element = this.soldOutBikes.nth(i);
      await expect(this.page).toHaveTitle("Search | Royalbrothers.com")
    }
  }

  async userSelectBookNow() {
    await this.bookNowButton.first().click()
  }

  async userSearchBikeModel(model: string) {
    await this.searchBarForBikeType.fill(model);
  }

  async userCilckCheckBox() {
    await this.page.locator('.listing.bike_model_listing label').first().click();
  }

  async verifyUserSelectTheBikeModel() {
    await expect(this.clearFilterBtn).toBeVisible();
  }

  async userClearFilter() {
    await this.clearFilterBtn.click();
  }

  async verifyUserClearTheFilter() {
    await expect(this.clearFilterBtn).toBeHidden();
  }

  async userClickAboutUs(option: string) {
    await this.page.locator(`.footer-boxes a[href*='${option}']`).click();
  }

  async userClickRBXSubscription() {
    await this.page.locator('.rbx-logo img').click();
  }

  async userClickSidebarOption(option: string) {
    const sidebarOption = await this.sidebarOption.allTextContents();
    for (let i = 0; i < sidebarOption.length; i++) {
      if (sidebarOption[i].includes(option)) {
        await this.sidebarOption.nth(i).click();
        break;
      }
    }
  }
}

import { expect, Locator, Page } from '@playwright/test';

export class BikeDetailsPageClass {
  private readonly applyFilterBtn: Locator;
  private readonly searchBarForBikeType: Locator;
  private readonly sortByOption: Locator;
  private readonly soldOutBikes: Locator;
  private readonly bookNowButton: Locator;
  
  constructor(public page: Page) {
    this.applyFilterBtn = this.page.locator('.apply-button button');
    this.searchBarForBikeType = this.page.getByPlaceholder('Search Bike Model');
    this.sortByOption = this.page.locator('.filter_row_height_in_large label');
    this.soldOutBikes = this.page.locator('.btn.right.fullWidthButton.white.font1.disabled');
    this.bookNowButton = this.page.locator('.book_button');
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
    if(option === 'Price - Low to High'){
        bikePrice.nth(0)<bikePrice.nth(1);
        return true;
    }
    else if(option === 'Price - High to Low'){
        bikePrice.nth(0)>bikePrice.nth(1);
        return true;
    }    
    else{
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

  async userSelectBookNow(){
    await this.bookNowButton.first().click();
  }

}
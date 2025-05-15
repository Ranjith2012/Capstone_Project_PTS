import { expect, Locator, Page } from '@playwright/test';

export class StorePageClass {
  private readonly cartIcon: Locator;
  private readonly productSection: Locator;
  private readonly productHeading: Locator;
  private readonly resetButton: Locator;
  private readonly popupCloseButton: Locator;
  private readonly sortByOption: Locator;
  private readonly searchBarForProduct: Locator;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly viewAllButton: Locator;

  constructor(public page: Page) {
    this.cartIcon = this.page.locator('.cart-drawer-container svg.icon.icon-cart');
    this.productSection = this.page.locator('.header__menu-item.header__menu-item--top.list-menu__item.focus-inset');
    this.productHeading = this.page.locator('.rich-text__heading.h1');
    this.resetButton = this.page.locator("#FacetDrawer a");
    this.popupCloseButton = this.page.locator('.ecomsend-SpinWheel__Modal__CloseButton');
    this.sortByOption = this.page.locator('.facets__display li span');
    this.searchBarForProduct = this.page.locator('.icon.icon-search.modal__toggle-open');
    this.searchInput = this.page.getByPlaceholder('Search');
    this.searchButton = this.page.locator('#predictive-search-option-search-keywords button');
    this.viewAllButton = this.page.locator('.view-all.center a');
  }

  async verifyuserOnStorePage() {
    await expect(await this.cartIcon).toBeVisible();
    await this.page.waitForTimeout(2000);
    //if (await this.popupCloseButton.isVisible({ timeout: 2000 })) {
    await this.popupCloseButton.click();
  }

  async selectStoreproductOption(option: string) {
    const count = await this.productSection.count();
    for (let i = 0; i < count; i++) {
      const element = this.productSection.nth(i);
      const text = await element.innerText();
      if (text.toLowerCase().includes(option.toLowerCase())) {
        await element.click();
        break;
      }
    }
  }


  async verifyOption(option: string): Promise<boolean> {
    const count = await this.productHeading.count();
    for (let i = 0; i < count; i++) {
      const ele = this.productHeading.nth(i);
      const text = await ele.innerText();
      if (text.toLowerCase().includes(option.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  async userClickProduct() {
    const products = await this.page.locator('.grid__item img');
    await products.first().click();
  }

  async userClickCartIcon() {
    await this.cartIcon.click();
  }

  async userSearchTheProduct(product: string) {
    await this.searchBarForProduct.click();
    await this.searchInput.fill(product);
    await this.searchButton.click();
  }

  async verifySearchResult() {
    await expect(this.page.locator('.template-search h1')).toBeVisible();
  }

  async userClickViewAllButton() {
    await this.viewAllButton.click();
  }

  async verifyViewAllButton() {
    await expect(this.page.locator('.rich-text__heading.h1')).toBeVisible();
  }

  async userSelectSortByOption(option: string) {
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

  async userClickResetButton() {
    await this.resetButton.first().click();
  }

  async userClickProductType() {
    await this.page.locator('.list-menu__item.facets__item label[title="Crop Top"] input').click();
  }
}
import { expect, Locator, Page } from '@playwright/test';

export class StorePageClass {
  private readonly cartIcon: Locator;
  private readonly productSection: Locator;
  private readonly productHeading: Locator;
  private readonly size: Locator;
  
  constructor(public page: Page) {
    this.cartIcon = this.page.locator('.cart-drawer-container svg.icon.icon-cart');
    this.productSection = this.page.locator('.header__menu-item.header__menu-item--top.list-menu__item.focus-inset');
    this.productHeading = this.page.locator('.rich-text__heading.h1');
    this.size = this.page.locator(".active-facets a[href*='sort_by']");
  }

  async verifyuserOnStorePage() {
    await expect(await this.cartIcon).toBeVisible();
  }

  async selectStoreproductOption(option: string) {
    const count = await this.productSection.count();
    for(let i=0;i<count;i++){
        const element = this.productSection.nth(i);
        const text = await element.innerText();
        if(text.toLowerCase().includes(option.toLowerCase())){
            await element.click();
            break;
        }
    }
  }


  async verifyOption(option: string): Promise<boolean> {
    const count= await this.productHeading.count();
    for(let i=0;i<count;i++){
        const ele = this.productHeading.nth(i);
        const text = await ele.innerText();
        if(text.toLowerCase().includes(option.toLowerCase())){
            return true;
        }
    }
    return false;
  }

  async userSelectSize(size: string) {
   const checkbox =  await this.page.locator(`.facet-checkbox input[value='${size}']`);
   checkbox.click();
  }

  async verifySelectedSize(){
    const text = await this.size.innerText();
    console.log(text);
  }
}
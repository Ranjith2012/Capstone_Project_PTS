import { expect, FrameLocator, Locator, Page } from '@playwright/test';

export class HomePageClass {
  private readonly searchBarForCity: Locator;
  private readonly cityList: Locator;
  private readonly loginButton: Locator;
  private readonly changeCityArrow: Locator;
  private readonly pickUpDate: Locator;
  private readonly hamburgerMenu: Locator;
  private readonly closeButtonHamburgerMenu: Locator;
  private readonly chatBotIcon: Locator;
  private readonly freameLocator: FrameLocator;
  private readonly offersButton: Locator;
  private readonly signUpButton: Locator;
  private readonly tariffSection: Locator;

  constructor(public page: Page) {
    this.searchBarForCity = this.page.locator('#autocomplete-input');
    this.cityList = this.page.locator('.city-icons a');
    this.loginButton = this.page.locator('//ul[@id="nav-mobile2"]//a[contains(text(), "Login")]');
    this.changeCityArrow = this.page.locator('#one');
    this.pickUpDate = this.page.locator('#pickup-date-other');
    this.hamburgerMenu = this.page.locator('#svg-menu-container use');
    this.closeButtonHamburgerMenu = this.page.locator('#slide-out button');
    this.chatBotIcon = this.page.locator('#widget-open');
    this.freameLocator = this.page.frameLocator('#iframe_widget');
    this.offersButton = this.page.locator('#nav-mobile a[href*="offers"]');
    this.signUpButton = this.page.locator("#nav-mobile2 a[href*='signup']");
    this.tariffSection = this.page.locator("#nav-mobile a[href*='tariff']");

  }

  async gotoWebsite(url: string) {
    await this.page.goto(url);
    
  }

  async verifyUserNavigateToWebsite() {
    await expect(this.page).toHaveTitle('Bike Rentals | Two Wheelers for Rent | Royal Brothers');
  }

  async verifyUserOnCitySelectionPage() {
    await expect(await this.searchBarForCity).toBeVisible();
  }

  async userSelecttheCity(city: string) {
    await this.searchBarForCity.fill(city);
    const count = await this.cityList.count();
    for (let i = 0; i < count; i++) {
      const element = this.cityList.nth(i);
      const text = await element.innerText();
      if (text.toLowerCase().includes(city.toLowerCase())) {
        await element.click();
        break;
      }
    }
  }

  async verifyUserOnHomePage() {
    await expect(await this.offersButton).toBeVisible();
  }

  async changeCity(city: string) {
    await this.page.waitForTimeout(2000);
    await this.changeCityArrow.click();
    await this.userSelecttheCity(city);
  }

  async userClickLoginButton() {
    await this.loginButton.click();
  }

  async userSelectDateandTime() {
    await this.pickUpDate.click();
    await this.page.locator("//div[@aria-hidden='false']//td/div[text()='24']").click();
    await this.page.locator("//ul[@aria-controls='pickup-time-other']/li").nth(1).click();
    await this.page.locator('//div[@aria-hidden="false"]//td/div[text()="25"]').click();
    await this.page.locator("//ul[@aria-controls='dropoff-time-other']/li").nth(1).click();
  }

  async userClickSearchButton() {
    await this.page.locator(".row.carousel-fixed-item button[type='submit']").click();
  }

  async userClickhamburgerMenu() {
    await this.page.waitForTimeout(2000);
    await this.hamburgerMenu.click();
  }

  async verifyUserOnHamburgerMenuSection() {
    await expect(this.closeButtonHamburgerMenu).toBeVisible();
  }

  async userClickhamburgerCloseButton() {
    await this.closeButtonHamburgerMenu.click();
  }

  async userClickChatBotICon() {
    await this.chatBotIcon.click();
  }

  async verifyChatWindowOpened() {
    await this.freameLocator.locator('.media-heading.prelative').isVisible();
  }

  async userSendtheMsg(msg: string) {
    await this.freameLocator.locator('#post-message').fill(msg);
    await this.freameLocator.locator('#post-message').press('Enter');
  }

  async verifyIfTheChatBotRespondedToTheMessage() {
    await expect(this.freameLocator.locator('.quick-reply-wrapper div[class="text-question"]')).toBeVisible();
  }

  async userClickOffersButton() {
    await this.offersButton.click();
  }

  async verifyTitle(title: string) {
    await expect(this.page).toHaveTitle(title);
  }

  async hovertoWhatNewButton() {
    await this.page.waitForLoadState();
    await this.offersButton.hover();
    await this.page.locator(`//button[contains(text(),"What's new?")]`).hover();
    await this.page.waitForTimeout(1000);
  }

  async cilckOptionInDropdown(option: string) {
    const optionElement = this.page.locator('#dropdown-whats-new a');
    const count = await optionElement.count();

    for (let i = 0; i < count; i++) {
      const element = optionElement.nth(i);
      const text = (await element.innerText()).toLowerCase();

      if (text.includes(option.toLowerCase())) {
        await element.click();
        break;
      }
    }
  }

  async userCilckSignUpButton() {
    await this.signUpButton.click();
  }

  async userClickTariffSection() {
    await this.tariffSection.click();
  }

  async userClickCancelAlert() {
    this.page.once('dialog', async dialog => {
      await dialog.dismiss()
    });
    await this.page.locator(`.footer-boxes a[href*='tel']`).first().click();
  }

}

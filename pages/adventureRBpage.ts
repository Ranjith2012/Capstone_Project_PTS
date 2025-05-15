import { Page, Locator, expect } from "@playwright/test";

export class AdventureClass {
    private readonly chatBotIcon: Locator;
    private readonly firstName: Locator;
    private readonly lastname: Locator;
    private readonly emailaddress: Locator;
    private readonly carticon: Locator;
    private readonly replayMsg: Locator;
    private readonly shopNowButton: Locator;
    private readonly searchIcon: Locator;
    private readonly searchBar: Locator;
    private readonly searchButton: Locator;
    private readonly learnmoreButton: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly adventureCardList: Locator;
    private readonly buyItNowButton: Locator;
    private readonly getDirectionLink: Locator;
    private readonly addTocartButton: Locator;
    private readonly FilterButton: Locator;


    constructor(public page: Page) {
        this.chatBotIcon = this.page.locator('#ShopifyChat');
        this.firstName = this.page.getByPlaceholder('First Name');
        this.lastname = this.page.getByPlaceholder('Last Name');
        this.emailaddress = this.page.getByPlaceholder('Email Address');
        this.replayMsg = this.page.locator('.message-bubble.message-bubble-incoming');
        this.carticon = this.page.locator(".secondary-nav a[href*='cart']");
        this.shopNowButton = this.page.locator('#drawer-cart a');
        this.searchIcon = this.page.locator(".secondary-nav a[href*='search']");
        this.searchBar = this.page.getByPlaceholder('Search our store...');
        this.searchButton = this.page.locator('#sidebar-predictive-search-trigger');
        this.learnmoreButton = this.page.locator('.image-with-text__btn');
        this.continueShoppingButton = this.page.locator('.u-text-center a');
        this.adventureCardList = this.page.locator('.product-card__title product-card-title');
        this.buyItNowButton = this.page.locator('.shopify-payment-button button');
        this.getDirectionLink = this.page.locator('.product-single__box__text a');
        this.addTocartButton = this.page.locator('.product-form__add button[name="add"]');
        this.FilterButton = this.page.locator('.collection-main__filter a');
    }

    async verifyUserOnAdventurePage() {
        await expect(this.page.locator('.header__logo-ratio-box img')).toBeVisible();
    }

    async userSelectSlideOptions(option: string) {
        await this.page.locator(`.primary-nav__items a[href*='${option}']`).click();
    }

    async userSendCredentailsToChatbot(name: string, lastName: string, mail: string) {
        await this.chatBotIcon.click();
        await this.page.getByPlaceholder('Write message').fill('places');
        await this.page.getByPlaceholder('Write message').press('Enter');
        await this.firstName.fill(name);
        await this.lastname.fill(lastName);
        await this.emailaddress.fill(mail);
        await this.page.locator('#marketing').click();
        await this.page.getByText('Start chat').click();
    }

    async verifyTheChatBotRespondedToTheMessage() {
        await expect(this.replayMsg).toBeVisible();
    }

    async userClickCartIcon() {
        await this.carticon.click();
    }

    async verifyUserOnCartSection() {
        await expect(await this.page.locator('.cart-draw__title')).toBeVisible();
    }

    async userClickShopNowButton() {
        await this.shopNowButton.click();
    }

    async searchourStore(option: string) {
        await this.searchIcon.click();
        await this.searchBar.fill(option);
        await this.searchButton.click();
    }

    async verifyUserOnSearchResultsPage() {
        await expect(await this.page.locator('.section__title-text.h2')).toBeVisible();
    }

    async userClickLearnMoreButton() {
        await this.learnmoreButton.click();
    }

    async verifyUserOnLearnMorePage() {
        await expect(this.continueShoppingButton).toBeVisible();
    }

    async userClickAdventureCard(option: string) {
        const adventureCardList = await this.adventureCardList.allTextContents();
        for (let i = 0; i < adventureCardList.length; i++) {
            if (adventureCardList[i].includes(option)) {
                await this.adventureCardList.nth(i).click();
                break;
            }
        }
    }

    async verifyUserOnAdventureCardPage() {
        await expect(this.buyItNowButton).toBeVisible();
    }

    async userCilckBuyItNowButton() {
        await this.page.waitForLoadState();
        await this.buyItNowButton.click();
    }

    async userCilckPlusIcon(func: string, num: number) {
        if (func === 'minus') {
            await this.page.locator('.product-form__qty-input button').first().click();
        }
        else {
            for (let i = 0; i < num; i++) {
                await this.page.locator('.product-form__qty-input button').last().click();
            }
        }
    }

    async userCilckGetDirectionButton() {
        await this.getDirectionLink.click();
    }

    async userClickAddToCartButton() {
        await this.addTocartButton.click();
    }

    async userClickDeleteItem() {
        await this.page.locator('.cart__items .cart-item__remove').first().click();
    }

    async verifyUserDeleteItem() {
        await expect(this.shopNowButton).toBeVisible();
    }

    async userClickAdventureFilter() {
        await this.FilterButton.click();
    }

    async userClickAdventureFilterCloseButton(){
        await this.page.locator('.collection-sidebar__header button').click();
    }

    async verifyUserOnAdventureFilterPage(){
        await expect(this.page.locator('.collection-sidebar__header button')).toBeVisible();
    }

}
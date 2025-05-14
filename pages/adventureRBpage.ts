import { Page, Locator, expect } from "@playwright/test";

export class AdventureClass{
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

    constructor(public page: Page){
        this.chatBotIcon =this.page.locator('#ShopifyChat');
        this.firstName = this.page.getByPlaceholder('First Name');
        this.lastname = this.page.getByPlaceholder('Last Name');
        this.emailaddress = this.page.getByPlaceholder('Email Address');
        this.replayMsg = this.page.locator('.message-bubble.message-bubble-incoming');
        this.carticon = this.page.locator(".secondary-nav a[href*='cart']");
        this.shopNowButton = this.page.locator('#drawer-cart a');
        this.searchIcon = this.page.locator(".secondary-nav a[href*='search']");
        this.searchBar = this.page.getByPlaceholder('Search our store...');
        this.searchButton = this.page.locator('#sidebar-predictive-search-trigger');
    }

    async verifyUserOnAdventurePage(){
        await expect(this.page.locator('.header__logo-ratio-box img')).toBeVisible();
    }

    async userSelectSlideOptions(option: string){
        await this.page.locator(`.primary-nav__items a[href*='${option}']`).click();
    }

    async userSendCredentailsToChatbot(name:string,lastName:string,mail:string){
        await this.chatBotIcon.click();
        await this.page.getByPlaceholder('Write message').fill('places');
        await this.page.getByPlaceholder('Write message').press('Enter');
        await this.firstName.fill(name);
        await this.lastname.fill(lastName);
        await this.emailaddress.fill(mail);
        await this.page.locator('#marketing').click();
        await this.page.getByText('Start chat').click();
    }

    async verifyTheChatBotRespondedToTheMessage(){
        await expect(this.replayMsg).toBeVisible();
    }

    async userClickCartIcon(){
        await this.carticon.click();
    }
    
    async verifyUserOnCartSection(){
        await expect(await this.page.locator('.cart-draw__title')).toBeVisible();
    }

    async userClickShopNowButton(){
        await this.shopNowButton.click();
    }

    async searchourStore(option: string){
        await this.searchIcon.click();
        await this.searchBar.fill(option);
        await this.searchButton.click();
    }

    async verifyUserOnSearchResultsPage(){
        await expect(await this.page.locator('.section__title-text.h2')).toBeVisible();
    }

}
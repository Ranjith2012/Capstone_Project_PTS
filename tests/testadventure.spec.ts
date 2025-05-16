import { test } from '../fixtures/fixture';
import { locationForadventurePageTest } from '../utils/constants';

test.describe('Adventure Page Functionality', () => {
    test.beforeEach(async ({ homepage }) => {
        await homepage.verifyUserNavigateToWebsite();
        await homepage.userSelecttheCity(locationForadventurePageTest);
        await homepage.verifyUserOnHomePage();
        await homepage.hovertoWhatNewButton();
        await homepage.cilckOptionInDropdown('Adventures by RB'),
        await homepage.verifyTitle('Adventures by RB');
    })

    test(`Validate user successfully reach adventure page`, async ({ adventurePage }) => {
        await adventurePage.verifyUserOnAdventurePage();
        await adventurePage.userSelectSlideOptions('adventure');
    })

    test(`Chatbot is responding to user`, async ({ adventurePage }) => {
        await adventurePage.verifyUserOnAdventurePage();
        await adventurePage.userSendCredentailsToChatbot("mani", "M", "mani@gmail.com");
        await adventurePage.verifyTheChatBotRespondedToTheMessage();
    })

    test(`Check cart section navigation working fine`, async ({ adventurePage }) => {
        await adventurePage.verifyUserOnAdventurePage();
        await adventurePage.userClickCartIcon();
        await adventurePage.verifyUserOnCartSection();
    })

    test(`User navigate to cart section and click "Shop Now" button`, async ({ adventurePage }) => {
        await adventurePage.verifyUserOnAdventurePage();
        await adventurePage.userClickCartIcon();
        await adventurePage.verifyUserOnCartSection();
        await adventurePage.userClickShopNowButton();
        await adventurePage.verifyUserOnAdventurePage();
    })

    test(`Validate the search bar functionality`, async ({ adventurePage }) => {
        await adventurePage.verifyUserOnAdventurePage();
        await adventurePage.searchourStore('adventures');
        await adventurePage.verifyUserOnSearchResultsPage();
    })

    test(`Verify user can navigate to bike rentalpage`, async ({ adventurePage, homepage }) => {
        await adventurePage.verifyUserOnAdventurePage();
        await adventurePage.userSelectSlideOptions('royal');
        await homepage.verifyUserNavigateToWebsite();
    });

    test(`Verify "Learn more" functionality`, async ({ adventurePage }) => {
        await adventurePage.verifyUserOnAdventurePage();
        await adventurePage.userClickLearnMoreButton();
        await adventurePage.verifyUserOnLearnMorePage();
    });

    test(`Validate the booking Functionality`, async ({ adventurePage, adventureCheckoutPage }) => {
        await adventurePage.verifyUserOnAdventurePage();
        await adventurePage.searchourStore('adventures');
        await adventurePage.verifyUserOnSearchResultsPage();
        await adventurePage.userClickAdventureCard('Motorcycle Training For Women');
        await adventurePage.verifyUserOnAdventureCardPage();
        await adventurePage.userCilckBuyItNowButton();
        await adventureCheckoutPage.verifyUserOnCheckOutPage();
    })

    test(`Validate cart page check out functionality`,async({storepage, adventurePage})=>{
        await adventurePage.verifyUserOnAdventurePage();
        await adventurePage.searchourStore('adventures');
        await adventurePage.verifyUserOnSearchResultsPage();
        await adventurePage.userClickAdventureCard('Motorcycle Training For Women');
        await adventurePage.verifyUserOnAdventureCardPage();
        await adventurePage.userClickAddToCartButton();
        await adventurePage.verifyUserOnCartSection();
    });

    test(`verify user can delete the item from cart`,async({storepage, adventurePage})=>{
        await adventurePage.verifyUserOnAdventurePage();
        await adventurePage.searchourStore('adventures');
        await adventurePage.verifyUserOnSearchResultsPage();
        await adventurePage.userClickAdventureCard('Motorcycle Training For Women');
        await adventurePage.verifyUserOnAdventureCardPage();
        await adventurePage.userClickAddToCartButton();
        await adventurePage.verifyUserOnCartSection();
        await adventurePage.userClickDeleteItem();
        await adventurePage.verifyUserDeleteItem();
    });


    test(`Validate user navigate to the adventure page Filter option`, async ({ adventurePage }) => { 
        await adventurePage.verifyUserOnAdventurePage();
        await adventurePage.searchourStore('adventures');
        await adventurePage.verifyUserOnSearchResultsPage();
        await adventurePage.userClickAdventureFilter();
        await adventurePage.verifyUserOnAdventureFilterPage();
    });

});

import { test } from '../fixtures/fixture';

test.describe('Adventure Checkout Page Functionality', () => {
    test.beforeEach(async ({ homepage, adventurePage }) => {
        await homepage.verifyUserNavigateToWebsite();
        await homepage.userSelecttheCity('cochin');
        await homepage.verifyUserOnHomePage();
        await homepage.hovertoWhatNewButton();
        await homepage.cilckOptionInDropdown('Adventures by RB'),
        await homepage.verifyTitle('Adventures by RB');
        await adventurePage.verifyUserOnAdventurePage();
        await adventurePage.searchourStore('adventures');
        await adventurePage.verifyUserOnSearchResultsPage();
    })

    test(`Verify "Get Direction" functionality`, async ({ homepage, adventurePage }) => {
        await adventurePage.userClickAdventureCard('Motorcycle Training For Women');
        await adventurePage.verifyUserOnAdventureCardPage();
        await adventurePage.userCilckGetDirectionButton();
        await homepage.verifyTitle('Red Riders Gokarting- Gokarting in Bangalore. - Google Maps');
    })

    test(`Verify "Add to cart" functionality`, async ({ adventurePage }) => {
        await adventurePage.userClickAdventureCard('Motorcycle Training For Women');
        await adventurePage.verifyUserOnAdventureCardPage();
        await adventurePage.userClickAddToCartButton();
        await adventurePage.verifyUserOnCartSection();
    })

    test(`Validate Quantity Increase functionality`, async ({ adventurePage }) => {
        await adventurePage.userClickAdventureCard('Motorcycle Training For Women');
        await adventurePage.verifyUserOnAdventureCardPage();
        await adventurePage.userCilckPlusIcon("plus", 3);
    })

    test(`Validate Quantity Decrese functionality`, async ({ adventurePage }) => {
        await adventurePage.userClickAdventureCard('Motorcycle Training For Women');
        await adventurePage.verifyUserOnAdventureCardPage();
        await adventurePage.userCilckPlusIcon("plus", 4);
        await adventurePage.userCilckPlusIcon("minus", 3);
    })

    test(`verify discount code functionality`, async ({ adventurePage, adventureCheckoutPage }) => {
        await adventurePage.userClickAdventureCard('Motorcycle Training For Women');
        await adventurePage.verifyUserOnAdventureCardPage();
        await adventurePage.userCilckBuyItNowButton();
        await adventureCheckoutPage.verifyUserOnCheckOutPage();
        await adventureCheckoutPage.userEnterDiscountCode('20OFF');
        await adventureCheckoutPage.userClickApplyCouponButton();
        await adventureCheckoutPage.verifyInvalidDiscountCode();
    })

    test(`Verify The invalid Email functionality`, async ({ adventurePage, adventureCheckoutPage }) => {
        await adventurePage.userClickAdventureCard('Motorcycle Training For Women');
        await adventurePage.verifyUserOnAdventureCardPage();
        await adventurePage.userCilckBuyItNowButton();
        await adventureCheckoutPage.verifyUserOnCheckOutPage();
        await adventureCheckoutPage.userEnterEmail('mani678T7');
        await adventureCheckoutPage.verifyInvalidEmail();
    });

    test(`Verify Contact Checkbox functionality`, async ({ adventurePage, adventureCheckoutPage }) => {
        await adventurePage.userClickAdventureCard('Motorcycle Training For Women');
        await adventurePage.verifyUserOnAdventureCardPage();
        await adventurePage.userCilckBuyItNowButton();
        await adventureCheckoutPage.verifyUserOnCheckOutPage();
        await adventureCheckoutPage.userSelectContactCheckBox();
        await adventureCheckoutPage.verifyContactCheckBox();
    });
});
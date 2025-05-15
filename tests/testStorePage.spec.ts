import { test ,expect} from '../fixtures/fixture';
import { locationForStorepageTest } from '../utils/constants';

test.describe('Store Page', () => {
    test.beforeEach(async ({ homepage }) => {
        await homepage.verifyUserNavigateToWebsite();
        await homepage.userSelecttheCity(locationForStorepageTest);
        await homepage.verifyUserOnHomePage();
        await homepage.hovertoWhatNewButton();
        await homepage.cilckOptionInDropdown('Store by RB'),
        await homepage.verifyTitle('Shop Biker Tees, Jackets & Gears – Store by RB');
    });

    test('Validate user on Store Page', async ({ storepage }) => {
        await storepage.verifyuserOnStorePage();
    });

    const optionList = [
        { option: "Hoodies", title: "Hoodies" },
        { option: "T-Shirt", title: "T-Shirts" },
        { option: "Prints", title: "Prints" },
        { option: "Essentials", title: "Riding Essentials" },
      ];
    optionList.forEach(({ option, title }) => {
    test(`Validate user can navigate to ${option} and verify title is ${title}`, async ({ storepage }) => {
        await storepage.verifyuserOnStorePage();
        await storepage.selectStoreproductOption(option);
        await storepage.verifyOption(title);
        });
    });

    test(`Validate sortBy option functionality 'Alphabetically, A-Z'`, async ({ storepage }) => {
        await storepage.verifyuserOnStorePage();
        await storepage.selectStoreproductOption('Hoodies');
        await storepage.verifyOption('Hoodies');
        await storepage.userSelectSortByOption('Alphabetically, A-Z');
    });

    test(`Validate add product to the cart`,async({storepage, storeProductDetails})=>{
        await storepage.verifyuserOnStorePage();
        await storepage.selectStoreproductOption('T-Shirt');
        await storepage.verifyOption('T-Shirts');
        await storepage.userClickProduct();
        await storeProductDetails.verifyuserOnStoreProductDetailsPage();
        await storeProductDetails.userClickAddToCartButton();
        await storeProductDetails.verifyUserEnterToThecart();
    });

    test(`Verify user can enter into the cart section`,async({storepage, storeProductDetails})=>{
        await storepage.verifyuserOnStorePage();
        await storepage.userClickCartIcon();
        await storeProductDetails.verifyUserEnterToThecart();
    });

    test(`Validate user can search product`,async({storepage})=>{
        await storepage.verifyuserOnStorePage();
        await storepage.userSearchTheProduct('unisex hoodie');
        await storepage.verifySearchResult();
    });

    test(`Verify the "View All" button is working fine`,async({storepage})=>{
        await storepage.verifyuserOnStorePage();
        await storepage.userClickViewAllButton();
        await storepage.verifyViewAllButton();
    });

    test(`Verify search "Hoodie" and add to the cart functionality`,async({storepage, storeProductDetails})=>{
        await storepage.verifyuserOnStorePage();
        await storepage.selectStoreproductOption('Hoodies');
        await storepage.verifyOption('Hoodies');
        await storepage.userClickProduct();
        await storeProductDetails.verifyuserOnStoreProductDetailsPage();
        await storeProductDetails.userClickAddToCartButton();
        await storeProductDetails.verifyUserEnterToThecart();
    });


    test(`Validate sortBy option functionality 'Price, low to high'`, async ({ storepage }) => {
        await storepage.verifyuserOnStorePage();
        await storepage.selectStoreproductOption('Hoodies');
        await storepage.verifyOption('Hoodies');
        await storepage.userSelectSortByOption('Price, low to high');
    });

    test(`Verify reset Functionality working fine`, async({storepage})=>{
        await storepage.verifyuserOnStorePage();
        await storepage.selectStoreproductOption('T-Shirt');
        await storepage.verifyOption('T-Shirts');
        await storepage.userClickResetButton();
    })

    test(`Validate sortBy option functionality 'Date, new to old'`, async ({ storepage }) => {
        await storepage.verifyuserOnStorePage();
        await storepage.selectStoreproductOption('Hoodies');
        await storepage.verifyOption('Hoodies');
        await storepage.userSelectSortByOption('Date, new to old');
    });
});


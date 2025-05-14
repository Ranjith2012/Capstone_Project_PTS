import { test ,expect} from '../fixtures/fixture';

test.describe('Store Page', () => {
    test.beforeEach(async ({ homepage, storepage }) => {
        await homepage.verifyUserNavigateToWebsite();
        await homepage.userSelecttheCity('cochin');
        await homepage.verifyUserOnHomePage();
        await homepage.hovertoWhatNewButton();
        await homepage.cilckOptionInDropdown('Store by RB'),
        await homepage.verifyTitle('Shop Biker Tees, Jackets & Gears – Store by RB');
        await storepage.verifyuserOnStorePage();
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
        await storepage.selectStoreproductOption(option);
        await storepage.verifyOption(title);
        });
    });

    test(`Validate add product to the cart`,async({storepage, storeProductDetails})=>{
        await storepage.selectStoreproductOption('T-Shirt');
        await storepage.verifyOption('T-Shirts');
        await storepage.userClickProduct();
        await storeProductDetails.verifyuserOnStoreProductDetailsPage();
        await storeProductDetails.userClickAddToCartButton();
        await storeProductDetails.verifyUserEnterToThecart();
    });

    test(`Verify user can enter into the cart section`,async({storepage, storeProductDetails})=>{
        await storepage.userClickCartIcon();
        await storeProductDetails.verifyUserEnterToThecart();
    });

    test(`Validate user can search product`,async({storepage, storeProductDetails})=>{
        await storepage.userSearchTheProduct('unisex hoodie');
        await storepage.verifySearchResult();
    });

    test(`Verify the "View All" button is working fine`,async({storepage, storeProductDetails})=>{
        await storepage.userClickViewAllButton();
        await storepage.verifyViewAllButton();
    });

});
import { test ,expect} from '../fixtures/fixture';

test.describe('Store Page', () => {
    test.beforeEach(async ({ homepage }) => {
        await homepage.verifyUserNavigateToWebsite();
        await homepage.userSelecttheCity('cochin');
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
        await storepage.selectStoreproductOption(option);
        await storepage.verifyOption(title);
        });
    });

    test.only(`Validate user select the size`,async({storepage})=>{
        await storepage.selectStoreproductOption('T-Shirt');
        await storepage.verifyOption('T-Shirts');
        await storepage.userSelectSize('S');
        await storepage.verifySelectedSize();
    });


});
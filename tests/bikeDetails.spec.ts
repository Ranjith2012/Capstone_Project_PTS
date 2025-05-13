import { test, expect } from '../fixtures/fixture';

test('Check the Sort By Functionality', async ({ homepage, bikedetailspage }) => {
    await homepage.verifyUserNavigateToWebsite();
    await homepage.userSelecttheCity('cochin');
    await homepage.verifyUserOnHomePage();
    await homepage.userSelectDateandTime();
    await homepage.userClickSearchButton();
    await bikedetailspage.verifyuserOnBikeDetailsPage();
    await bikedetailspage.selectSortByOption('Price - Low to High');
    expect(await bikedetailspage.verifySortByOption('Price - Low to High')).toBeTruthy();
  });
  
  
  test(`Verify user can't book sold out bikes`, async ({ homepage, bikedetailspage }) => {
    await homepage.verifyUserNavigateToWebsite();
    await homepage.userSelecttheCity('cochin');
    await homepage.verifyUserOnHomePage();
    await homepage.userSelectDateandTime();
    await homepage.userClickSearchButton();
    await bikedetailspage.verifyuserOnBikeDetailsPage();
    await bikedetailspage.selectSoldOutBikes();
  });
  
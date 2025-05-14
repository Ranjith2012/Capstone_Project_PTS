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
  

  test(`Click "Book Now" redirected to booking page`, async ({ homepage, bikedetailspage, loginpage}) => {
    await homepage.verifyUserNavigateToWebsite();
    await homepage.userSelecttheCity('cochin');
    await homepage.verifyUserOnHomePage();
    await homepage.userSelectDateandTime();
    await homepage.userClickSearchButton();
    await bikedetailspage.verifyuserOnBikeDetailsPage();
    await bikedetailspage.userSelectBookNow();
    await loginpage.verifyuserOnLoginPage();
  });
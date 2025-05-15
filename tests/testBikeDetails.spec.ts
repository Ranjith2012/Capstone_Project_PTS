import { test, expect } from '../fixtures/fixture';
import { locationForBikeDetailsPageTest } from '../utils/constants';

test.describe('Bike Details Page Functionality', () => {
  test.beforeEach(async ({ homepage}) => {
    await homepage.verifyUserNavigateToWebsite();
    await homepage.userSelecttheCity(locationForBikeDetailsPageTest);
    await homepage.verifyUserOnHomePage();
    await homepage.userSelectDateandTime();
    await homepage.userClickSearchButton();
  });

  test(`Validate user successfully reach bike details page`, async ({ bikedetailspage }) => {
    await bikedetailspage.verifyuserOnBikeDetailsPage();
  });

  test(`Validate user reach Blog page`, async ({ homepage, bikedetailspage }) => {
    await bikedetailspage.userClickAboutUs('blog');
    await homepage.verifyTitle('Bike travel blog | Travel stories | Royal Brothers');
  });
  
  test(`Verify user can't book sold out bikes`, async ({ homepage, bikedetailspage }) => {
    await bikedetailspage.verifyuserOnBikeDetailsPage();
    await bikedetailspage.selectSoldOutBikes();
  });
  

  test(`Click "Book Now" redirected to booking page`, async ({ bikedetailspage, loginpage}) => {
    await bikedetailspage.verifyuserOnBikeDetailsPage();
    await bikedetailspage.userSelectBookNow();
    await loginpage.verifyuserOnLoginPage();
  });

  test(`Verify user can search bike using Filters`, async ({ bikedetailspage }) => { 
    await bikedetailspage.verifyuserOnBikeDetailsPage();
      await bikedetailspage.userSearchBikeModel('mountain');
      await bikedetailspage.userCilckCheckBox();
      await bikedetailspage.verifyUserSelectTheBikeModel();
  });

  test(`Validate user reach About Us page`, async ({ homepage, bikedetailspage }) => {
    await bikedetailspage.userClickAboutUs('about');
    await homepage.verifyTitle('About Us | Royalbrothers.com');
  });

  test(`Validate user apply Filter and clear the Filter`, async ({ bikedetailspage }) => {
    await bikedetailspage.verifyuserOnBikeDetailsPage();
    await bikedetailspage.userSearchBikeModel('mountain');
    await bikedetailspage.userCilckCheckBox();
    await bikedetailspage.verifyUserSelectTheBikeModel();
    await bikedetailspage.userClearFilter();
    await bikedetailspage.verifyUserClearTheFilter();
  });

  test(`Check Sign Up functionality`, async ({ homepage, loginpage }) => {
    await homepage.userCilckSignUpButton();
    await loginpage.verifyuserOnLoginPage();
  });

  test(`Verify user can navigate to the "tariff" page`, async ({ homepage }) => {
    await homepage.userClickTariffSection();
    await homepage.verifyTitle('Rent Bikes in Calicut | 2 wheelers on rent in Calicut | Royal Brothers');
  });

  test(`Validate user reach Contact Us page`, async ({ homepage, bikedetailspage }) => {
    await bikedetailspage.userClickAboutUs('reach');
    await homepage.verifyTitle('Reach us for Booking, Queries, Advice | Royalbrothers.com');
  });

  const subscriptionTestData = [
    {  sidebarOption: 'Service Related' },
    {  sidebarOption: 'Pricing Related' },
    { sidebarOption: 'Location Related' },
  ];
  subscriptionTestData.forEach(({ sidebarOption }) => {
    test.only(`Validate RBX subscription for ${sidebarOption}`, async ({ homepage, bikedetailspage }) => {
      await bikedetailspage.userClickRBXSubscription();
      await homepage.verifyTitle("Monthly Bike Rentals | Calicut");
      await bikedetailspage.userClickSidebarOption(sidebarOption);
    });
  });

});
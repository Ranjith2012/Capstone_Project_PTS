import { test, expect } from '../fixtures/fixture';
import { validMobileNumber, invalidMobileNumber } from '../utils/constants';

test('Verify title of the page', async ({ homepage }) => {
  await homepage.verifyUserNavigateToWebsite();
});

test('Validate the user can search for a city', async ({ homepage }) => {
  await homepage.verifyUserNavigateToWebsite();
  await homepage.userSelecttheCity('calicut');
  await homepage.verifyUserOnHomePage();
});

test.describe('Home and Login Page Functionality', () => {
  test.beforeEach(async ({ homepage }) => {
    await homepage.verifyUserNavigateToWebsite();
    await homepage.userSelecttheCity('calicut');
    await homepage.verifyUserOnHomePage();
  });

  const cityPairs = [
    { to: 'cochin' },
    { to: 'coorg' },
    { to: 'tirupati' },
  ];
  cityPairs.forEach(({ to }) => {
    test(`User can change location to ${to}`, async ({ homepage }) => {
      await homepage.changeCity(to);
      await homepage.verifyUserOnHomePage();
    });
  });

  test('Verify the user can Navigate to the login page', async ({ homepage, loginpage }) => {
    await homepage.userClickLoginButton();
    await loginpage.verifyuserOnLoginPage();
  });

  test('Validate user can select the date and time', async ({ homepage, bikedetailspage }) => {
    await homepage.userSelectDateandTime();
    await homepage.userClickSearchButton();
    await bikedetailspage.verifyuserOnBikeDetailsPage();
  });


  test(`User can navigate to hamburger menu and close`, async ({ homepage }) => {
    await homepage.userClickhamburgerMenu();
    await homepage.verifyUserOnHamburgerMenuSection();
    await homepage.userClickhamburgerCloseButton();
  })

  test(`Verify if chatbot is responding to user in web`, async ({ homepage }) => {
    await homepage.userClickChatBotICon();
    await homepage.verifyChatWindowOpened();
    await homepage.userSendtheMsg('hi');
    await homepage.verifyIfTheChatBotRespondedToTheMessage();
  })

  test(`Verify user can navigate to offers page`, async ({ homepage }) => {
    await homepage.userClickOffersButton();
    await homepage.verifyTitle("Offers in Calicut | Royal Brothers");
  });

  test(`Validate What's new Functionality working fine`, async ({ homepage }) => {
    await homepage.hovertoWhatNewButton();
    await homepage.cilckOptionInDropdown('Adventures by RB');
    await homepage.verifyTitle('Adventures by RB');
  });

  test('Validate SortBy B correctly switching to the tab', async ({ homepage }) => {
    await homepage.hovertoWhatNewButton();
    await homepage.cilckOptionInDropdown('Store by RB'),
      await homepage.verifyTitle('Shop Biker Tees, Jackets & Gears – Store by RB');
  });

  test(`Validate user can navigate to login page`, async ({ homepage, loginpage }) => {
    await homepage.userClickLoginButton();
    await loginpage.verifyuserOnLoginPage();
    const [newPage] = await Promise.all([
      loginpage.page.context().waitForEvent('page'),
      loginpage.userCilcktermsAndConditions()
    ]);
    await newPage.waitForLoadState();
    await expect(newPage).toHaveTitle('Terms & Conditions | Royalbrothers.com');
  });

  test(`Verify user enter invalid phone number`, async ({ homepage, loginpage }) => {
    await homepage.userClickLoginButton();
    await loginpage.verifyuserOnLoginPage();
    await loginpage.userEnterPhonenumber(invalidMobileNumber);
    expect(await loginpage.verifyPhoneNumber()).toBeTruthy();
  })

  test(`Verify user enter valid phone number`, async ({ homepage, loginpage }) => {
    await homepage.userClickLoginButton();
    await loginpage.verifyuserOnLoginPage();
    await loginpage.userEnterPhonenumber(validMobileNumber);
    expect(await loginpage.verifyPhoneNumber()).toBeFalsy();
  });


  test(`User select the country to enter phone number`, async ({ homepage, loginpage }) => {
    await homepage.userClickLoginButton();
    await loginpage.verifyuserOnLoginPage();
    await loginpage.userSelectCountry('United States');
  });


  test(`Validate Phone number functionality with alerts`, async ({ homepage, loginpage }) => {
    await homepage.userClickCancelAlert();
  });

});

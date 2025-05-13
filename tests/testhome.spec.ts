import { test, expect } from '../fixtures/fixture';

test('Verify title of the page', async ({ homepage }) => {
  await homepage.verifyUserNavigateToWebsite();
});

test('Validate the user can search for a city', async ({ homepage }) => {
  await homepage.verifyUserNavigateToWebsite();
  await homepage.userSelecttheCity('calicut');
  await homepage.verifyUserOnHomePage();
});

const cityPairs = [
  {  to: 'cochin' },
  {  to: 'coorg' },
  { to: 'tirupati' },
];
cityPairs.forEach(({ to }) => {
  test(`User can change location to ${to}`, async ({ homepage }) => {
    await homepage.verifyUserNavigateToWebsite();
    await homepage.userSelecttheCity('calicut');
    await homepage.verifyUserOnHomePage();
    await homepage.changeCity(to);
    await homepage.verifyUserOnHomePage();
  });
});

test('Verify the user can Navigate to the login page', async ({ homepage, loginpage }) => {
  await homepage.verifyUserNavigateToWebsite();
  await homepage.userSelecttheCity('calicut');
  await homepage.verifyUserOnHomePage();
  await homepage.userClickLoginButton();
  await loginpage.verifyuserOnLoginPage();
});

test('Validate user can select the date and time', async ({ homepage, bikedetailspage }) => {
  await homepage.verifyUserNavigateToWebsite();
  await homepage.userSelecttheCity('calicut');
  await homepage.verifyUserOnHomePage();
  await homepage.userSelectDateandTime();
  await homepage.userClickSearchButton();
  await bikedetailspage.verifyuserOnBikeDetailsPage();
});


test(`User can navigate to hamburger menu and close`, async ({ homepage }) => {
  await homepage.verifyUserNavigateToWebsite();
  await homepage.userSelecttheCity('calicut');
  await homepage.verifyUserOnHomePage();
  await homepage.userClickhamburgerMenu();
  await homepage.verifyUserOnHamburgerMenuSection();
  await homepage.userClickhamburgerCloseButton();
})

test(`Verify if chatbot is responding to user in web`, async ({ homepage }) => {
  await homepage.verifyUserNavigateToWebsite();
  await homepage.userSelecttheCity('calicut');
  await homepage.verifyUserOnHomePage();
  await homepage.userClickChatBotICon();
  await homepage.verifyChatWindowOpened();
  await homepage.userSendtheMsg('hi');
  await homepage.verifyIfTheChatBotRespondedToTheMessage();
})

test(`Verify user can navigate to offers page`, async ({ homepage }) => {
  await homepage.verifyUserNavigateToWebsite();
  await homepage.userSelecttheCity('cochin');
  await homepage.verifyUserOnHomePage();
  await homepage.userClickOffersButton();
  await homepage.verifyTitle("Offers in Cochin | Royal Brothers");
});

test(`Validate What's new Functionality working fine`, async ({ homepage }) => {
  await homepage.verifyUserNavigateToWebsite();
  await homepage.userSelecttheCity('cochin');
  await homepage.verifyUserOnHomePage();
  await homepage.hovertoWhatNewButton();
  await homepage.cilckOptionInDropdown('Adventures by RB');
  await homepage.verifyTitle('Adventures by RB');
});

test('Validate SortBy B correctly switching to the tab', async ({ homepage }) => {
  await homepage.verifyUserNavigateToWebsite();
  await homepage.userSelecttheCity('cochin');
  await homepage.verifyUserOnHomePage();
  await homepage.hovertoWhatNewButton();
  await homepage.cilckOptionInDropdown('Store by RB'),
  await homepage.verifyTitle('Shop Biker Tees, Jackets & Gears – Store by RB');
});


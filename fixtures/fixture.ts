import { test as base } from '@playwright/test';
import { HomePageClass } from '../pages/HomePage';
import { LoginPageClass } from '../pages/LoginPage';
import { BikeDetailsPageClass } from '../pages/BikeDetailspage';
import { StorePageClass } from '../pages/Storepage';

type fixturesPages ={
    homepage : HomePageClass,
    loginpage : LoginPageClass,
    bikedetailspage : BikeDetailsPageClass,
    storepage : StorePageClass,
}
export const test = base.extend<fixturesPages>({
  homepage: async ({ page }, use) => {
    const homepage = new HomePageClass(page);
    await homepage.gotoWebsite('/');
    await homepage.verifyUserOnCitySelectionPage();
    await use(homepage);
  },

  loginpage: async ({ page }, use) => {
    const loginpage = new LoginPageClass(page);
    await use(loginpage);
  },

  bikedetailspage: async ({ page }, use) => {
    const bikedetailspage = new BikeDetailsPageClass(page);
    await use(bikedetailspage);
  },


  storepage: async ({ page }, use) => {
    const storepage = new StorePageClass(page);
    await use(storepage);
  },


});

export {expect} from '@playwright/test';
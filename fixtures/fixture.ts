import { test as base } from '@playwright/test';
import { HomePageClass } from '../pages/homepage';
import { LoginPageClass } from '../pages/loginpage';
import { BikeDetailsPageClass } from '../pages/bikedetailspage';
import { StorePageClass } from '../pages/Storepage';
import { StoreProductDetailsClass } from '../pages/storeproductdeatilspage';
import { AdventureClass } from '../pages/adventureRBpage';
import { AdventureCheckoutClass } from '../pages/adventureCheckOutpage';
type fixturesPages ={
    homepage : HomePageClass,
    loginpage : LoginPageClass,
    bikedetailspage : BikeDetailsPageClass,
    storepage : StorePageClass,
    storeProductDetails : StoreProductDetailsClass;
    adventurePage : AdventureClass;
    adventureCheckoutPage : AdventureCheckoutClass;
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

  storeProductDetails: async ({ page }, use) => {
    const storeProductDetails = new StoreProductDetailsClass(page);
    await use(storeProductDetails);
  },

  storepage: async ({ page }, use) => {
    const storepage = new StorePageClass(page);
    await use(storepage);
  },

  adventurePage: async ({ page }, use) => {
    const adventurePage = new AdventureClass(page);
    await use(adventurePage);
  },

  adventureCheckoutPage: async ({ page }, use) => {
    const adventureCheckoutPage = new AdventureCheckoutClass(page);
    await use(adventureCheckoutPage);
  },


});

export {expect} from '@playwright/test';
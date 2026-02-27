import{test,expect} from '@playwright/test';
import { Homepage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { myAccountPage,  } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/Productpage';

let homepage: Homepage;
let searchResultsPage : SearchResultsPage;
let productPage : ProductPage;


test.beforeEach(async ({ page }) => {
   const config = new TestConfig();
   await page.goto(config.appUrl);
   homepage = new Homepage(page);
   searchResultsPage= new SearchResultsPage(page);
   productPage= new ProductPage(page);

   
}
)

test.afterEach(async({page})=>
{
   
   await page.waitForTimeout(5000);
    await page.close();
})

test('dsfgsrgdrg', async()=>
{
   await searchResultsPage.searchProducts("MacBook");
  await  searchResultsPage.clickSearchbuttom();
   await searchResultsPage.checkAndSelectProduct("MacBook Air");

await productPage.setProdQuantity('2');
await productPage.clickChecOut();
let cnfMsg =  await productPage.extractMessage();
expect(cnfMsg).toBe('Success: You have added MacBook Air to your shopping cart!×');

await productPage.clickonCart();
let TotalPrice = await productPage.extractPrice();
expect(TotalPrice).toBe("$2,404.00");

await productPage.ClickFinalCheckOut();
})


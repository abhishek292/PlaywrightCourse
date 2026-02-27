import{test,expect} from '@playwright/test';
import { Homepage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { myAccountPage,  } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config';


 let homepage:Homepage;
 let loginPage:LoginPage;
 let MyAccountPage:myAccountPage;
 let logoutPage:LogoutPage;
 let config:TestConfig;

test.beforeEach('Pre-reqs', async({page})=>
{
 config = new TestConfig();
 await page.goto(config.appUrl);
 homepage = new Homepage(page);
 loginPage = new LoginPage(page);
 MyAccountPage  = new myAccountPage(page);
 logoutPage = new LogoutPage(page);

}
)

test.afterEach('Wrap up activities', async({page})=>
{
await page.waitForTimeout(20000);
 await page.close();
})






test("verify login and logout @master",async()=>{



await homepage.clickOnMyAccount();
//
await homepage.clickOnLogin();
await loginPage.enterEmail(config.email);
await loginPage.enterPswd(config.password);
await loginPage.clickLogin();
await MyAccountPage.isPageExists();
await MyAccountPage.clickonDropdown();
await MyAccountPage.clickOnLogout();

await logoutPage.verifyLogOutMessage();


})

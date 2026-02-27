import{test,expect} from '@playwright/test';
import { Homepage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { myAccountPage,  } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config';
import { DataProvider } from '../Utils/dataProvider';


 const JsonPath='testdata/logindata.json';

 const jsonData = DataProvider.getTestDataFromJson(JsonPath);


for (let data of jsonData)
{

test(`verify logi and logout for ${data.testName}  @datadriven`,async({page})=>{

let config = new TestConfig();
 await page.goto(config.appUrl);
let  homepage = new Homepage(page);
let loginPage = new LoginPage(page);
let MyAccountPage  = new myAccountPage(page);
let logoutPage = new LogoutPage(page);

await homepage.clickOnMyAccount();

await homepage.clickOnLogin();
await loginPage.enterEmail(data.email);
await loginPage.enterPswd(data.password);
await loginPage.clickLogin();

if(data.expected.toLowerCase()==='success')
{
await MyAccountPage.isPageExists();
await MyAccountPage.clickonDropdown();
await MyAccountPage.clickOnLogout();

await logoutPage.verifyLogOutMessage();

await page.waitForTimeout(20000);
 await page.close();

}
else{
    await loginPage.validateLoginFailure();
}


})
}

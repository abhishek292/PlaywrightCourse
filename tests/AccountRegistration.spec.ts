import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { randomDataUtil } from '../Utils/randomDataGenerator';
import { TestConfig } from '../test.config';


let homepage: Homepage;
let registration: RegistrationPage;


test.beforeEach(async ({ page }) => {
   const config = new TestConfig();
   await page.goto(config.appUrl);
   homepage = new Homepage(page);
   registration = new RegistrationPage(page);
}
)

test.afterEach(async({page})=>
{
   
   await page.waitForTimeout(20000);
    await page.close();
})


test("user registration test", async () => {

   await homepage.clickOnMyAccount();

   await homepage.clickOnRegister();

   await registration.enterFirstName(randomDataUtil.getFirstName());
   await registration.enterlastName(randomDataUtil.getLastName());
   await registration.enterEmail(randomDataUtil.getEmail());
   await registration.enterTelephone(randomDataUtil.getPhoneNumber());

   let pswd = randomDataUtil.getPassword()
   await registration.enterPswd(pswd);
   await registration.confirmPaswd(pswd);

   await registration.checkTnC();


   await registration.clickContinue();

   await registration.verifyMsg();


})
import{test,expect} from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { Homepage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { myAccountPage,  } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { TestConfig } from '../test.config';
import { SearchResultsPage  } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/Productpage';
import { randomDataUtil } from '../Utils/randomDataGenerator';
import { config } from 'process';

let homepage: Homepage;
let registration: RegistrationPage;
let email :string;
let password:string;
let loginPage : LoginPage;
let MyAccountPage : myAccountPage;
let productPage:ProductPage;
let searchResultsPage : SearchResultsPage;

test.beforeEach(async ({ page }) => {
   const config = new TestConfig();
   await page.goto(config.appUrl);
   homepage = new Homepage(page);
   registration = new RegistrationPage(page);
   loginPage = new LoginPage(page);
   MyAccountPage= new myAccountPage(page);
   productPage= new ProductPage(page);
   searchResultsPage=new  SearchResultsPage(page);
}
)

test('end to end for demo Project @endtoend', async()=>
{
await registerCustomer();
await myAccountPageValidation();
await loginCustomer();
await selectProduct();

})

test.afterEach('sdasfs',async({page})=>

    {
    await page.waitForTimeout(20000);
    }
)


 async function registerCustomer() {
 
    await homepage.clickOnMyAccount();
    
       await homepage.clickOnRegister();
    
       await registration.enterFirstName(randomDataUtil.getFirstName());
       await registration.enterlastName(randomDataUtil.getLastName());
       email = randomDataUtil.getEmail()
       await registration.enterEmail(email);
       await registration.enterTelephone(randomDataUtil.getPhoneNumber());
    
        password = randomDataUtil.getPassword()
       await registration.enterPswd(password);
       await registration.confirmPaswd(password);
    
       await registration.checkTnC();
    
    
       await registration.clickContinue();
    
       await registration.verifyMsg();
    
}

async function myAccountPageValidation() {
   await MyAccountPage.clickonDropdown();
   await MyAccountPage.clickOnLogout();
    
} 


async function loginCustomer() {
await homepage.clickOnMyAccount();

await homepage.clickOnLogin();
await loginPage.enterEmail(email);
await loginPage.enterPswd(password);
await loginPage.clickLogin();
}

async function selectProduct() {
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
    
    
}
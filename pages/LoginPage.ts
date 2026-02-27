import{Locator, Page,expect} from '@playwright/test';

export class LoginPage{

    private readonly email:Locator;
    private readonly password:Locator;
    private readonly loginButton:Locator;
    private readonly errorMsg:Locator;

    constructor (page:Page)
{
   this.email= page.locator('#input-email');
   this.password= page.locator('#input-password');
   this.loginButton=page.locator('input[value="Login"]');
   this.errorMsg = page.locator('.alert.alert-danger.alert-dismissible');

}

async enterEmail(email:string)
{
 await this.email.fill(email);
}

async enterPswd(pswd:string)
{
 await this.password.fill(pswd);
}

async clickLogin()
{
 await this.loginButton.click();
}

async validateLoginFailure()
{
  let errorMessage =  await this.errorMsg.textContent();
  expect(errorMessage).toBe(' Warning: No match for E-Mail Address and/or Password.');
}


}
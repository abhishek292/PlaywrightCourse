import { Page, expect, Locator } from '@playwright/test';

export class RegistrationPage{

    private readonly page: Page;

    private readonly fName: Locator;
    private readonly lName: Locator;
    private readonly Email: Locator;
    private readonly Telephone: Locator;
    private readonly pswd: Locator;
     private readonly Cnfpswd: Locator;
      private readonly TnCBox: Locator;
      private readonly continue : Locator;
      private readonly telephone : Locator;
      private readonly creationMsg : Locator;

      constructor(page:Page)
      {
        this.page =page;
        this.fName = page.locator('#input-firstname');
        this.lName = page.locator('#input-lastname');
        this.Email = page.locator('#input-email');
        this.Telephone = page.locator('#input-telephone');
        this.pswd = page.locator('#input-password');
        this.Cnfpswd = page.locator('#input-confirm');
        this.TnCBox = page.locator('input[value="1"][name="agree"]');
        this.continue = page.locator('input[value="Continue"]');
        this.telephone = page.locator('#input-telephone');
        this.creationMsg = page.locator('div[id="content"] h1');


      }

      async enterFirstName(fName:string)
      {
      await  this.fName.fill(fName);
      }

      async enterlastName(lName:string)
      {
      await  this.lName.fill(lName);
      }
      
      async enterEmail(email:string)
      {
      await  this.Email.fill(email);
      }

      async enterTelephone(telephone:string)
      {
      await  this.telephone.fill(telephone);
      }

      async enterPswd(pswd:string)
      {
      await  this.pswd.fill(pswd);
      }
      async confirmPaswd(pswd:string)
      {
       await this.Cnfpswd.fill(pswd);
      }

      async checkTnC()
      {
      await  this.TnCBox.click();
      }

      async clickContinue()
      {
      await   this.continue.click();
      }

      async verifyMsg()
      {
      let creationMessage= await this.creationMsg.textContent();
      expect(creationMessage).toEqual('Your Account Has Been Created!');
      }





}
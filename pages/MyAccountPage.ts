import{Locator, Page,expect} from '@playwright/test';

export class myAccountPage{

    private readonly pageTitle:Locator;
     private readonly logoutdropDown:Locator;
     private readonly logoutButton:Locator;

    constructor (page:Page)
    {
        this.pageTitle= page.locator('h2:nth-child(1)');
        this.logoutdropDown= page.locator('.caret');
        //this.logoutButton=page.locator('li a[href="http://localhost/opencart/upload/index.php?route=account/logout"]');
        this.logoutButton=page.locator('li a[href="https://tutorialsninja.com/demo/index.php?route=account/logout"]');
    }

    async isPageExists()
    {
        
        expect(this.pageTitle).toBeTruthy();
    }

     async clickonDropdown()
    {
        
         await this.logoutdropDown.click()
    }

     async clickOnLogout()
    {
        
        await this.logoutButton.click();
    }



}
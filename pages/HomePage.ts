import { Page, expect, Locator } from '@playwright/test';

export class Homepage {

    private readonly page: Page;

    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly linkLogin: Locator;
    private readonly txtsearchInbox: Locator;
    private readonly btnSearch: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lnkMyAccount = page.locator('.caret');
        this.lnkRegister = page.locator('a[href="http://localhost/opencart/upload/index.php?route=account/register"]');
        this.linkLogin = page.locator('li a[href="http://localhost/opencart/upload/index.php?route=account/login"]');
        this.txtsearchInbox = page.locator('input[placeholder="Search"]');
        this.btnSearch = page.locator('.fa.fa-search');
    }

    async isPageExist() {
        let title: string = await this.page.title();
        if (title) {
            return true;
        }
        return false;
    }

    async clickOnMyAccount() : Promise<void> {
    await this.lnkMyAccount.click();
    }

    async clickOnRegister() : Promise<void> {
    await this.lnkRegister.click();
    }

    async clickOnLogin() : Promise<void> {
   await this.linkLogin.click();
    }

    async enterTextInSearchBox() {
    await    this.txtsearchInbox.fill("Samsung");
    }

    async clickOnsearchButton()
    {
      await  this.btnSearch.click();
    }

}

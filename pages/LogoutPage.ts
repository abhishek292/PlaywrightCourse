import {Locator, Page,expect} from '@playwright/test';

export class LogoutPage{
    private readonly logoutMessage:Locator;


    constructor(page:Page)
    {
        this.logoutMessage=page.locator('div[id="content"] h1');
    }

    async verifyLogOutMessage()
    {
        expect( await this.logoutMessage.textContent()).toBe('Account Logout');
    }
}

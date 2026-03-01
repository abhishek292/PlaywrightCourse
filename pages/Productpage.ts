import { Page, expect, Locator } from '@playwright/test';

export class ProductPage{

    private readonly setQuantity: Locator;
    private readonly checkOut: Locator;
    private readonly cnfMsg: Locator;
    private readonly cartSection:Locator;
    private readonly TotalCost : Locator;
    private readonly checkOutFinal : Locator;
    private readonly page : Page;

    constructor(page:Page)
    {
      this.page = page;
        this.setQuantity=page.locator('#input-quantity');
        this.checkOut=page.locator('#button-cart');
        this.cnfMsg=page.locator('.alert.alert-success.alert-dismissible');
        this.cartSection=page.locator('button[data-loading-text="Loading..."]');
        this.TotalCost=page.locator('//tr/td/strong[text()="Total"]/parent::td/following-sibling::td');
        this.checkOutFinal=page.locator("a[href='https://tutorialsninja.com/demo/index.php?route=checkout/checkout']");
    }
    
    async setProdQuantity(quantity:string)
    {
       await this.setQuantity.fill(quantity);
    }

     async clickChecOut()
    {
      this.page.waitForTimeout(2000);
      
      await  this.checkOut.click();
    }

     async extractMessage() : Promise<string|null>
    {
      let cnfMSG = await this.cnfMsg.textContent();
        return cnfMSG;
    }

     async clickonCart()
    {
      await  this.cartSection.nth(0).click();
    }

     async extractPrice() : Promise<string|null>
    {
      let Total = await  this.TotalCost.textContent();
      return Total;
    }

    async ClickFinalCheckOut()
    {
      await this.checkOutFinal.nth(1).click();
    }

    
}
import{Locator, Page,expect} from '@playwright/test';

export class SearchResultsPage{
private readonly searchBox:Locator;
private readonly searchButton:Locator;
private readonly searchResults :Locator;

constructor(page:Page)
{
    this.searchBox= page.locator('input[placeholder="Search"]');
    this.searchButton =page.locator('button[class="btn btn-default btn-lg"]');
    this.searchResults = page.locator('h4>a');
}

async searchProducts(productname:string)
{
    await this.searchBox.fill(productname);
}
async clickSearchbuttom()
{
    await this.searchButton.click();
}
async checkAndSelectProduct(productname:string)
{
     const productCount = await this.searchResults.count();
        let productExists:boolean=false;
     for (let i = 0; i < productCount; i++) {
        let productName =  await this.searchResults.nth(i).textContent();
        if(productName===productname)
        {
            this.searchResults.nth(i).click();
            productExists=true;
            return;
        }
     }
     if(productExists===false)
     {
        console.log("product does not exist")
     }
}


}
const {expect} = require('@playwright/test')
const productPage = require('./ProductPage')
class SearchPage
{
    constructor(page)
    {
        this.page = page
        this.productPage = new productPage(page)
    }

    async gotourl()
    {
        await this.page.goto("https://awesomeqa.com/ui/index.php")
    }

    async search(productName)
    {
        await this.page.locator("//input[@placeholder='Search']").click();
        await this.page.getByRole('textbox', { name: 'Search', exact: true }).fill(productName);
        await this.page.getByRole('textbox', { name: 'Search', exact: true }).press('Enter');
        await this.productSearch(productName)
    }

    async searchCriteria(Name)
    {
        await this.page.keyboard.press('Control+A')
        await this.page.getByPlaceholder("Keywords").fill(Name)
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'load' }),
            await this.page.keyboard.press('Enter')  // example button that causes navigation
          ]);
        await this.productSearch(Name)
    }

    async productSearch(productName){
        
        switch(productName)
        {
            case "macbook":
                await this.productPage.macbook()
                break;
            case "apple":
                await this.productPage.apple()
                break;
        }
    }

    async getIntoMac()
    {
        //get inside of one product
        await this.page.locator("//a[normalize-space()= 'MacBook']").click()
        //valid product url link
        if(await this.page.locator("#button-cart").isVisible()){
            await expect(this.page).toHaveURL("https://awesomeqa.com/ui/index.php?route=product/product&product_id=43&search=macbook")
        }
    }

    async InvalidProductName(productName){
        await this.page.getByRole('textbox', { name: 'Search' }).click();
        await this.page.getByRole('textbox', { name: 'Search', exact: true }).fill(productName);
        await this.page.getByRole('textbox', { name: 'Search', exact: true }).press('Enter');
        await expect(await this.page.locator("//p[contains(text(),'There is no product that matches the search criter')]")).toBeVisible()
    }

    async categoriesOption(productName,option)
    {
        let optionValue;
        switch(option)
        {
            case "allcategories"||"Allcategories":
                optionValue = "0";
                break;
            case "Desktop" || "desktop":
                optionValue = "20";
                break;
            case "Mac":
                optionValue = "27";
                break;
            case "Laptop" ://|| "laptop" || "Notebooks" || "notebooks":
                optionValue = "18";
                break;
            case "Monitors" || "monitors":
                optionValue = "28";
                break;
            case "Tablets" || "tablets":
                optionValue = "57";
                break;
            case "Phones & PDAs" || "PHONES & PDAS":
                optionValue = "24";
                break;
            case "Cameras" || "cameras":
                optionValue = "33";
                break;
            case "MP3 Players" || "mp3 players":
                optionValue = "34";
                break;
        }
        await this.page.locator("//select[@name='category_id']").selectOption({value: optionValue})
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'load' }),
            await this.page.locator('#button-search').click()  // example button that causes navigation
          ]);
        await this.verifyProductDetailsWithCategories(productName,optionValue)
    }

    async verifyProductDetailsWithCategories(productName,optionValue)
    {
        if(productName == "mac"||"MAC")
        {
            let count = await this.page.locator("//body/div[@id='product-search']/div[@class='row']/div[@id='content']/div[3]/div").count()
            if(optionValue==0)
                {
                    await expect(count).toBe(3)
                }
                else if(optionValue==20)
                {
                    await expect(count).toBe(2)
                }
                else if(optionValue==27)
                {
                    await expect(count).toBe(1)
                }
                else if(optionValue==18)
                {
                    await expect(count).toBe(3)
                }
        }
    }

    async searchWithSortByOption(sortingOrder)
    {
        //clicking option from drop down
        let sortValue;
        switch(sortingOrder)
        {
            case "a-z":
                sortValue = 'https://awesomeqa.com/ui/index.php?route=product/search&sort=pd.name&order=ASC&search=Mac&category_id=18'
                break;
            case "z-a":
                sortValue = 'https://awesomeqa.com/ui/index.php?route=product/search&sort=pd.name&order=DESC&search=Mac&category_id=18'
                break;
            case "Price(Low>High)":
                sortValue = 'https://awesomeqa.com/ui/index.php?route=product/search&sort=p.price&order=ASC&search=Mac&category_id=18'
                break;
            case "Price(High>Low)":
                sortValue = 'https://awesomeqa.com/ui/index.php?route=product/search&sort=p.price&order=DESC&search=Mac&category_id=18'
                break;
            case "Rating (Highest)":
                sortValue = 'https://awesomeqa.com/ui/index.php?route=product/search&sort=rating&order=DESC&search=Mac&category_id=18'
                break;
            case "Rating (Lowest)":
                sortValue = 'https://awesomeqa.com/ui/index.php?route=product/search&sort=rating&order=ASC&search=Mac&category_id=18'
                break;
        }
        await Promise.all(
            [
                this.page.waitForNavigation({waitUntil: "load"}),
                await this.page.locator("//select[@id='input-sort']").selectOption({value: sortValue})
            ]
        )
    }

    async VerifySortByOptionResult(sortingOrder)
    {
        //counting the results
        let productLocators, count, product = [], sortedProduct, mappedProduct;
        if(sortingOrder == 'a-z' || sortingOrder == 'z-a')
        {
            productLocators = await this.page.locator("div.product-thumb h4 a")
            count= await productLocators.count()
        }
        else if(sortingOrder === 'Price(Low>High)'||'Price(High>Low)')
        {
            productLocators = await this.page.locator("div.product-thumb p.price")
            count= await productLocators.count()
        }
        //getting the text from results
        for(let i=0;i<count;i++)
        {
            let name=await productLocators.nth(i).textContent()
            name= name.trim().split("Ex Tax")[0].replace(/[^0-9.]/g, '').trim()
            product.push(name)
            //console.log(product)
        }

        //verifying the products based on the sortings
        switch(sortingOrder)
        {
            case 'a-z':
                sortedProduct = [...product].sort((a,b)=>a.localeCompare(b))
                await expect(product).toEqual(sortedProduct);
                break;
            case 'z-a':
                sortedProduct = [...product].sort((a,b)=>a<b)
                await expect(product).toEqual(sortedProduct);
                break;
            case 'Price(Low>High)':
                mappedProduct = ([...product].map(Number))
                sortedProduct = mappedProduct.sort((a,b)=>a-b)
                //console.log(mappedProduct)
               await expect(mappedProduct).toEqual(sortedProduct);
                break;
            case 'Price(High>Low)':
                mappedProduct = ([...product].map(Number))
                sortedProduct = mappedProduct.sort((a,b)=>a>b)
                //console.log(mappedProduct)
                await expect(mappedProduct).toEqual(sortedProduct);
                break;
        }
        
    }
}

module.exports = SearchPage
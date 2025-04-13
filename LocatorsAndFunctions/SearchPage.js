import {expect} from '@playwright/test'



class SearchPage{
    constructor(page){
        this.page =page,
        this.searchBar = page.getByPlaceholder("Search")
        this.appleDiv = page.locator(".product-layout.product-grid.col-lg-3.col-md-3.col-sm-6.col-xs-12")
        this.appleLink = page.getByRole("link",{name:"Apple Cinema 30"})
        this.applePrice = page.locator('//span[@class="price-new"]')
        this.img = page.getByAltText('Apple Cinema 30"')
        this.criteriaBox = page.getByPlaceholder("Keywords")
        this.categories = page.locator("//select[@name='category_id']")
    }

    async Search(searchName,searchCriteria,searchBoxName){
        await this.searchBar.fill(searchName)
        await this.page.keyboard.press("Enter")
        if(searchCriteria == "searchCriteriaBox")
        {
            await this.criteriaBox.fill(searchBoxName)
            await this.categories.selectOption({label: "      Monitors"})
            await this.page.keyboard.press("Enter")
        }
        if (await this.appleDiv.isVisible())
        {
            await expect(this.appleLink).toHaveText("Apple Cinema 30")
            await expect(this.applePrice).toHaveText("$110.00")
            await expect(this.img).toBeVisible()
            
        
        }
        if(searchName ==="apple")
        {
           await  expect(this.appleDiv).toHaveCount(1)
           //await expect(this.img).toHaveScreenshot("Apple.png")
        }
    }
}

module.exports= SearchPage
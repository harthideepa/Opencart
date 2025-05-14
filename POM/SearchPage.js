const {expect} = require('@playwright/test')
class SearchPage
{
    constructor(page)
    {
        this.page = page
    }

    async gotourl()
    {
        await this.page.goto("https://awesomeqa.com/ui/index.php")
    }

    async search(productName)
    {
        await this.page.getByRole('textbox', { name: 'Search' }).click();
        await this.page.getByRole('textbox', { name: 'Search', exact: true }).fill(productName);
        await this.page.getByRole('textbox', { name: 'Search', exact: true }).press('Enter');
        switch(productName)
        {
            case "macbook":
                await this.macbook()
                break;
        }

    }

    async macbook()
    {
        const macCount = await this.page.locator("//body/div[@id='product-search']/div[@class='row']/div[@id='content']/div[3]/div").count()
        await expect(macCount).toBe(3)
        const div1= await this.page.locator('//body[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/h4[1]/a[1]')
        const div2= await this.page.locator('//body[1]/div[2]/div[1]/div[1]/div[3]/div[2]/div[1]/div[2]/div[1]/h4[1]/a[1]')
        const div3= await this.page.locator('//body[1]/div[2]/div[1]/div[1]/div[3]/div[3]/div[1]/div[2]/div[1]/h4[1]/a[1]')
        await expect(div1).toContainText("MacBook")
        await expect(div2).toContainText("MacBook Air")
        await expect(div3).toContainText("MacBook Pro")
    }
}

module.exports = SearchPage
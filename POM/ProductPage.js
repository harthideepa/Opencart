const {expect} = require('@playwright/test')
class ProductPage
{
    constructor(page)
    {
        this.page = page
    }
    async macbook()
    {
        //count
        const macCount = await this.page.locator("//body/div[@id='product-search']/div[@class='row']/div[@id='content']/div[3]/div").count()
        await expect(macCount).toBe(3)
        //each items locators
        const div1= await this.page.locator('//body[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/h4[1]/a[1]')
        const div2= await this.page.locator('//body[1]/div[2]/div[1]/div[1]/div[3]/div[2]/div[1]/div[2]/div[1]/h4[1]/a[1]')
        const div3= await this.page.locator('//body[1]/div[2]/div[1]/div[1]/div[3]/div[3]/div[1]/div[2]/div[1]/h4[1]/a[1]')
        //verify product name 
        await expect(div1).toContainText("MacBook")
        await expect(div2).toContainText("MacBook Air")
        await expect(div3).toContainText("MacBook Pro")
    }


    async apple()
    {
          //count
          let appleCount = await this.page.locator("//body/div[@id='product-search']/div[@class= 'row']/div[@id='content']/div[@class='row'][3]/div").count()
          await expect(appleCount).toBe(1)
    }

}

module.exports = ProductPage
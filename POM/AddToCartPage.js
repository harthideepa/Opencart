const {expect} = require('@playwright/test');

class AddCartPage
{
    constructor(page)
    {
        this.page = page
        this.getCountItemsBefore;
        this.productPrice;
        this.priceXpathLocator;
        this.productLabels;
        this.cartPriceDetails;
    }
    async urlLink()
    {
        await this.page.goto("https://awesomeqa.com/ui/")
    }

    async cartCount()
    {
        //get count before adding to cart
        let cartLocator = await this.page.locator("#cart-total").textContent()
        return  Number(cartLocator.split("item")[0].replace(/[^0-9.]/g,"").trim())
    }
    async fillDetailsToAdd()
    {
        //fill all the necessary details to add to cart
        await this.page.locator("//input[@value='6']").check()
        await this.page.locator("//input[@value='9']").check()
        await this.page.locator("//input[@value='11']").check()
        await this.page.locator("#input-option208").type("Send item immediately")
        await this.page.locator("#input-option217").selectOption({value:'3'})
        await this.page.locator("#input-option209").fill("This product has very good features and also has fast RAM")

        //Choosing the file without an input field(when input field is hidden)
        let [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.locator("#button-upload222").click()
        ])
        await fileChooser.setFiles('./UploadFiles/appleUploadFile.png')
        await this.page.waitForTimeout(1000)
        
    }
    async productLocators(product)
    {
        //pickup the xpath for the specific product
        if(product === 'macbook')
            {
                this.priceXpathLocator = "//body[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/p[2]"
                this.productLabels = await this.page.locator("(//a[normalize-space()='MacBook'])")
            }
            else if(product === 'apple')
            {
                this.priceXpathLocator = ".price-new"
                this.productLabels = await this.page.locator('(//a[normalize-space()="Apple Cinema 30\""])')
            }
            else if(product === 'macbook Air')
            {
                this.priceXpathLocator = "//body[1]/div[2]/div[1]/div[1]/div[3]/div[2]/div[1]/div[2]/div[1]/p[2]"
                this.productLabels = await this.page.locator("(//a[normalize-space()='MacBook Air'])")
            }
            else if(product === 'macFromHomepage')
            {
                this.priceXpathLocator = "//body[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/p[2]"
                this.productLabels = await this.page.locator("(//a[normalize-space()='MacBook'])")
            }
            else if(product === 'iphone')
            {
                this.priceXpathLocator = '//p[@class="price"]'
                this.productLabels = await this.page.locator("(//a[normalize-space()='iPhone'])")
            }
    }
    async stockAvailability()
    {
         //Check Availability 
         await this.productLabels.click()
         await this.page.waitForLoadState('load')
         let availability = await this.page.locator("(//ul[@class='list-unstyled'])[8]/li").last().textContent()
         let addToCatEnabled = await this.page.locator("//button[@id='button-cart']").isEnabled()
         if(availability=== 'Availability: In Stock')
         {
             expect(addToCatEnabled).toBeTruthy()  
         }
         else
         {
             expect(addToCatEnabled).toBeFalsy()
         }
    }
    async getProductPrice()
    {
        let priceLocator = await this.page.locator(this.priceXpathLocator).textContent()
        this.productPrice = Number(priceLocator.split("Ex Tax:")[0].replace(/[^0-9.]/g,"").trim())
        console.log('Product Price '+this.productPrice)
    }
    async getCartPriceDetails()
    {
        let checkPriceLocator = await this.page.locator("#cart-total").textContent()
        this.cartPriceDetails = Number(checkPriceLocator.split("$")[1].replace(/[^0-9.]/g,"").trim())
        console.log(`Price is ${this.cartPriceDetails}`)
    }
    async VerificationMessage()
    {
        return await this.page.locator(".alert.alert-success.alert-dismissible")
    }

    async addtocartItems(product)
    {
        //get the count before adding the product to cart
        this.getCountItemsBefore = await this.cartCount()

        //Get the product locators
        await this.productLocators(product)

        //get the price of the cart
        await this.getProductPrice()

        //add to cart action
        switch(product)
        {
            case "macbook": 
                await this.page.locator('div.product-thumb:has-text("MacBook") button[onclick*="cart.add"]').first().click()
                break;
            case  "apple":
                await this.page.locator(".hidden-xs.hidden-sm.hidden-md").last().click()
                await this.fillDetailsToAdd()
                await this.page.locator("#button-cart").click()//click button to add the cart
                break;
            case "macbook Air":
                await this.page.locator('div.product-thumb:has-text("MacBook Air") button[onclick*="cart.add"]').click()
                break;
            case "macFromHomepage":
                await this.page.locator("(//button[@type='button'])[7]").click()
        }
    }

    async cartVerifications(product)
    {
        let getCountItemsAfter;

        //Message Verification for successfully added
        let message = await this.VerificationMessage()
        await expect(message).toHaveText(/You have added .*/)
        await this.page.waitForTimeout(1000)  

        //Check count verification
        getCountItemsAfter = await this.cartCount()
        console.log("count After added to cart "+getCountItemsAfter)
        await expect(getCountItemsAfter).toBeGreaterThan(this.getCountItemsBefore)

        //check price details in cart
        await this.getCartPriceDetails()
        if(product ==='apple')
        {
            let toBeAmount = this.productPrice+206
            expect(this.cartPriceDetails).toBe(toBeAmount)
        }
        else 
        {
            expect(this.cartPriceDetails).toBe(this.productPrice)
        }
    }

    async RemoveCartItems(RemovableProduct)
    {
        let ProductName;
        //to ensure the page is idle 
        await this.page.waitForLoadState('networkidle');

        //get the count from cart
        let CountBeforeRemoved = await this.page.locator('//body[1]/header[1]/div[1]/div[1]/div[3]/div[1]/ul[1]/li[1]/table[1]/tbody[1]/tr').count()
        console.log("count in the cart before removal " + CountBeforeRemoved)

        //check each and every row for the removable productname and if the name matches then check the visiblity and click the button to remove
        for (let i=1;i<=CountBeforeRemoved;i++)
        {
            ProductName = await this.page.locator(`//table[@class="table table-striped"]/tbody/tr[${i}]/td[2]/a`).textContent()

            if (ProductName===RemovableProduct)
            {
                //make the remove button visible 
                await this.page.locator(".btn.btn-inverse.btn-block.btn-lg.dropdown-toggle").click()
                //remove the item
                await this.page.locator(`//table[@class="table table-striped"]/tbody/tr[${i}]/td[5]/button`).click()
            }
        }

        //verify cart count post removal
        await this.page.waitForTimeout(1000)
        let countAfterRemoval = await this.page.locator('//body[1]/header[1]/div[1]/div[1]/div[3]/div[1]/ul[1]/li[1]/table[1]/tbody[1]/tr').count()
        expect(countAfterRemoval).toBeLessThanOrEqual(CountBeforeRemoved)
    }
    async addWithoutRequireddetails()
    {
        let beforeCount= await this.cartCount()
        await this.page.locator(".hidden-xs.hidden-sm.hidden-md").last().click()
        await this.page.locator("#button-cart").click()

        //Verify - item is added or not
        await this.page.waitForTimeout(1000)
        let count = await this.page.locator("//div[@class='text-danger']").count()
        expect(count).toBe(5)

        //verify cart count
        let afterClicked = await this.cartCount()
        expect(afterClicked).toBeLessThanOrEqual(beforeCount)
    }

    async AddQuantity(quantity)
    {
        await this.page.locator(".hidden-xs.hidden-sm.hidden-md").last().click()
        await this.fillDetailsToAdd()
        await this.page.locator("#input-quantity").fill(quantity)
        await this.page.locator("#button-cart").click()//click button to add the cart
        await this.page.waitForTimeout(1000)
        let count = await this.cartCount()
        console.log(count)
        expect(count).toBeGreaterThanOrEqual(2)
    }

    async viewcart()
    {
        await this.page.locator("//button[@class='btn btn-inverse btn-block btn-lg dropdown-toggle']").click()
        await this.page.locator("//body//header//div[@id='cart']//div//a[1]").click()
    }
    async cartRowCount()
    {
        let RowLocator = await this.page.locator('//div[@class="table-responsive"]/table[@class="table table-bordered"]/tbody/tr')
        return await RowLocator.count()
    }
    async emptyTheCart()
    {
        //get the cart row count
        let count = await this.cartRowCount() 
        console.log(count)
        
        for (let i=1;i<=count;i++)
        {
            let removeButon = await this.page.locator(`//div[@class="table-responsive"]/table[@class="table table-bordered"]/tbody/tr[1]/td[4]/div/span/button[@data-original-title="Remove"]`)
            await removeButon.click()
            await this.page.waitForTimeout(500)
        }
    }

    async viewcartQuantityChange(quantity)
    {
        //update the quantity
        let divLocator = await this.page.locator("//tbody/tr[1]/td[4]/div[1]/input")
        let quantityNameAttribute = await divLocator.getAttribute("name")
        await this.page.locator(`//input[@name='${quantityNameAttribute}']`).fill("")
        await this.page.locator(`//input[@name='${quantityNameAttribute}']`).type(quantity)
        await this.page.locator('//span[@class="input-group-btn"]/button[@data-original-title="Update"]').first().click()
        await this.page.waitForTimeout(1000)

        //verify message
        let message = await this.VerificationMessage()
        await expect(message).toHaveText(/Success: You have modified your shopping cart*/)

        //check total count
        let amount = await this.page.locator('//body/div[2]/div[2]/div[@id="content"]/div[@class="row"]/div/table/tbody[1]/tr[2]/td[2]')
        expect(amount).toContainText("$2,000.00")
        await this.page.waitForTimeout(1000)

        //clear the cart
        await this.emptyTheCart()

        
    }
}
module.exports = AddCartPage
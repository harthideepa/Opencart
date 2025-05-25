const {expect} = require('@playwright/test');
class checkoutPage{

    constructor(page)
    {
        this.page = page;
    }
    async urlLink()
    {
        await this.page.goto("https://awesomeqa.com/ui/")
    }
    async checkout()
    {
        await this.page.getByRole('link', { name: 'Checkout', exact: true }).click(); 
    }
    async checkoutOptionsVisibility()
    {
        let login = await this.page.locator("//h2[normalize-space()='Returning Customer']")
        return await login.isVisible
    }
    async login()
    {
        await this.page.locator("//input[@id='input-email']").fill("deepa@gmail.com")
        await this.page.locator("//input[@id='input-password']").fill("IceCream@2")
        await this.page.locator("//input[@id='button-login']").click()
    }
    async billingAddress()
    {
        //select new adrees to add
        await this.page.locator("//input[@value='new']").check()
        await this.page.getByRole('textbox', { name: '* First Name' }).fill('Harthi');
        await this.page.getByRole('textbox', { name: '* Last Name' }).fill('Deepa');
        await this.page.getByRole('textbox', { name: '* Address' }).fill('Address 1 dummy');
        await this.page.getByRole('textbox', { name: '* City' }).fill('bengaluru');
        await this.page.getByRole('textbox', { name: '* Post Code' }).fill('567605');
        await this.page.getByLabel('Country').selectOption('99');
        await this.page.getByLabel('Region / State').selectOption('1489');
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }
    async deliveryAddress()
    {
        
        await this.page.locator("input[value='existing'][name='shipping_address']").check()
        await this.page.locator("//input[@id='button-shipping-address']").click();
    }
    async shippingMethod()
    {
        await this.page.locator("//label[normalize-space()='Flat Shipping Rate - $5.00']").check()
        await this.page.locator("//input[@id='button-shipping-method']").click();
    }
    async paymentMethod(action)
    {
        await this.page.locator("//input[@name='payment_method']").check()
        //await this.page.locator("//div[@id='collapse-payment-method']//textarea[@name='comment']").fill('No other options to select here apart from cash on delivery');
        if(action === "check")
        {
            await this.page.getByRole('checkbox').check();
        }
        
        await this.page.locator("//input[@id='button-payment-method']").click();
    }
    async confirmOrder()
    {
        let total = await this.page.locator("//body[1]/div[2]/div[1]/div[1]/div[1]/div[6]/div[2]/div[1]/div[1]/table[1]/tfoot[1]/tr[3]/td[2]")
        expect(total).toContainText("1,505.00")
        await this.page.locator("//input[@id='button-confirm']").click();
        await this.page.getByRole('link', { name: 'Continue' }).click();
    }
    async verifyValidateMessage()
    {
        let validatemsg = await this.page.locator("//div[@class='alert alert-danger alert-dismissible']")
        await expect(validatemsg).toContainText("Warning: You must agree to the Terms & Conditions!")
    }
}

module.exports = checkoutPage;
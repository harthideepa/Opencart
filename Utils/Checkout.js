const { log } = require('console');
const checkoutpage = require ('../POM/CheckoutPage')
const {expect} = require('@playwright/test');
class Checkout{
    constructor(page)
    {
        this.page = page;
        this.CheckoutPage = new checkoutpage(page)
    }
    async gotourl()
    {
        await this.CheckoutPage.urlLink()
    }
    async checkout()
    {
        await this.CheckoutPage.checkout()
        await this.CheckoutPage.billingAddress()
        await this.CheckoutPage.deliveryAddress()
        await this.CheckoutPage.shippingMethod()
        await this.CheckoutPage.paymentMethod("check")
        await this.CheckoutPage.confirmOrder()
    }
    async checkoutWithoutLogin()
    {
        await this.CheckoutPage.checkout()
        let visibility=this.CheckoutPage.checkoutOptionsVisibility()
        if(visibility)
        {
            await this.CheckoutPage.login()
        }
        await this.CheckoutPage.billingAddress()
        await this.CheckoutPage.deliveryAddress()
        await this.CheckoutPage.shippingMethod()
        await this.CheckoutPage.paymentMethod()
        await this.CheckoutPage.confirmOrder()
    }
    async checkoutWithoutTerms()
    {
        await this.CheckoutPage.checkout()
        await this.CheckoutPage.billingAddress()
        await this.CheckoutPage.deliveryAddress()
        await this.CheckoutPage.shippingMethod()
        await this.CheckoutPage.paymentMethod("uncheck")
        await this.CheckoutPage.verifyValidateMessage()
    }

}
module.exports = Checkout;
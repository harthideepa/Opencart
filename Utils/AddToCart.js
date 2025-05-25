const addtocartLocator = require ('../POM/AddToCartPage')
const {expect} = require('@playwright/test');

class AddToCart{
    constructor(page)
    {
        this.page = page
        this.cartLocators = new addtocartLocator(page)
    }
    async gotourl()
    {
        await this.cartLocators.urlLink()
    }
    async ClickAddToCart(product)
    {
        await this.cartLocators.addtocartItems(product)
    }
    async verifyCart(product)
    {
        await this.cartLocators.cartVerifications(product)
    }
    async RemoveCartItems(RemovableProduct)
    {
        await this.cartLocators.RemoveCartItems(RemovableProduct)
    }
    async AddCartWithoutDetails()
    {
        await this.cartLocators.addWithoutRequireddetails()
    }
    async AddQuantity(quantity)
    {
        await this.cartLocators.AddQuantity(quantity)
    }
    async stockAvailability(product)
    {
        await this.cartLocators.productLocators(product)
        await this.cartLocators.stockAvailability()
    }
    async viewcart()
    {
        await this.cartLocators.viewcart()
    }
    async viewcartQuantityChange(quantity)
    {
        await this.cartLocators.viewcartQuantityChange(quantity)
    }
    async emptyTheCart()
    {
        await this.cartLocators.emptyTheCart()
    }
}

module.exports = AddToCart
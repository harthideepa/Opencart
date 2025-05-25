const {test} = require ('@playwright/test')
const addToCart = require('../Utils/AddToCart') 
const find = require('../Utils/Search')
const login = require('../Utils/Login')

test.describe("Add to cart", async ()=>{
    let AddToCartFunction, searchfunction ,loginFunction;
    test.beforeEach(async ({page})=>{
        AddToCartFunction=new addToCart(page)
        searchfunction = new find(page)
        loginFunction = new login(page)
        AddToCartFunction.gotourl()
    })
    test("with search result page", async ()=>{
        await searchfunction.searchProduct('macbook')
        await AddToCartFunction.ClickAddToCart("macbook")
        await AddToCartFunction.verifyCart("macbook")
    })
    test.fail("with all details filled up", async ()=>{
        await searchfunction.searchProduct('apple')
        await AddToCartFunction.ClickAddToCart("apple")
        await AddToCartFunction.verifyCart("apple")
    })
    test("Remove Item from the cart", async ()=>{
        await searchfunction.searchProduct('macbook')
        await AddToCartFunction.ClickAddToCart("macbook")
        await searchfunction.searchProduct('macbook')
        await AddToCartFunction.ClickAddToCart("macbook Air")
        await AddToCartFunction.RemoveCartItems("MacBook")
    })
    test("From HomePage", async ()=>{
        await AddToCartFunction.ClickAddToCart("macFromHomepage")
        await AddToCartFunction.verifyCart("macFromHomepage")
    })
    test("add to cart without the required details ", async () => {
        await searchfunction.searchProduct('apple')
        await AddToCartFunction.AddCartWithoutDetails()
    })
    test.fail("with less quantity", async ()=>{
        await searchfunction.searchProduct('apple')
        await AddToCartFunction.AddQuantity("1")
    }) //Able to add less quantity when there is condition  to add minimum
    test("with more quantity", async ()=>{
        await searchfunction.searchProduct('apple')
        await AddToCartFunction.AddQuantity("3")
    })
    test.fail("with out of stock", async ()=>{
        await searchfunction.searchProduct('iphone')
        await AddToCartFunction.stockAvailability("iphone") 
    })
    test("when logout and when login the item should be persist", async ()=>{
        await searchfunction.searchProduct('macbook')
        await AddToCartFunction.ClickAddToCart("macbook")
        await AddToCartFunction.verifyCart("macbook")
        await loginFunction.loginUser("Harshat@gmail.com","IceCream@2")
    })
    test("and update the quantity in cart page", async ()=>{
        await loginFunction.loginUser("Harshat@gmail.com","IceCream@2")
        await searchfunction.searchProduct('macbook')
        await AddToCartFunction.ClickAddToCart("macbook")
        await searchfunction.searchProduct('macbook')
        await AddToCartFunction.ClickAddToCart("macbook Air")
        await AddToCartFunction.viewcart()
        await AddToCartFunction.viewcartQuantityChange("2")
    })
    test("and empy the cart", async ()=>{
        await loginFunction.loginUser("Harshat@gmail.com","IceCream@2")
        await searchfunction.searchProduct('macbook')
        await AddToCartFunction.ClickAddToCart("macbook")
        await searchfunction.searchProduct('macbook')
        await AddToCartFunction.ClickAddToCart("macbook Air")
        await AddToCartFunction.viewcart()
        await AddToCartFunction.viewcartQuantityChange("2")
    })
} )
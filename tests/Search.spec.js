const {test,expect} = require('@playwright/test')
const Search = require('../Utils/Search')

test.describe("search the product", async () => {
    let searchFunction;
    test.beforeEach(async ({page})=>{
        searchFunction = new Search(page)
        await searchFunction.gotoURL()
    })

    test("with valid product details", async () => {
        await searchFunction.searchProduct("macbook")
    })
    test("with valid product details - case senitive", async () => {
        await searchFunction.searchProduct("MACBOOK")
    })
    test("with Invalid product details", async () => {
        await searchFunction.SearchInvalid("wertert5")
    })
    test("with no  product available", async () => {
        await searchFunction.SearchInvalid("windows")
    })
    test("with empty details", async () => {
        await searchFunction.SearchInvalid("")
    })
    test("and Click the search product to get into the specific page", async ({})=>{
        await searchFunction.searchProduct("macbook")
        await searchFunction.verifyMacPage()
    })
    test("with search Criteria", async ()=>{
        await searchFunction.searchProduct("Mac")
        await searchFunction.searchProductCriteria("apple")
    })

    test("with category Option with AllCategories", async ()=>{
        await searchFunction.searchProduct("apple")
        await searchFunction.searchProductCriteria("Mac") 
        await searchFunction.CheckWithCategories("mac","Laptop")
    })
    test("with sorting a-z", async ()=>{
        await searchFunction.searchProduct("apple")
        await searchFunction.searchProductCriteria("Mac") 
        await searchFunction.CheckWithCategories("mac","Laptop")
        await searchFunction.sort("a-z")
    })
    test("with sorting z-a", async ()=>{
        await searchFunction.searchProduct("apple")
        await searchFunction.searchProductCriteria("Mac") 
        await searchFunction.CheckWithCategories("mac","Laptop")
        await searchFunction.sort("z-a")
    })
    test.only("with sorting Low to high", async ()=>{
        await searchFunction.searchProduct("apple")
        await searchFunction.searchProductCriteria("Mac") 
        await searchFunction.CheckWithCategories("mac","Laptop")
        await searchFunction.sort("Price(Low>High)")
    })
    test("with sorting high to Low", async ()=>{
        await searchFunction.searchProduct("apple")
        await searchFunction.searchProductCriteria("Mac") 
        await searchFunction.CheckWithCategories("mac","Laptop")
        await searchFunction.sort("Price(High>Low)")
    })

})
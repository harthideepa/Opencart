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
})


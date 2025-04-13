import {test} from '@playwright/test'
const SearchPages = require('../LocatorsAndFunctions/SearchPage')

test.describe("search with ", async () => {
    let searchPage;
    test.beforeEach(async ({page}) => {
        searchPage =new SearchPages(page)
        await page.goto("https://awesomeqa.com/ui/index.php?route=account/account")

    })

    test("search bar with item name", async () => {
        await searchPage.Search("apple")
    })
    test("search bar with case sensitive", async () => {
        await searchPage.Search("APPLE")
    })
    test("search criteria box with partial word", async () => {
        await searchPage.Search("Mac","searchCriteriaBox","app")
    })
})
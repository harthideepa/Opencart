const SearchPage = require('../POM/SearchPage')
class Search
{
    constructor(page)
    {
        this.page = page
        this.searchLocator = new SearchPage(page)
    }

    async gotoURL()
    {
        await this.searchLocator.gotourl()
    }
    async searchProduct(productName){
        
        await this.searchLocator.search(productName)
    }

    async SearchInvalid(productName){
        await this.searchLocator.InvalidProductName(productName)
    }
    async searchProductCriteria(name)
    {
        await this.searchLocator.searchCriteria(name)
    }

    async verifyMacPage()
    {
        await this.searchLocator.getIntoMac()
    }

    async CheckWithCategories(productName,option)
    {
        await this.searchLocator.categoriesOption(productName,option)
    }

    async sort(sortingOrder)
    {
        await this.searchLocator.searchWithSortByOption(sortingOrder)
        await this.searchLocator.VerifySortByOptionResult(sortingOrder)
    }
}

module.exports = Search
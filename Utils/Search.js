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
}

module.exports = Search
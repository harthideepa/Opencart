const {expect} = require('@playwright/test')
const loginPage = require('../POM/LoginPage')

class Login
{
    constructor(page)
    {
        this.page = page;
        this.loginLocator = new loginPage(page);
    }

    async GotoPage(){
        this.loginLocator.gotoURL(this.locatorPage)
    }

    async loginUser(emailId, password)
    {
            await this.loginLocator.ClickLoginLink()
            await this.loginLocator.fillLoginDetails(emailId, password)
            await this.loginLocator.clickLoginButton()
    }

    async VerifySuccessLogin()
    {
        await expect(this.page).toHaveURL(/route=account/)
    }

    async invalidLoginUserCredentials(emailId, password)
    {
        await this.loginUser(emailId,password)
        const {isVisbile, message} = await this.loginLocator.loginErrorMessage()
        if (isVisbile)
        {
            if(message === "Warning: No match for E-Mail Address and/or Password."){
                console.log("Error message is valid")
            }
            else{
                console.log("Error message is not valid")
            }
        }
    }
}

module.exports = Login
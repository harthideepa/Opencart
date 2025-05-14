const {expect} = require('@playwright/test')
const SignupPage = require('../POM/SignupPage')

class Signup{

    constructor(page){
        this.page = page
        this.signupLocator = new SignupPage(page)
    }

    async GotoPage(){
        await this.signupLocator.gotoURL()
    }

    async signup(firstname, lastname, email,telephone,password,NewCustomerPage){
        if(NewCustomerPage==="NewCustomerPage"){
            await this.signupLocator.NewCustomerAccountPage()
            await this.page.waitForTimeout(2000)
        }
        else{
            await this.signupLocator.clickRegisterLink()
            await this.page.waitForTimeout(2000)
        }
        await this.signupLocator.fillSignupForm(firstname, lastname, email,telephone,password)
        await this.signupLocator.astericFieldsValidate()
        await this.signupLocator.clickContinue()  //to get into the portal
    }
}

module.exports = Signup;

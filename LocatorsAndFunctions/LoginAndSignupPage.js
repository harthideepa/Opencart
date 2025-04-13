import { expect } from '@playwright/test'
class LoginAndSignupPage {
    constructor(page){
        this.page = page,
        this.accountLink = "//span[normalize-space()='My Account']",
        this.registerLink = {role:"link", name: 'Register'},
        this.continueAccountCreatePage = {role:"link", name: 'Continue'},
        this.loginLink = {role:"link", name: 'Login'},
        this.email = "E-Mail Address",
        this.password = "Password",
        this.loginButton = '//input[@type= "submit"]',
        this.errorMessage = '//div[@class="alert alert-danger alert-dismissible"]',
        this.signFirstName = 'First Name',
        this.signLastName = "Last Name",
        this.signEmail = 'E-Mail',
        this.telephone = 'Telephone',
        this.password = 'Password',
        this.confirmPassword = 'Password Confirm',
        this.radioButton = "(//input[@name='newsletter'])[2]",
        this.termaAgree = "(//input[@name='agree'])",
        this.continueButton = "(//input[@value='Continue'])",
        this.continueButtonNewCustomer = ".btn.btn-primary"
    }
    async LoginFunction( emailId, password){
        //get the account Link
        await this.page.locator(this.accountLink).click()
        //get login link
        await this.page.getByRole(this.loginLink.role,{name: this.loginLink.name}).click() 
        await this.page.getByPlaceholder(this.email).type(emailId,{delay:100})
        await this.page.getByPlaceholder(this.password).type(password,{delay:100})
        await this.page.locator(this.loginButton).click()
        let errorMessages= await this.page.locator(this.errorMessage)
        if (await errorMessages.isVisible())
        {
            if(await errorMessages.textContent() === " Warning: No match for E-Mail Address and/or Password."){
                console.log("Error message is valid")
            }
            else{
                console.log("Error message is not valid")
            }
        }
        expect(await this.page).toHaveURL(/account/)
    }
    async Signup(whichPage,firstname, lastname, email,telephone,password){
        if(whichPage==="registerLink")
        {
            await this.page.locator(this.accountLink).click()
            await this.page.getByRole(this.registerLink.role,{name: this.registerLink.name}).click() 
        }
        else{
            if(whichPage==="newCustomer")
            {
                await this.page.locator(this.accountLink).click()
                await this.page.getByRole(this.loginLink.role,{name: this.loginLink.name}).click()
                await this.page.locator(this.continueButtonNewCustomer).first().click()
            }
    }
        
        await this.page.getByPlaceholder(this.signFirstName).fill(firstname)
        await this.page.getByPlaceholder(this.signLastName).fill(lastname)
        await this.page.getByPlaceholder(this.signEmail).fill(email)
        await this.page.getByPlaceholder(this.telephone).fill(telephone)
        await this.page.getByPlaceholder(this.password).first().fill(password)
        await this.page.getByPlaceholder(this.confirmPassword).last().fill(password)
        await this.page.locator(this.radioButton).check()
        await this.page.locator(this.termaAgree).check()
        expect(await this.page.locator(this.termaAgree)).toBeChecked()
        await this.page.locator(this.continueButton).click()
        if(await this.page.locator(".text-danger").first().isVisible)
        {
            let errorMessage= await this.page.locator(".text-danger").first()
            switch(errorMessage.textContent){
                case "Password must be between 4 and 20 characters!":
                    expect(errorMessage.textContent).toHaveText("Password must be between 4 and 20 characters!")
                    break;
                case "Last Name must be between 1 and 32 characters!":
                    expect(errorMessage.textContent).toHaveText("Last Name must be between 1 and 32 characters!")
                    break;
                case "First Name must be between 1 and 32 characters!":
                    expect(errorMessage.textContent).toHaveText("First Name must be between 1 and 32 characters!")
                    break;

            }
        }

        if(await this.page.getByRole(this.continueAccountCreatePage.role,{name: this.continueAccountCreatePage.name}).isVisible())
        {
            await this.page.getByRole(this.continueAccountCreatePage.role,{name: this.continueAccountCreatePage.name}).click()

        }
    }
}

module.exports = LoginAndSignupPage
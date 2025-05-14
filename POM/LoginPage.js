
class Login {
    constructor(page){
         this.page = page
    }

    async gotoURL(){
        await this.page.goto('https://awesomeqa.com/ui/')
    }

    async ClickLoginLink(){
        await this.page.locator("//span[normalize-space()='My Account']").click()
        await this.page.getByRole("link",{name: 'Login' }).click() 
    }

    async fillLoginDetails(emailId,password)
    {
        await this.page.getByPlaceholder("E-Mail Address").type(emailId,{delay:100})
        await this.page.getByPlaceholder("Password").type(password,{delay:100})
    }

    async clickLoginButton(){
        await this.page.locator('//input[@type= "submit"]').click()
    }

    async ClickRegisterLink(){
        await this.page.locator("//span[normalize-space()='My Account']").click()
        await this.page.getByRole("link",{name: 'Register' }).click() 
    }

    async loginErrorMessage()
    {
        let isVisible = await this.page.locator('//div[@class="alert alert-danger alert-dismissible"]').isVisible()
        let message = await this.page.locator('//div[@class="alert alert-danger alert-dismissible"]').textContent()
        return {
            isVisible,
            message:message?.trim()
        }
    }
    
}

module.exports = Login
const {expect} = require('@playwright/test')
const loginPage = require('./LoginPage')
class SignupPage {
    constructor(page){
        this.page = page
   }
    async gotoURL()
    {
        await this.page.goto('https://awesomeqa.com/ui/')
    }

    async clickRegisterLink()
    {
        await this.page.locator("//span[normalize-space()='My Account']").click()
        await this.page.getByRole("link",{name: "Register"}).click() 
    }

    async fillSignupForm(firstname, lastname, email,telephone,password)
    {
        await this.page.getByPlaceholder("First Name").fill(firstname)
        await this.page.getByPlaceholder("Last Name").fill(lastname)
        await this.page.getByPlaceholder("E-Mail").fill(email)
        await this.page.getByPlaceholder("Telephone").fill(telephone)
        await this.page.getByPlaceholder("Password").first().fill(password)
        await this.page.getByPlaceholder("Password Confirm").last().fill(password)
        await this.page.locator("(//input[@name='newsletter'])[2]").check()
        await this.page.locator("//input[@name='agree']").check()
        expect(await this.page.locator("//input[@name='agree']")).toBeChecked()
        await this.page.locator("//input[@value='Continue']").click()
        const errorMessage = await this.page.locator(".text-danger")
        if(errorMessage.count()>0)
        {
            await expect(this.page).toHaveURL("https://awesomeqa.com/ui/index.php?route=account/register")
        }
    }

    async astericFieldsValidate(){
        const URL = await this.page.url()
        if(URL === "https://awesomeqa.com/ui/index.php?route=account/register"){
            const requiredFields =  [
                {label: "First Name", selector: "#input-firstname"},
                {label: "Last Name", selector: "#input-lastname"},
                {label: "E-Mail", selector: "#input-email"},
                {label: "Telephone", selector: "#input-telephone"},
                {label: "Password", selector: "#input-password"},
                {label: "Password Confirm", selector: "#input-confirm"}
            ]
    
            for(const fields of requiredFields)
            {
                const value = await this.page.locator(fields.selector).inputValue()
                if(!value.trim())
                {
                    let errorText= await this.page.locator(".text-danger").first().textContent()                    
                    switch (fields.label)
                    {
                        case 'First Name':
                             expect(errorText.trim()).toBe("First Name must be between 1 and 32 characters!")
                            break;
                        case 'Last Name':
                             expect(errorText.trim()).toBe("Last Name must be between 1 and 32 characters!")
                            break;
                        case 'E-Mail':
                            expect(errorText.trim()).toBe("E-Mail Address does not appear to be valid!")
                            break;
                        case 'Telephone':
                            expect(errorText.trim()).toBe("Telephone must be between 3 and 32 characters!")
                            break;
                        case 'Password':
                            expect(errorText.trim()).toBe("Password must be between 4 and 20 characters!")
                            break;
                    }
                }
            }
        }        
    }

    async clickContinue()
    {
        await this.page.locator(".btn.btn-primary").click()
    }

    async NewCustomerAccountPage()
    {
        const login = new loginPage(this.page)
        await login.ClickLoginLink() 
        await this.page.locator(".btn.btn-primary").first().click()
    }
}

module.exports = SignupPage;




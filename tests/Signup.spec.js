const {test} = require('@playwright/test')
const Signup = require('../Utils/Signup')
const GeneralFunctions = require('../Utils/GeneralFunctions')

test.describe("Verify Login", async () => {
    let SignupFunction;
    let email;
    test.beforeEach(async ({page})=>{
        SignupFunction = new Signup(page)
        await SignupFunction.GotoPage()
        const GeneralFunction = new GeneralFunctions()
        email = GeneralFunction.randomEmail();
    })

    test("with valid details", async () => {
        await SignupFunction.signup("Eshwar","Kumar",email,"13456789","IceCream@2")
    } )

    test("with valid details in new Customer page button", async () => {
        
        await SignupFunction.signup("Eshwar","Kumar",email,"13456789","IceCream@2","NewCustomerPage")

    } )
    test("with Invalid details", async () => {
        
        await SignupFunction.signup("Eshwar","Kumar",email,"13456789","Ic")

    } )
    test("with empty firstname", async ({}) => {
        
        await SignupFunction.signup("","sdvrs",email,"13456789","Iciihj")
    } )
    test("with empty lastname", async ({}) => {
        
        await SignupFunction.signup("Eshwar","",email,"13456789","Iciihj")
    } )
    test("with empty email", async ({}) => {
        
        await SignupFunction.signup("Eshwar","Kumar","","13456789","Iciihj")
    })
    test("with empty telephone", async ({}) => {
        
        await SignupFunction.signup("Eshwar","Kumar",email,"","Iciihj")
    } )
    test("with empty password", async ({}) => {
        
        await SignupFunction.signup("Eshwar","Kumar",email,"13456789","")
    })
})
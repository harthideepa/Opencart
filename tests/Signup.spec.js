const {test} = require('@playwright/test')
const Signup = require('../Utils/Signup')
const GeneralFunctions = require('../Utils/GeneralFunctions')
const qa = require('../Data/Qa/SiginIn.json')
const staging = require('../Data/staging/siginIn.json')

test.describe("Verify Login", async () => {
    let SignupFunction, data, email;
    test.beforeAll(async ()=>{
        if(process.env.ENV == "qa")
        {
            data = qa;
        }
        else
        {
            data = staging;
        }
    })
    test.beforeEach(async ({page})=>{
        SignupFunction = new Signup(page)
        await SignupFunction.GotoPage()
        const GeneralFunction = new GeneralFunctions()
        email = GeneralFunction.randomEmail();
    })

    test("with valid details", async () => {
        await SignupFunction.signup(data.firstName,data.lastName,email,data.TelephoneNumber,data.Password)
    } )

    test("with valid details in new Customer page button", async () => {
        
        await SignupFunction.signup(data.firstName,data.lastName,email,data.TelephoneNumber,data.Password,"NewCustomerPage")

    } )
    test("with Invalid details", async () => {
        
        await SignupFunction.signup(data.firstName,data.lastName,email,data.TelephoneNumber,data.invalidPassword)

    } )
    test("with empty firstname", async ({}) => {
        
        await SignupFunction.signup("",data.lastName,email,data.TelephoneNumber,data.Password)
    } )
    test("with empty lastname", async ({}) => {
        
        await SignupFunction.signup(data.firstName,"",email,data.TelephoneNumber,data.Password)
    } )
    test("with empty email", async ({}) => {
        
        await SignupFunction.signup(data.firstName,data.lastName,"",data.TelephoneNumber,data.Password)
    })
    test("with empty telephone", async ({}) => {
        
        await SignupFunction.signup(data.firstName,data.lastName,email,"",data.Password)
    } )
    test("with empty password", async ({}) => {
        
        await SignupFunction.signup(data.firstName,data.lastName,email,data.TelephoneNumber,"")
    })
})
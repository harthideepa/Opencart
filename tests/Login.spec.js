const {test} = require('@playwright/test')
const login = require('../Utils/Login')
const qa = require('../Data/Qa/login')
const staging = require('../Data/staging/login.json')

test.describe("Verify Login", async () => {
    let loginFunction, logindata;
    test.beforeAll(async ()=>{
        if(process.env.ENV == "qa")
        {
            logindata = qa;
        }
        else
        {
            logindata = staging;
        }
    })
    test.beforeEach(async ({page})=>{
        
        loginFunction = new login(page)
        await loginFunction.GotoPage()
    })
    test("with valid credentials", async () => {
        await loginFunction.loginUser(logindata.email, logindata.password)
        await loginFunction.VerifySuccessLogin()
    } )

    test("with Invalid Email Id", async () => {
        await loginFunction.invalidLoginUserCredentials(logindata.email, logindata.password)
    } )
    test("with Invalid password", async () => {
        await loginFunction.invalidLoginUserCredentials(logindata.email, logindata.password)
    } )
    test("with Empty credentials", async () => {
        await loginFunction.invalidLoginUserCredentials("","")
    } )
})
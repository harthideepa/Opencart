const {test} = require('@playwright/test')
const login = require('../Utils/Login')

test.describe("Verify Login", async () => {
    let loginFunction;
    test.beforeEach(async ({page})=>{
        
        loginFunction = new login(page)
        await loginFunction.GotoPage()
    })
    test("with valid credentials", async () => {
        await loginFunction.loginUser("harthidiyah@gmail.com","IceCream@2")
        await loginFunction.VerifySuccessLogin()
    } )

    test("with Invalid Email Id", async () => {
        await loginFunction.invalidLoginUserCredentials("harthidiy@gmail.com","IceCream@2")
    } )
    test("with Invalid password", async () => {
        await loginFunction.invalidLoginUserCredentials("harthidiyah@gmail.com","IceCream@4")
    } )
    test("with Empty credentials", async () => {
        await loginFunction.invalidLoginUserCredentials("","")
    } )
})
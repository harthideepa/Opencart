import {test,expect} from '@playwright/test'
const Functions = require('../Utils/Functions')
const functioMethods = require('../LocatorsAndFunctions/LoginAndSignupPage')

test.describe("Verify Login", async () => {
    let utils;
    let email;
    test.beforeEach(async ({page})=>{
        
        utils = new functioMethods(page)
        await page.goto('https://awesomeqa.com/ui/')//Navigates using the base URL specified in the Playwright config
        const GeneralFunctions = new Functions()
        email = GeneralFunctions.randomEmail();
    })
    test("with valid credentials", async () => {
        
        await utils.LoginFunction("harthidiyah@gmail.com","IceCream@2")
    } )

    test("with Invalid Email Id", async () => {
        
        
        await utils.LoginFunction("harthidiy@gmail.com","IceCream@2")
    } )
    test("with Invalid password", async () => {
        
        await utils.LoginFunction("harthidiyah@gmail.com","IceCream@4")
    } )
    test("with Empty credentisla", async () => {
        
        await utils.LoginFunction("","")
    } )
})
test.describe("Signup verification", async () => {
    let utils;
    let email;
    test.beforeEach(async ({page})=>{
        
        utils = new functioMethods(page)
        await page.goto('https://awesomeqa.com/ui/')//Navigates using the base URL specified in the Playwright config
        const GeneralFunctions = new Functions()
        email = GeneralFunctions.randomEmail();
    })
    test("with valid details", async () => {

        console.log(email)
        await utils.Signup("registerLink","Eshwar","Kumar",email,"13456789","IceCream@2")

    } )

    test("with valid details in new Customer page button", async () => {
        
        await utils.Signup("newCustomer","Eshwar","Kumar",email,"13456789","IceCream@2")

    } )
    test("with Invalid details in new Customer page button", async () => {
        
        await utils.Signup("newCustomer","Eshwar","Kumar",email,"13456789","Ic")

    } )
    test("with empty lastname", async ({page}) => {
        
        await utils.Signup("newCustomer","Eshwar","",email,"13456789","Ic")

    } )
    test("with all fields empty", async ({page}) => {
        
        await utils.Signup("newCustomer","","","","","")

    } )
})

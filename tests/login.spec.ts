import {test, expect} from '@playwright/test'
import LoginPage from '../pages/loginpage'
import {getUIConfig} from '../config/env'
const {LOGIN_URL, LOGIN_USERNAME, LOGIN_PASSWORD, HOME_URL}  = getUIConfig()
test.describe("login feature test", ()=>{
    test.beforeEach("Navigate to Login Page", async ({page}) => {
        if(LOGIN_URL) await page.goto(LOGIN_URL)
    })
    test("->login test: empty credentials", async ({page})=>{
        const loginPage = new LoginPage(page)
        await test.step('empty username and password', async () => {
            await loginPage.enterCredentials("", "")
            await loginPage.submit()
            expect.soft(await page.locator('.alert.alert-danger').textContent()).toContain('Empty username/password')
        })
        await page.waitForTimeout(2000)
        await test.step("valid username but empty password", async () => {
            await loginPage.enterCredentials("rahulshettyacademy", "")
            await loginPage.submit()
            expect.soft(await page.locator('.alert.alert-danger').textContent()).toContain('Empty username/password')
        })
        await page.waitForTimeout(2000)
        await test.step("empty username but a valid password", async () =>{
            await loginPage.enterCredentials("", "Learning@830$3mK2")
            await loginPage.submit()
            expect(await page.locator('.alert.alert-danger').textContent()).toContain('Empty username/password')
        })
    })
    test("->login test: wrong credentials", async ({page}) => {
        const loginPage = new LoginPage(page)
        await test.step('valid username but invalid password', async () => {
            await loginPage.enterCredentials("rahulshettyacademy", "Learning@830$3mK")
            await loginPage.submit()
            expect.soft((await page.locator('.alert.alert-danger').textContent())?.trim()).toContain('Incorrect username/password')
        })
        await page.waitForTimeout(2000)
        await test.step('invalid username but valid password', async () => {
            await loginPage.enterCredentials("rahulshettyacadem", "Learning@830$3mK2")
            await loginPage.submit()
            expect.soft((await page.locator('.alert.alert-danger').textContent())?.trim()).toContain('Incorrect username/password')
        })
        await page.waitForTimeout(2000)
        await test.step('invalid username and invalid password', async () => {
            await loginPage.enterCredentials("rahulshettyacadem", "Learning@830$3mK")
            await loginPage.submit()
            expect.soft(await page.locator('.alert.alert-danger').textContent()).toContain('Incorrect username/password')
        })
    })
    test("->login test: validate alert prompt for changing role to user", async ({page}) => {
        const loginPage = new LoginPage(page) 
        await test.step("->step: modal visibilty", async () => {
            await expect(loginPage.modal).toBeHidden()
            await loginPage.selectUser()
            await expect(loginPage.modal).toBeVisible()        
        })
        await test.step("->step: alert text", async () => {
            expect(await loginPage.alertText()).toContain('You will be limited to only fewer functionalities of the app. Proceed?')
        })
        await test.step("->step: alert cancel", async () => {
            await loginPage.alertCancel()
            await expect(loginPage.modal).toBeHidden()
            expect(await loginPage.userRadio.isChecked()).toBeFalsy()
            expect(await loginPage.adminRadio.isChecked()).toBeTruthy()
        })
        await test.step("->step: alert okay", async () => {
            await loginPage.selectUser()
            await loginPage.alertOkay()
            expect(await loginPage.userRadio.isChecked()).toBeTruthy()
            expect(await loginPage.adminRadio.isChecked()).toBeFalsy()
        })
    })
    test("->login test: valid credentials", async ({page}) => {
        const loginPage = new LoginPage(page)
        if(LOGIN_USERNAME && LOGIN_PASSWORD)
        await loginPage.enterCredentials(LOGIN_USERNAME, LOGIN_PASSWORD)
        await loginPage.submit()
        if(HOME_URL)
            await expect(page).toHaveURL(HOME_URL)
        await expect(page).toHaveTitle('ProtoCommerce')
    })
})


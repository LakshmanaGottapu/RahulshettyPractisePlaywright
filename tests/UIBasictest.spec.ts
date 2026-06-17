import {test, expect} from '@playwright/test'
import LoginPage from '../pages/loginpage'

test.describe("login feature test", ()=>{
    test.beforeEach("Navigate to Login Page", async ({page}) => {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    })
    test("empty credentials", async ({page})=>{
        const loginPage = new LoginPage(page)
        await loginPage.enterCredentials("", "")
        await loginPage.submit()
        expect.soft(await page.locator('.alert.alert-danger').textContent()).toContain('Empty username/password')
        await page.waitForTimeout(2000)
        await loginPage.enterCredentials("rahulshettyacademy", "")
        await loginPage.submit()
        expect.soft(await page.locator('.alert.alert-danger').textContent()).toContain('Empty username/password')
        await page.waitForTimeout(2000)
        await loginPage.enterCredentials("", "Learning@830$3mK2")
        await loginPage.submit()
        expect(await page.locator('.alert.alert-danger').textContent()).toContain('Empty username/password')
    })
    test("wrong credentials", async ({page}) => {
        const loginPage = new LoginPage(page)
        console.log('-----------valid username but invalid password------------')
        await loginPage.enterCredentials("rahulshettyacademy", "Learning@830$3mK")
        await loginPage.submit()
        await page.waitForTimeout(2000)
        console.log('-----------invalid username but valid password------------')
        await loginPage.enterCredentials("rahulshettyacadem", "Learning@830$3mK2")
        await loginPage.submit()
        await page.waitForTimeout(2000)
        console.log('-----------invalid username and invalid password------------')
        await loginPage.enterCredentials("rahulshettyacadem", "Learning@830$3mK")
        await loginPage.submit()
       
    })

})
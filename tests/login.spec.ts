import {test, expect} from '@playwright/test'
import LoginPage from '../pages/loginpage'
import { AlertMessages, PageTitles } from '../constants/messages/loginMessages'
import {InvalidCredentials, ValidCredentials} from "../constants/testData/loginData"

const {LOGIN_URL, LOGIN_USERNAME, LOGIN_PASSWORD, SHOP_URL}  = ValidCredentials
const { WRONG_PASSWORD, WRONG_USERNAME, BOTH_WRONG, EMPTY_PASSWORD, EMPTY_USERNAME } = InvalidCredentials
const { MSG_EMPTY_CREDENTIALS, MSG_INVALID_CREDENTIALS, MSG_USER_ROLE_CHANGE } = AlertMessages
const {LOGIN_TITLE, SHOP_TITLE} = PageTitles

test.describe("login feature test", {tag:"@login"}, ()=>{
    test.beforeEach("Navigate to Login Page", async ({page}) => {
        if(LOGIN_URL) await page.goto(LOGIN_URL)
        await expect(page).toHaveTitle(LOGIN_TITLE)
    })
    test("->login test: empty credentials @sanity", async ({page})=>{
        const loginPage = new LoginPage(page)
        await test.step('empty username and password', async () => {
            await loginPage.enterCredentials("", "")
            await loginPage.submit()
            expect.soft(await loginPage.dangerAlertText()).toContain(MSG_EMPTY_CREDENTIALS)
        })
        await expect(loginPage.dangerAlert).toBeHidden();
        await test.step("valid username but empty password", async () => {
            const {username, password} = EMPTY_PASSWORD
            await loginPage.enterCredentials(username, password)
            await loginPage.submit()
            expect.soft(await loginPage.dangerAlertText()).toContain(MSG_EMPTY_CREDENTIALS)
        })
        await expect(loginPage.dangerAlert).toBeHidden();
        await test.step("empty username but a valid password", async () =>{
            const {username, password} = EMPTY_USERNAME
            await loginPage.enterCredentials(username, password)
            await loginPage.submit()
            expect(await loginPage.dangerAlertText()).toContain(MSG_EMPTY_CREDENTIALS)
        })
    })
    test("->login test: invalid credentials", {tag: ['@regression']}, async ({page}) => {
        const loginPage = new LoginPage(page)
        await test.step('valid username but invalid password', async () => {
            const {username, password} = WRONG_PASSWORD
            await loginPage.enterCredentials(username, password)
            await loginPage.submit()
            expect.soft((await loginPage.dangerAlertText())?.trim()).toContain(MSG_INVALID_CREDENTIALS)
        })
        await expect(loginPage.dangerAlert).toBeHidden();
        await test.step('invalid username but valid password', async () => {
            const {username, password} = WRONG_USERNAME
            await loginPage.enterCredentials(username, password)
            await loginPage.submit()
            expect.soft((await loginPage.dangerAlertText())?.trim()).toContain(MSG_INVALID_CREDENTIALS)
        })
        await expect(loginPage.dangerAlert).toBeHidden();
        await test.step('invalid username and invalid password', async () => {
            const {username, password} = BOTH_WRONG
            await loginPage.enterCredentials(username, password)
            await loginPage.submit()
            expect.soft(await loginPage.dangerAlertText()).toContain(MSG_INVALID_CREDENTIALS)
        })
    })
    test("->login test: validate alert prompt for changing role to user", {tag: ['@sanity', '@regression']}, async ({page}) => {
        const loginPage = new LoginPage(page) 
        await test.step("->step: modal visibilty", async () => {
            await expect(loginPage.modal).toBeHidden()
            await loginPage.selectUser()
            await expect(loginPage.modal).toBeVisible()        
        })
        await test.step("->step: alert text", async () => {
            expect(await loginPage.alertText()).toContain(MSG_USER_ROLE_CHANGE)
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
    test("->login test: valid credentials @smoke", {tag: ['@sanity']}, async ({page}) => {
        const loginPage = new LoginPage(page)
        if(LOGIN_USERNAME && LOGIN_PASSWORD)
        await loginPage.enterCredentials(LOGIN_USERNAME, LOGIN_PASSWORD)
        await loginPage.submit()
        if(SHOP_URL)
            await expect(page).toHaveURL(SHOP_URL)
        await expect(page).toHaveTitle(SHOP_TITLE)
    })
})


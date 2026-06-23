import { chromium } from "@playwright/test";
import dotenv from 'dotenv'
export default async function setup(){
    dotenv.config()
    console.log(process.env.Stage)
    const browser = await chromium.launch()
    const page = await browser.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.fill('#username', 'rahulshettyacademy')
    await page.fill('#password', 'Learning@830$3mK2')
    await page.click('#signInBtn')
    await page.waitForURL('**/shop')

    await page.context().storageState({path: 'storageState.json'})
    await browser.close()
}
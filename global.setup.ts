import { chromium } from "@playwright/test";
import dotenv from 'dotenv'

const envFiles = {
    local: '.env',
    staging: '.env.staging',
    production: '.env.production'
}
type Environment = keyof typeof envFiles
function isValidEnvironment(env:string):env is Environment{
    return env in envFiles
}

export default async function setup(){
    const environment = process.env.TEST_ENV?.toLowerCase()
    if(!environment) throw new Error(`TEST_ENV is not set. Must be one of : ${Object.keys(envFiles).join(', ')}`)
    if(isValidEnvironment(environment))
        dotenv.config({path:envFiles[environment], override:false, debug:false})
    else throw new Error(
        `❌ Invalid TEST_ENV: "${environment}". Must be one of: ${Object.keys(envFiles).join(', ')}\n` +
        `   Example: TEST_ENV=staging npx playwright test`
    )
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
import {Page, test} from '@playwright/test'
import ShopPage from '../pages/shoppage'
import { getUIConfig } from '../config/env'
const {SHOP_URL} = getUIConfig()
test.only("validate card titles", async ({page}:{page:Page}) => {
    await page.goto(SHOP_URL)
    const shopPage = new ShopPage(page)
    await page.waitForLoadState("networkidle")
    console.log(await shopPage.fetchCardTitles())
})
import {Page, Locator} from '@playwright/test'

export default class ShopPage {
    readonly cardTitles:Locator
    constructor(page:Page){
        this.cardTitles = page.locator('h4.card-title>a')
    }
    async fetchCardTitles(){
        return await this.cardTitles.allTextContents()
    }
}
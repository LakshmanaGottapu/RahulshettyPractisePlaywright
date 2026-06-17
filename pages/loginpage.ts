import { Locator, Page } from "@playwright/test"

export default class LoginPage {
    usernameField:Locator
    passwordField:Locator
    adminRadio:Locator
    userRadio: Locator
    userCategoryDropdown:Locator
    termsCheckbox:Locator
    siginButton:Locator
    
    constructor(page: Page){
        this.usernameField = page.getByLabel('username')
        this.passwordField = page.getByLabel('password')
        this.adminRadio = page.getByLabel('Admin')
        this.userRadio = page.getByLabel('User')
        this.userCategoryDropdown = page.locator('[data-style="btn-info"]')
        this.termsCheckbox = page.getByLabel('terms')
        this.siginButton = page.locator('#signInBtn')
    }

    async enterCredentials(username:string, password:string){
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
    }
    async selectAdmin(){
        await this.adminRadio.click()
    }
    async selectUser(){
        await this.userRadio.click()
    }
    async selectUserCategory(option:string){ // option implies text not the dropdown value
        await this.userCategoryDropdown.selectOption(option) 
    }
    async agreeTerms(){
        await this.termsCheckbox.click()
    }
    async submit(){
        await this.siginButton.click()
    }

}
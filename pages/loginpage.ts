import { Locator, Page } from "@playwright/test"

export default class LoginPage {
    readonly usernameField:Locator
    readonly passwordField:Locator
    readonly adminRadio:Locator
    readonly userRadio: Locator
    readonly userCategoryDropdown:Locator
    readonly termsCheckbox:Locator
    readonly siginButton:Locator
    readonly dangerAlert:Locator
    readonly modal: Locator
    readonly modalBody:Locator
    readonly modalCancelBtn:Locator
    readonly modalOkayBtn:Locator
    constructor(page: Page){
        this.usernameField = page.getByLabel('username')
        this.passwordField = page.getByLabel('password')
        this.adminRadio = page.getByLabel('Admin', {exact:true})
        this.userRadio = page.getByLabel('User', {exact:true})
        this.userCategoryDropdown = page.locator('[data-style="btn-info"]')
        this.termsCheckbox = page.getByLabel('terms')
        this.siginButton = page.locator('#signInBtn')
        this.dangerAlert = page.locator('.alert.alert-danger')
        this.modal = page.locator('#myModal')
        this.modalBody = page.locator('.modal-body>p')
        this.modalCancelBtn = page.locator('#cancelBtn')
        this.modalOkayBtn = page.locator('#okayBtn')
    }
    async enterCredentials(username:string, password:string){
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
    }
    async selectAdmin(){
        await this.adminRadio.check()
    }
    async selectUser(){
        await this.userRadio.check()
    }
    async selectUserCategory(option:string){ // option implies text not the dropdown value
        await this.userCategoryDropdown.selectOption(option) 
    }
    async agreeTerms(){
        await this.termsCheckbox.click()
    }
    async dangerAlertText():Promise<string|null>{
        return await this.dangerAlert.textContent()
    }
    async alertText(){
        return await this.modalBody.textContent()
    }
    async alertOkay(){
        await this.modalOkayBtn.click()
    }
    async alertCancel(){
        await this.modalCancelBtn.click()
    }
    async submit(){
        await this.siginButton.click()
    }

}
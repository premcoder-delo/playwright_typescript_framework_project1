import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly invalidCredentialErrorPopup: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidCredentialErrorPopup = page.getByRole('alert');
    }
    /**
     * To open url into browser
     */
    async goToOrangeHRM() {
        const url = `${process.env.BASE_URL}/web/index.php/auth/login`;
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    /**
     * To login into orange HRM app
     * @param userName 
     * @param password 
     */
    async loginOrangeHRM(userName: string, password: string) {
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
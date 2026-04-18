import { Locator, Page } from "@playwright/test";

export class UserProfilePage {
    readonly page: Page;
    readonly userMenuButton: Locator
    readonly userLogoutButton: Locator

    constructor(page: Page) {
        this.page = page
        this.userMenuButton = page.locator("//i[contains(@class, 'userdropdown-icon')]");
        this.userLogoutButton = page.getByRole('menuitem', { name: 'Logout' })
    }

    async logoutHRM() {
        await this.userMenuButton.click();
        await this.userLogoutButton.click();
        await this.page.waitForURL('**/auth/login');
    }
}
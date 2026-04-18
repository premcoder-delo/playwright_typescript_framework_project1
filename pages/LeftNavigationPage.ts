import { Locator, Page } from "@playwright/test";

export class LeftNavigationPage {
    readonly page: Page;
    readonly pimVerticalTab: Locator;
    readonly orangeHRMLogo: Locator;
    readonly leftNavigationTabs: Locator

    constructor(page: Page) {
        this.page = page;
        this.pimVerticalTab = page.getByRole('link', { name: 'PIM' })
        this.orangeHRMLogo = page.getByRole('link', { name: 'client brand banner' })
        this.leftNavigationTabs = page.locator("//ul[@class='oxd-main-menu']")
    }

    /**
     * To open PIM vertical tab
     */
    async openPIMVerticalTab() {
        this.pimVerticalTab.click();
    }
}
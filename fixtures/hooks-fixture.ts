import { test as baseTest } from '../fixtures/common-fixture'

/**
 * Below fixtures is for hooks to trigger before and after test
 */
type HooksFixtureType = {
    gotoUrl: void;
    logout: void;
}

export const test = baseTest.extend<HooksFixtureType>({
    gotoUrl: async ({ loginPage }, use) => {
        await loginPage.goToOrangeHRM();
        await use();
    },
    logout: async ({ userProfilePage, loginPage }, use) => {
        await use();
        await userProfilePage.logoutHRM();
        await loginPage.userNameInput.waitFor({ state: 'visible' });
    }
})

export { expect } from '@playwright/test'
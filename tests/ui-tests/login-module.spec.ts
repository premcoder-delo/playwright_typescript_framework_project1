import { test, expect } from '../../fixtures/hooks-fixture'
import loginModuleData from '../../data/ui-data/login-module-data.json'

/**
 * Here this block of code says that don't use saved credentials to auto login.
 * because as below are negative scenarios on login page, so we need to do actions on login page for tests.
 */
test.use({
    storageState: {
        cookies: [],
        origins: []
    }
})
test.describe('[Login Module] Negative Login Scenarios', {
    tag: '@InvalidLogin',
    annotation: {
        type: 'Story Link',
        description: 'https://jiraStory/VTHREE-1234'
    }
}, () => {
    test('[Login] Verify that the user cannot login with an invalid password.', {
        tag: ['@UI', '@UAT'],
        annotation: {
            type: 'Test Case Link',
            description: 'https://jiraticket/VTHREE-1111'
        }
    }, async ({ gotoUrl, loginPage, commonUtils }) => {
        const app_username = commonUtils.decryptData(process.env.APP_USERNAME!);
        await test.step('Login with valid username and invalid password', async () => {
            await loginPage.loginOrangeHRM(app_username, loginModuleData.wrong_password);
        });
        await test.step('Verify invalid credential error message', async () => {
            await expect(loginPage.invalidCredentialErrorPopup).toHaveText(loginModuleData.invalid_credential_text);
        });
        await test.step('Verify user remains on login page', async () => {
            await expect(loginPage.userNameInput).toBeVisible();
        });
    });

    test('[Login] Verify that the user cannot login with an invalid username', {
        tag: ['@UI', '@UAT'],
        annotation: {
            type: 'Test Case Link',
            description: 'https://jiraticket/VTHREE-1112'
        }
    }, async ({ gotoUrl, loginPage, commonUtils }) => {
        const app_password = commonUtils.decryptData(process.env.APP_PASSWORD!);
        await test.step('Login with invalid username and valid password', async () => {
            await loginPage.loginOrangeHRM(loginModuleData.wrong_username, app_password);
        });
        await test.step('Verify invalid credential error message', async () => {
            await expect(loginPage.invalidCredentialErrorPopup).toHaveText(loginModuleData.invalid_credential_text);
        });
        await test.step('Verify user remains on login page', async () => {
            await expect(loginPage.userNameInput).toBeVisible();
        });
    });

    test('[Login] Verify that the user cannot login with invalid username and invalid password', {
        tag: ['@UI', '@DEV'],
        annotation: {
            type: 'Test Case Link',
            description: 'https://jiraticket/VTHREE-1113'
        }
    }, async ({ gotoUrl, loginPage, commonUtils }) => {
        await test.step('Login with invalid username and invalid password', async () => {
            await loginPage.loginOrangeHRM(loginModuleData.wrong_username, loginModuleData.wrong_password);
        });
        await test.step('Verify invalid credential error message', async () => {
            await expect(loginPage.invalidCredentialErrorPopup).toHaveText(loginModuleData.invalid_credential_text);
        });
        await test.step('Verify user remains on login page', async () => {
            await expect(loginPage.userNameInput).toBeVisible();
        });
    });
})

test('[Login] Verify that the user login with valid username and valid password', {
    tag: ['@Visual', '@UAT'],
    annotation: {
        type: 'Test Case Link',
        description: 'https://jiraticket/VTHREE-1114'
    }
}, async ({ gotoUrl, loginPage, commonUtils, leftNavigationPage }) => {
    await test.step('Login with valid username and valid password', async () => {
        const app_username = commonUtils.decryptData(process.env.APP_USERNAME!);
        const app_password = commonUtils.decryptData(process.env.APP_PASSWORD!);
        await loginPage.loginOrangeHRM(app_username, app_password);
    });
    await test.step('Verify OrangeHRM brand logo visually', async () => {
        await expect(leftNavigationPage.orangeHRMLogo).toHaveScreenshot('orangeHRMBrandLogo.png', {
            maxDiffPixelRatio: 0.02
        });
    });
    await test.step('Verify left navigation tabs visually', async () => {
        await expect(leftNavigationPage.leftNavigationTabs).toHaveScreenshot('leftNavigationTabsOfOrangeHRM.png', {
            maxDiffPixelRatio: 0.02
        });
    });

})
import { expect } from '@playwright/test';
import { test } from '../fixtures/common-fixture';

test('global setup for auto logging', async ({ page, loginPage, commonUtils, dashboardPage }) => {

    const app_username = commonUtils.decryptData(process.env.APP_USERNAME!)
    const app_password = commonUtils.decryptData(process.env.APP_PASSWORD!)

    await loginPage.goToOrangeHRM();
    await loginPage.loginOrangeHRM(app_username, app_password)

    await page.waitForURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`)
    await expect(dashboardPage.dashboardTitleText).toContainText('Dashboard');
    await page.context().storageState({
        path: './playwright/.auth/auth.json'
    })

})
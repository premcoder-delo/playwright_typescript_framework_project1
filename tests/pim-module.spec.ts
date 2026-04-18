import { test, expect } from '../fixtures/hooks-fixture';
import pimModuleData from '../data/pim-module-data.json';

test('[PIM] Verify that a new employer is successfully created under the PIM module', {
    tag: ['@UI', '@UAT'],
    annotation: {
        type: 'Test case Link',
        description: 'https://jiraticket/VTHREE-1114'
    }
}, async ({ gotoUrl, leftNavigationPage, pimPage }) => {
    const firstLastName = `${pimModuleData.first_name} ${pimModuleData.last_name}`;
    await test.step("Open Vertical Tab 'PIM'", async () => {
        await leftNavigationPage.openPIMVerticalTab();
    })
    await test.step("Add Employee with details first name, middle name, last name", async () => {
        await pimPage.addEmployee(pimModuleData.first_name, pimModuleData.middle_name, pimModuleData.last_name);
    })
    await test.step("Save added Employee details", async () => {
        await pimPage.saveEmployeeAndWaitForDetails();
    })
    await test.step("Verify employee heading", async () => {
        await expect(pimPage.newEmployeeNameHeading).toHaveText(firstLastName);
    })
})
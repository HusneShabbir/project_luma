
// @ts-check
const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const {fakeUser} = require('../Utils/faker_data');


test('register_functionality', async ({ page }) => {
    await page.goto('https://magento.softwaretestingboard.com/customer/account/create/');
    await page.locator('#firstname').fill(fakeUser.firstname);
    await page.locator('#lastname').fill(fakeUser.lastname);
    await page.locator('#email_address').fill(fakeUser.email);
    console.log(fakeUser.email);
    await page.locator('#password').pressSequentially(fakeUser.password,{ delay: 100 });
    console.log(fakeUser.password);
    let pass_strenght = await page.locator('#password-strength-meter-label').textContent();
    expect(pass_strenght).toEqual('Very Strong')
    //await page.locator('.password-none').isDisabled();
    await page.locator('#password-confirmation').fill(fakeUser.password);
    await page.getByRole('button',{name:'Create an Account'}).click();
    await page.getByText('Thank you for registering').isVisible();
    let alert_loc = await page.getByRole('alert').locator('div').first();
    await expect(alert_loc).toBeVisible();
});
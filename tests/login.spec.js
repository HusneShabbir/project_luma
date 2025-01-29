const { test, expect } = require('@playwright/test');
const {fakeUser} = require('../Utils/faker_data');


test('Login_functionality', async ({ page }) => {
    
    await page.goto('https://magento.softwaretestingboard.com/customer/account/login/');
    await page.locator('#email').fill(fakeUser.email);
    await page.getByLabel('Password').fill(fakeUser.password);
    await page.getByRole('button',{name:'Sign In'}).click();
    await page.waitForTimeout(2000);
    let header = await page.getByRole('heading', { name: 'My Account' });
    let negative_case = await page.getByText('The account sign-in was');
    let negative_condition = await negative_case.isVisible();
    if(negative_condition){
        console.log('creds Incorrect');
    }
    else{
        await expect(header).toBeVisible();
    }
});
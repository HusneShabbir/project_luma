const { test, expect } = require('@playwright/test');
const {fakeUser} = require('../Utils/faker_data');
const {login_page} = require('../page-objects/login');


test('Login_functionality', async ({ page }) => {
    const Login_page = new login_page(page);
    await Login_page.navigate();
    await Login_page.login();
});
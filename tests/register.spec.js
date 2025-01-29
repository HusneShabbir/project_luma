
// @ts-check
const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const {fakeUser} = require('../Utils/faker_data');
const {login_page} = require('../page-objects/login');
const {register_page} = require('../page-objects/register');



test('register_functionality', async ({ page }) => {
    const Login_page = new login_page(page);
    await Login_page.navigate();
    const Register_page = new register_page(page);
    await Register_page.register();
});
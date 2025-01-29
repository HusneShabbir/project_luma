const{test, expect} = require('@playwright/test');
const {fakeUser} = require('../Utils/faker_data');
const { features } = require('process');

test('shopping page for mens', async({page})=>{
    await page.goto('https://magento.softwaretestingboard.com/');
    let mens_locator = page.getByRole('menuitem', { name: ' Men' });
    await mens_locator.hover();
    await page.getByText('Tops').last().hover();
    await page.getByText('Jackets').last().click();
    await page.getByLabel('Jackets').isVisible();
    await page.locator('[class="item product product-item"]').filter({hasText:'Lando Gym Jacket'}).click();
    await page.getByRole('heading', { name: 'Lando Gym Jacket' }).isVisible();
    await page.locator('[class="swatch-option text"]').filter({hasText:'M'}).click();
    await page.locator('[class="swatch-option color"]').nth(0).click();
    await page.locator('#qty').fill('2');
    await page.getByRole('button',{name:'Add to Cart'}).scrollIntoViewIfNeeded();
    await page.getByRole('button',{name:'Add to Cart'}).click();
    let loading_loc = page.locator('[title="Loading..."]');
    await loading_loc.waitFor({ state: 'hidden' });
    await page.getByText('You added Lando Gym Jacket to').isVisible();
    await page.locator('[class="action showcart"]').click();
    let checkout_loc = page.getByTitle('Proceed to Checkout');
    await checkout_loc.waitFor();
    await page.getByTitle('Proceed to Checkout').click();
    await page.getByText('Shipping Address').isVisible();
    await page.getByRole('textbox', { name: 'Email Address * Email Address' }).fill(fakeUser.email);
    await page.getByLabel('First Name').fill(fakeUser.firstname);
    await page.getByLabel('Last Name').fill(fakeUser.lastname);
    await page.getByLabel('Company').fill(fakeUser.company);
    await page.getByLabel('Street Address: Line 1').fill(fakeUser.street);
    await page.getByLabel('Street Address: Line 2').fill(fakeUser.state);
    await page.getByLabel('Street Address: Line 3').fill(fakeUser.pincode);
    await page.getByLabel('City').fill(fakeUser.city);
    await page.locator('select[name="region_id"]').selectOption('California');
    //await page.getByRole('textbox', { name: 'State/Province' }).fill(fakeUser.state);
    await page.getByLabel('Zip/Postal Code').fill(fakeUser.pincode);
    await page.getByLabel('Country').selectOption('Uganda');
    await page.getByLabel('Phone Number').fill(fakeUser.ph_num);
    await page.getByLabel('Fixed').check();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('[alt="Loading..."]').first().waitFor({state:'hidden'});
    await page.getByText('Payment Method', { exact: true }).isVisible();
    await page.getByLabel('My billing and shipping').check();
    await page.getByRole('button', { name: 'Place Order' }).click();
    await page.locator('[alt="Loading..."]').first().waitFor({state:'hidden'});
    let greet_loc = page.getByText('Thank you for your purchase!');
    await greet_loc.waitFor();
    let order_id = await page.getByText('Your order # is:').textContent();
    console.log(order_id);





})
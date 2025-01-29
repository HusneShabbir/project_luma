const {fakeUser} = require('../Utils/faker_data');
const { test, expect } = require('@playwright/test');

class register_page{
    constructor(page){
        this.create_account_loc = page.getByRole('link', { name: 'Create an Account' });
        this.fname = page.locator('#firstname');
        this.lname = page.locator('#lastname');
        this.e_mail_loc = page.locator('#email_address');
        this.pass_loc = page.locator('#password');
        this.pass_str_loc = page.locator('#password-strength-meter-label')
        this.pass_confirmation = page.locator('#password-confirmation');
        this.create_btn = page.getByRole('button',{name:'Create an Account'});
        this.success_msg = page.getByText('Thank you for registering');
        this.alert_loc = page.getByRole('alert').locator('div').first();

    }
    async register(){
        await this.create_account_loc.click();
        await this.fname.fill(fakeUser.firstname);
        await this.lname.fill(fakeUser.lastname);
        await this.e_mail_loc.fill(fakeUser.email);
        console.log(`Email used:: ${fakeUser.email}`);
        await this.pass_loc.pressSequentially(fakeUser.password,{ delay: 100 });
        console.log(`Password used:: ${fakeUser.password}`);
        let pass_strenght = await this.pass_str_loc.textContent();
        expect(pass_strenght).toEqual('Very Strong')
        await this.pass_confirmation.fill(fakeUser.password);
        await this.create_btn.click();
        await this.success_msg.isVisible();
        await expect(this.alert_loc).toBeVisible();
    }
}
module.exports = {register_page}
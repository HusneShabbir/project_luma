const {fakeUser} = require('../Utils/faker_data');
class login_page{
    constructor(page){
        this.page =page;
        this.sigin_loc = page.getByRole('link', { name: 'Sign In' });
        this.email_loc = page.locator('#email');
        this.password_loc = page.getByLabel('Password');
        this.sigin_btn = page.getByRole('button',{name:'Sign In'});
        this.welcome_loc = page.getByRole('banner').getByText('Welcome');
        this.negative_case = page.getByText('The account sign-in was');



    }
    async navigate(){
        await this.page.goto('https://magento.softwaretestingboard.com/');
    }
    async login(){
        await this.sigin_loc.click();
        await this.email_loc.fill(fakeUser.email);
        await this.password_loc.fill(fakeUser.password);
        await this.sigin_btn.click();
        await this.page.waitForLoadState('networkidle');
        let positive_case = await this.welcome_loc.isVisible();
        let negative_condition = await this.negative_case.isVisible();
        if(negative_condition){
            console.log('creds Incorrect/ Register first');
        }
        else if (positive_case) {
            console.log('login Succesfull');
        }
    }
}
module.exports = {login_page}
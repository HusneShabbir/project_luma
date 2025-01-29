const { faker } = require('@faker-js/faker');

const fakeUser = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    company: faker.company.name(),
    ph_num: faker.phone.number(),

    //address
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    pincode: faker.location.zipCode(),
};

module.exports = {fakeUser}
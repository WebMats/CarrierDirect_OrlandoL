const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');
document.documentElement.innerHTML = html.toString();

const { VendingMachine } = require('./vendingMachine')
const productFactory = require('../productStack/productFactory');



describe('machine without products', () => {
    let machine;
    beforeAll(() => {
        machine = new VendingMachine([]);
    })

    test('should return an empty machine', () => {
        expect(machine["_products"].length).toEqual(0);
    })
})

describe('Machine with products', () => {
    let machine;
    let coins = [5,10,25];
    beforeAll(() => {
        machine = new VendingMachine([])
        for(let i=0; i<10; i++) {
            let [prod] = productFactory();
            machine.appendProduct(prod);
        }
    })

    test('should return 10 products', () => {
        const products = machine.getProducts();
        expect(products.length).toEqual(10);
    })

    test('should add correct number of coins with machine.addUserMoney', () => {
        const index = Math.floor((Math.random()*3));
        const currBalance = machine["_balance"];
        machine.addUserMoney(coins[index]);
        expect(machine["_balance"]).toEqual(currBalance+coins[index]);
    })

    test('should get the balance of machine with machine.getBalance', () => {
        let balance = machine["_balance"];
        expect(machine.getBalance()).toEqual(balance);
    })

    test('should reset balance with machine.resetBalance', () => {
        expect(machine["_balance"]).not.toEqual(0);
        machine.resetBalance();
        expect(machine["_balance"]).toEqual(0);
    })

    test("should increase the inventory of a given product with machine.adminAddProduct", () => {
        const index = Math.floor((Math.random()*10));
        let product = machine.getProducts()[index];
        const {_inventory: inventory, name } = product;
        machine.adminAddProduct({new: false, name, amount: 1});
        expect(product["_inventory"]).toEqual(inventory+1);
    })

    test('should create new product and append it to end of list with machine.adminAddProduct', () => {
        const [newProd] = productFactory();
        const { _limit, name, price } = newProd;
        const addedProd = machine.adminAddProduct({ limit: _limit, price, name, new: true });
        const lastProduct = machine.getProducts()[machine._products.length-1];
        expect(name === addedProd.name && name === lastProduct.name).toEqual(true);
        expect(price === addedProd.price && price === lastProduct.price).toEqual(true);
        expect(addedProd._id).toEqual(lastProduct._id);
    })

    test('should return the correct product with machine.buttonPress', () => {
        const index = Math.floor((Math.random()*10));
        let product = machine.getProducts()[index];
        let fetchedProduct = machine.buttonPress(product._id);
        expect(fetchedProduct._id).toEqual(product._id);
    })

})
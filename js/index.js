"use strict";
import url from '../style.css';
import products from './init/products.js';
import VendingMachine from './vendingMachine/vendingMachine.js';
import { appendProductToListNode as appendProduct } from './ui-functions.js';


//  ================= Setup vending machine.
const vendingMachine = new VendingMachine(products);
const vendingProducts = vendingMachine.getProducts();
const productsListElement = document.getElementById('product-list');

(_ => {
    for (let i=0; i < vendingProducts.length; i++) {
        const newEl = appendProduct(vendingProducts[i].name, vendingProducts[i]._id, productsListElement);
        newEl.addEventListener('click', handleProductClick);
    }
})();

//  ================= Setup logic for handling product form submission.
const productFormElement = document.getElementById('form');
productFormElement.addEventListener('submit', handleProductFormSubmission);
document.getElementById('product-submit').addEventListener('click', function(e) {
    if (productFormElement.checkValidity()) {
        return document.getElementById('form__btn-submit').click();
    }
});

//  ================= Main Login.
const addButtonElement = document.getElementById('submit');

addButtonElement.addEventListener('click', function() {
    // make sure that form is valid and that value is 5 || 10 || 25
    const valid = addButtonElement.parentElement.checkValidity();
    if (!valid) return;
    const value = +document.getElementById('amount').value;
    if (![5,10,25].includes(value)) return;
    vendingMachine.addUserMoney(value);
})

function handleProductClick(e) {
    const id = e.target.getAttribute('data-product-id');
    vendingMachine.buttonPress(id);
}

function handleProductFormSubmission(e) {
    e.preventDefault();
    const values = {}
    // Ternary expression makes sure that the value for name = "new" is properly set.
    Array.from(e.target.elements).forEach(el => values[el.name] = el.name !== "new" ? el.value : el.checked);
    e.target.reset();
    // can send values to be checked for validity before adding.
    const newProduct = vendingMachine.adminAddProduct(values);
    if (newProduct && newProduct.name) {
        const newEl = appendProduct(newProduct.name, newProduct._id, productsListElement);
        newEl.addEventListener('click', handleProductClick);
    };
}

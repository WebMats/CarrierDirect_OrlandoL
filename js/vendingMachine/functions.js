import { genId } from "../init/products";


const outputElement = document.getElementById('output');
const balanceElement = outputElement.parentElement.querySelector('.machine__balance');

export const handleProductClick = (machine) => ({
    /* User Function - This is called when a user presses a button for a particular product */
    buttonPress: (productId) => {
        // will search for the product with id passed in, when found it will set position to the index, for use later.
        let position;
        const product = machine.getProducts().find((p, index) => p._id === productId && (position = index+1, true));
        if (!product) {
            return handleOutputToUser('ERROR: could not find product...');
        }
        const currBalance = machine.getBalance();
        if (product.price > currBalance) { // price checking
            handleOutputToUser(`${product.name} has a price of ${product.price} cents.`);
            return product;
        } else { //purchasing
            handleProductDispension(product, machine, position);
        }
    }
});

export const handleAddCoinToMachine = (machine) => ({
    /* User Function - This is called when the user adds money to the machine.
    The cents parameter represents the value of the particular currency added.
    This value has been validated based on the allowed amounts.
    */
    addUserMoney: (cents) => {
        const newBalance = handleUpdateBalance.call(machine, cents);
        handleOutputToUser(`${cents} cents were added`);
        hadleUpdateBalanceOfUser(newBalance);
    }
});

export const handleAddProductToMachine = (machine) => ({
    /* Admin Function - This is called when an admin adds more of a certain product or
    a new product to the machine. The values.amount field is how many products we would like to add. */ 
    adminAddProduct: (values) => {
        if (!values.name) return;
        if (values.new) {
            if (!values.limit || !values.price) return;
            let amount = values.amount;
            let newProduct = machine.buildProduct(values.limit, values.price, values.name, genId());
            if (!newProduct.name) return;
            newProduct.push(amount-1);
            machine.appendProduct(newProduct);
            return newProduct;
        }
        let product = machine.getProducts().find(p => p.name === values.name);
        if (!product) { 
            return handleOutputToUser('ERROR: there is no product by that name');
        };
        product.push(+values.amount || 0);
    }
});

// ========== Helper Functions
function handleProductDispension(prod, machine, position) {
    if (prod.isEmpty()) {
        handleOutputToUser(`Sorry, all out of ${prod.name}`);
    } else {
        // reset balance and then take the difference of balalence - prod.price
        handleOutputToUser(`Dispensing ${prod.name} from ${position}. Change: ${machine.getBalance() - prod.price} cents`);
        prod.pop();
        machine.resetBalance();
        hadleUpdateBalanceOfUser(0);
    }
}

function handleUpdateBalance(value) {
    return this._balance += value;
}

function handleOutputToUser(content) {
    outputElement.textContent = content;
}

function hadleUpdateBalanceOfUser(newBalance) {
    balanceElement.textContent = `${newBalance}`;
}

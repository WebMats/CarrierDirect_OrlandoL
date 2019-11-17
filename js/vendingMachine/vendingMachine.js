import Product from '../productStack/productStack'
import { 
    handleProductClick as chooseProduct,
    handleAddCoinToMachine as addCoins,
    handleAddProductToMachine as addProduct,
} from './functions';


export function VendingMachine(products) {
    let vendingMachine = {
        _products: [],
        _balance: 0,
    }

    vendingMachine.getBalance = function() { return this._balance; };
    vendingMachine.resetBalance = function() { this._balance = 0; };
    vendingMachine.buildProduct = (...args) => new Product(...args);
    vendingMachine.getProducts = function() { return this._products; };
    vendingMachine.appendProduct = function(p) { this._products.push(p); };

    // Initializes machine with preset products.
    products.forEach((p, i) => {
        let newProduct = new Product(p.limit, p.price, p.name, p._id);
        if (newProduct.name) {
            vendingMachine._products.push(newProduct);
        }
    })
    return Object.assign(
        vendingMachine,
        chooseProduct(vendingMachine),
        addCoins(vendingMachine),
        addProduct(vendingMachine),
        );
}

export default VendingMachine;

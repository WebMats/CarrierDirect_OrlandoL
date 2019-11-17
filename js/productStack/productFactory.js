import { genId } from '../init/products';
import Product from './productStack';

module.exports = () => {
    let id = genId();
    let limit = Math.floor((Math.random()+2) * 20000);
    limit = limit - limit % 5;
    let price = 15;
    let name = "Product" + " " + id;
    let productCopy = { _limit: limit, _id: id, name, price };
    let product = new Product(limit, price, name, id);
    return [product, productCopy];
}

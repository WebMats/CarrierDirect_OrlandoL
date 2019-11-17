function Product (k, price, name, id) {
    if (arguments.length < 4) return;
    let product = {
        _limit: k,
        _id: id,
        _inventory: 1,
        name: name,
        price: price,
    }

    product.push = function(amount) {
        // makes sure that function does not add more than the set limit
        let amountToAdd = this._limit > this._inventory + amount ? amount : this._limit - this._inventory;
        this._inventory += amountToAdd;
        return this._inventory;
    }

    product.isEmpty = function() { return this._inventory == 0; };
    product.isFull = function() { return this._inventory == this._limit; };
    product.pop = function() { this._inventory--; };

    return Object.assign(product);
}


export default Product;

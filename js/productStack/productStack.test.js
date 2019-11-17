const productFactory = require('./productFactory');


let product;
let productCopy = {};
describe('Product', () => {
    beforeEach(() => {
        [product, productCopy] = productFactory();
    });

    test('should return an object with proper fields', () => {
        Object.keys(productCopy).forEach(key => {
            expect(product[key] === productCopy[key]).toBe(true)
        })
    })

    test('should decrease inventory by one when product.pop is called', () => {
        const nextInventory = product["_inventory"] - 1;
        product.pop()
        expect(product["_inventory"]).toEqual(nextInventory);
    })

    test('should increase inventory by one when product.push is called with 1', () => {
        const nextInventory = product["_inventory"]+1;
        product.push(1);
        expect(product["_inventory"]).toEqual(nextInventory);
    })

    test('should return false when inventory is not full', () => {
        expect(product.isFull()).toEqual(false);
    })

    test('should return false when inventory is not empty', () => {
        expect(product.isEmpty()).toEqual(false);
    });
    
    test('should not increase inventory past limit', () => {
        const nextInventory = product["_limit"];
        product.push(2*product["_limit"]);
        expect(product["_inventory"]).toEqual(nextInventory);
    });

    describe('When inventory is full', () => {
        beforeEach(() => {
            product.push(2*product["_limit"]);
        })

        test('should return true from product.isFull', () => {
            expect(product.isFull()).toEqual(true);
        })

        test('should return false from product.isEmpty', () => {
            expect(product.isEmpty()).toEqual(false);
        })
        
        test('should not increase inventory with product.push()', () => {
            const currInventory = product["_inventory"];
            product.push(1);
            expect(product["_inventory"]).toEqual(currInventory);
        })
    })
});
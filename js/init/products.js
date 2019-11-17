export default [
    { _id: genId(), name: 'candy', limit: 10, price: 25 },
    { _id: genId(), name: 'soda', limit: 6, price: 75 },
    { _id: genId(), name: 'chocolate', limit: 8, price: 50 },
];

export function genId() {
    let randNumber = (Math.random()+1) * 1000000;
    return randNumber.toString(16).split('.')[1];
}

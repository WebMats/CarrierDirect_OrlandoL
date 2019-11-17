export const appendProductToListNode = (name, id, list) => {
    let el = document.createElement('div');
    el.classList.add('machine__product');
    el.textContent = name;
    el.setAttribute('data-product-id', id);
    list.appendChild(el);
    return el;
}

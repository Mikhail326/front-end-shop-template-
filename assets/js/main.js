const contentContainer = document.querySelector("#content-container");
const cartCounterLabel = document.querySelector("#cart-counter-label");
const openBtn = document.querySelector('.page-header__cart-btn');
const card = []

const createCart = () => {
  const cart = document.createElement('div');
  const field = document.createElement('div');
  const heading = document.createElement('div');
  const closeBtn = document.createElement('div');


  cart.classList.add('cart');
  field.id = 'cart-field'
  field.classList.add('cart-field');
  heading.classList.add('cart-title');
  closeBtn.classList.add('closebtn');

  heading.textContent = 'Корзина товаров :';
  closeBtn.textContent = 'Закрыть';

  document.body.appendChild(cart);
  cart.appendChild(heading);
  cart.appendChild(field);
  cart.appendChild(closeBtn);
}
createCart();

const field = document.querySelector('.cart-field');
const cart = document.querySelector('.cart');
const close = document.querySelector('.closebtn');

const openCart = () => {
  cart.style.display = 'block';
}
const closeCart = () => {
  cart.style.display = 'none';
}
openBtn.addEventListener('click', openCart);
close.addEventListener('click', closeCart);


let cartCounter = 0;
let cartPrice = 0;

const incrementCaunter = () => {
  cartCounterLabel.innerHTML = `${++cartCounter}`;
  if (cartCounter === 1) cartCounterLabel.style.display = "block";
}


const getMockData = (t) => +t
  .parentElement
  .previousElementSibling
  .innerHTML
  .replace(/^\$(\d+)\s\D+(\d+).*$/, "$1.$2")

const getPrice = (t, price) => Math.round((price + getMockData(t)) * 100) / 100;

const disableControls = (t, fn) => {
  t.disabled = true;
  contentContainer.removeEventListener('click', fn)
}

const enableControls = (t, fn) => {
  t.disabled = false;
  contentContainer.addEventListener('click', fn);
}

const setItemsToCard = (button) => {
  card.push({
    name: button.dataset.itemName,
    price: button.dataset.itemPrice,
  })

  const html = card.map((item) => (`<div class='cart-field__list'> ${item.name} - ${item.price}</div>`)).join('')

  document.getElementById('cart-field').innerHTML = html
}


const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;
  let restoreHTML = null;
  if (target && target.matches(".item-actions__cart")) {
    incrementCaunter();

    setItemsToCard(target);

    cartPrice = getPrice(target, cartPrice);
    restoreHTML = target.innerHTML;
    target.innerHTML = `Added ${cartPrice.toFixed(2)} $`

    disableControls(target, btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHTML;
      enableControls(target, btnClickHandler);
    }, interval);
  }
}


contentContainer.addEventListener('click', btnClickHandler);

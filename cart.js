let cart = getJSON(KEYS.cart, []);
const list = document.getElementById('cartList');
const total = document.getElementById('total');

function renderCart() {
  list.innerHTML = '';
  if (!cart.length) {
    list.innerHTML = '<p class="muted">Your cart is empty.</p>';
    total.textContent = '';
    return;
  }
  cart.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'list-item';
    row.innerHTML = `
      <div>
        <strong>${item.title}</strong>
        <p class="muted">${item.category} · ${currency(item.price)}</p>
      </div>
      <div class="row">
        <button class="btn buy-one">Buy</button>
        <button class="btn btn-danger rm">Remove</button>
      </div>`;
    row.querySelector('.rm').addEventListener('click', () => {
      cart = cart.filter((x) => x.cartId !== item.cartId);
      setJSON(KEYS.cart, cart);
      renderCart();
    });
    row.querySelector('.buy-one').addEventListener('click', () => {
      if (!requireAuth(item.url)) return;
      window.open(item.url, '_blank', 'noopener');
    });
    list.appendChild(row);
  });
  const sum = cart.reduce((s, x) => s + Number(x.price || 0), 0);
  total.textContent = `Subtotal: ${currency(sum)} (${cart.length} item${cart.length > 1 ? 's' : ''})`;
}

document.getElementById('clear').addEventListener('click', () => {
  cart = [];
  setJSON(KEYS.cart, cart);
  msg('cartMsg', 'Cart cleared.');
  renderCart();
});

document.getElementById('checkout').addEventListener('click', () => {
  if (!cart.length) return msg('cartMsg', 'Add items first.', true);
  if (!requireAuth('cart.html?checkout=1')) return;
  cart.forEach((i) => window.open(i.url, '_blank', 'noopener'));
  msg('cartMsg', 'Opened Amazon links in new tabs.');
});

renderCart();

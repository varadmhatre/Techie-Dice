const id = new URLSearchParams(location.search).get('id');
const products = getJSON(KEYS.products, []);
let cart = getJSON(KEYS.cart, []);
const product = products.find((p) => p.id === id) || products[0];

if (product) {
  document.getElementById('pImage').src = product.image;
  document.getElementById('pCategory').textContent = product.category;
  document.getElementById('pTitle').textContent = product.title;
  document.getElementById('pPrice').textContent = currency(product.price);
}

document.getElementById('add').addEventListener('click', () => {
  cart.push({ ...product, cartId: crypto.randomUUID() });
  setJSON(KEYS.cart, cart);
});

document.getElementById('buy').addEventListener('click', () => {
  if (!requireAuth(product.url)) return;
  window.open(product.url, '_blank', 'noopener');
});

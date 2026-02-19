const products = getJSON(KEYS.products, []);
let cart = getJSON(KEYS.cart, []);
const catalog = document.getElementById('catalog');
const count = document.getElementById('count');
const search = document.getElementById('search');
const minPrice = document.getElementById('minPrice');
const maxPrice = document.getElementById('maxPrice');
const categoryList = document.getElementById('categoryList');
const cartCountNav = document.getElementById('cartCountNav');
const applyFilters = document.getElementById('applyFilters');

let activeCategory = 'All';

function syncCartCount() {
  cartCountNav.textContent = String(cart.length);
}

function addToCart(product) {
  cart.push({ ...product, cartId: crypto.randomUUID() });
  setJSON(KEYS.cart, cart);
  syncCartCount();
  render(search.value);
}

function categories() {
  return ['All', ...new Set(products.map((p) => p.category))];
}

function renderCategories() {
  categoryList.innerHTML = '';
  categories().forEach((cat) => {
    const btn = document.createElement('button');
    btn.className = `chip ${cat === activeCategory ? 'chip-active' : ''}`;
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      activeCategory = cat;
      renderCategories();
      render(search.value);
    });
    categoryList.appendChild(btn);
  });
}

function filteredProducts(query) {
  const q = query.trim().toLowerCase();
  const min = Number(minPrice.value || 0);
  const max = Number(maxPrice.value || Number.MAX_SAFE_INTEGER);

  return products.filter((p) => {
    const inSearch = [p.title, p.category].join(' ').toLowerCase().includes(q);
    const inCat = activeCategory === 'All' || p.category === activeCategory;
    const inPrice = Number(p.price) >= min && Number(p.price) <= max;
    return inSearch && inCat && inPrice;
  });
}

function render(query = '') {
  const shown = filteredProducts(query);
  catalog.innerHTML = '';

  shown.forEach((p) => {
    const n = document.getElementById('productTpl').content.cloneNode(true);
    n.querySelector('img').src = p.image;
    n.querySelector('.badge').textContent = p.category;
    n.querySelector('.title').textContent = p.title;
    n.querySelector('.price').textContent = currency(p.price);
    n.querySelector('.image-link').href = `product.html?id=${encodeURIComponent(p.id)}`;
    n.querySelector('.add').addEventListener('click', () => addToCart(p));
    n.querySelector('.buy').addEventListener('click', () => {
      if (!requireAuth(p.url)) return;
      window.open(p.url, '_blank', 'noopener');
    });
    catalog.appendChild(n);
  });

  count.textContent = `${shown.length} products · ${cart.length} in cart`;
}

search.addEventListener('input', (e) => render(e.target.value));
applyFilters.addEventListener('click', () => render(search.value));

syncCartCount();
renderCategories();
render();

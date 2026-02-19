const KEYS = {
  products: 'affiliNovaProducts',
  cart: 'affiliNovaCart',
  users: 'affiliNovaUsers',
  session: 'affiliNovaSession',
  otp: 'affiliNovaOtp',
  adminSession: 'affiliNovaAdmin'
};

const ADMIN = { email: 'owner@affilinova.com', password: 'Admin#2026' };

const seedProducts = [
  { id: crypto.randomUUID(), title: 'Kindle Paperwhite', category: 'Reading', price: 149.99, image: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=900&q=80', url: 'https://www.amazon.com/' },
  { id: crypto.randomUUID(), title: 'Sony WH-1000XM5', category: 'Audio', price: 399.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80', url: 'https://www.amazon.com/' },
  { id: crypto.randomUUID(), title: 'Instant Pot Duo', category: 'Kitchen', price: 99.99, image: 'https://images.unsplash.com/photo-1585515656973-9ce7f4f64f5d?auto=format&fit=crop&w=900&q=80', url: 'https://www.amazon.com/' }
];

const getJSON = (k, fallback) => JSON.parse(localStorage.getItem(k) || JSON.stringify(fallback));
const setJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

function ensureProducts() {
  const current = getJSON(KEYS.products, []);
  if (!current.length) setJSON(KEYS.products, seedProducts);
}
ensureProducts();

function currency(value) { return `$${Number(value).toFixed(2)}`; }
function msg(id, text, err = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.style.color = err ? '#e8a3a3' : '#9ab08a';
}
function requireAuth(nextUrl) {
  const session = getJSON(KEYS.session, null);
  if (session) return true;
  window.location.href = `auth.html?next=${encodeURIComponent(nextUrl)}`;
  return false;
}

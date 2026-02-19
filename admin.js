let products = getJSON(KEYS.products, []);
let adminLogged = localStorage.getItem(KEYS.adminSession) === 'true';

const adminPanel = document.getElementById('adminPanel');
const adminLoginPanel = document.getElementById('adminLoginPanel');

function syncAdminView() {
  adminPanel.style.display = adminLogged ? 'block' : 'none';
  adminLoginPanel.style.display = adminLogged ? 'none' : 'block';
}

function renderList() {
  const list = document.getElementById('productList');
  list.innerHTML = '';
  products.forEach((p) => {
    const row = document.createElement('div');
    row.className = 'list-item';
    row.innerHTML = `<div><strong>${p.title}</strong><p class="muted">${p.category} · ${currency(p.price)}</p></div><button class="btn btn-danger">Delete</button>`;
    row.querySelector('button').addEventListener('click', () => {
      products = products.filter((x) => x.id !== p.id);
      setJSON(KEYS.products, products);
      renderList();
      msg('adminMsg2', 'Product deleted.');
    });
    list.appendChild(row);
  });
}

document.getElementById('adminLoginBtn').addEventListener('click', () => {
  const email = document.getElementById('adminEmail').value.trim().toLowerCase();
  const password = document.getElementById('adminPass').value;
  if (email !== ADMIN.email || password !== ADMIN.password) return msg('adminMsg', 'Invalid admin credentials.', true);
  adminLogged = true;
  localStorage.setItem(KEYS.adminSession, 'true');
  syncAdminView();
  renderList();
});

document.getElementById('addBtn').addEventListener('click', () => {
  const title = document.getElementById('title').value.trim();
  const category = document.getElementById('category').value.trim();
  const price = Number(document.getElementById('price').value);
  const image = document.getElementById('image').value.trim();
  const url = document.getElementById('url').value.trim();
  if (!title || !category || !price || !image || !url) return msg('adminMsg2', 'Fill every field.', true);
  products.unshift({ id: crypto.randomUUID(), title, category, price, image, url });
  setJSON(KEYS.products, products);
  renderList();
  msg('adminMsg2', 'Product added to storefront.');
});

syncAdminView();
if (adminLogged) renderList();

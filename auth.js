const users = getJSON(KEYS.users, []);
const next = new URLSearchParams(window.location.search).get('next') || 'index.html';

function goNext() {
  window.location.href = next;
}

document.getElementById('loginBtn').addEventListener('click', () => {
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass = document.getElementById('loginPass').value;
  const u = users.find((x) => x.email === email && x.password === pass);
  if (!u) return msg('authMsg', 'Invalid login.', true);
  setJSON(KEYS.session, { email: u.email, name: u.name });
  msg('authMsg', 'Login success. Redirecting...');
  goNext();
});

document.getElementById('otpBtn').addEventListener('click', () => {
  const email = document.getElementById('email').value.trim().toLowerCase();
  if (!email) return msg('authMsg', 'Enter email first.', true);
  const token = window.turnstile?.getResponse?.();
  if (!token) return msg('authMsg', 'Complete Turnstile check.', true);
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  setJSON(KEYS.otp, { email, otp, exp: Date.now() + 300000 });
  msg('authMsg', `Demo OTP: ${otp} (replace with legit email API in production)`);
});

document.getElementById('signupBtn').addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('pass').value;
  const otp = document.getElementById('otp').value.trim();
  const record = getJSON(KEYS.otp, null);

  if (!name || !email || !password) return msg('authMsg', 'Fill all signup fields.', true);
  if (!record || record.email !== email || record.otp !== otp || Date.now() > record.exp) return msg('authMsg', 'OTP invalid/expired.', true);
  if (users.some((u) => u.email === email)) return msg('authMsg', 'Email exists. Login instead.', true);

  users.push({ name, email, password });
  setJSON(KEYS.users, users);
  setJSON(KEYS.session, { email, name });
  localStorage.removeItem(KEYS.otp);
  msg('authMsg', 'Account created. Redirecting...');
  goNext();
});

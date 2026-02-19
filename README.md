# AffiliNova (Premium Affiliate Storefront)

A clean, high-end affiliate shopping UI inspired by modern ecommerce patterns, with smooth page transitions and fully functional flows.

## Pages

- `index.html` → storefront with sidebar filters, search, product cards
- `product.html` → product detail view with quick actions
- `cart.html` → cart review + checkout
- `auth.html` → login/signup + Turnstile + OTP step
- `admin.html` → admin-only product management

## Functional UX

- Browse without login.
- Login/signup required only when user clicks **Buy** or **Checkout**.
- Product actions:
  - Add to Cart
  - Buy Now (Amazon redirect after auth)
  - Open detail page
- Cart actions:
  - Remove item
  - Clear cart
  - Buy single item
  - Checkout all

## Cloudflare + Legit Email

OTP is demo in static mode. For production:

1. Deploy on Cloudflare Pages.
2. Replace Turnstile test site key with real key.
3. Add Worker APIs for real OTP email send + verify.
4. Move auth/products/admin to backend DB.

## Admin Demo Credentials

- `owner@affilinova.com`
- `Admin#2026`

## Run

```bash
python3 -m http.server 4173
```

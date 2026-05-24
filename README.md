# Shoppy Deals

Modern affiliate deals platform for Telugu audiences. Users browse deals and redirect to partner stores (Amazon, Flipkart, Myntra, etc.). No checkout or cart — affiliate links only.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion |
| Backend | Node.js, Express 5, MongoDB, Mongoose |
| Auth | JWT (admin only) |

## Project structure

```
shoppydeals/
├── app/                 # Next.js pages (public + /admin)
├── components/          # UI components
├── lib/                 # API client, types, auth helpers
├── backend/             # Express API
│   ├── src/
│   │   ├── models/      # Admin, Product, Category, ClickAnalytics
│   │   ├── routes/
│   │   └── index.ts
│   └── uploads/         # Product images (local)
└── public/
```

## Quick start (local)

### 1. MongoDB

Install and run MongoDB locally, or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and set `MONGODB_URI`.

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env — set JWT_SECRET, ADMIN_PASSWORD, etc.
npm install
npm run seed    # Creates admin, categories, sample products
npm run dev     # http://localhost:5000
```

Default admin (after seed):

- Email: `admin@shoppydeals.com`
- Password: value of `ADMIN_PASSWORD` in `backend/.env` (default `ChangeMe123!`)

### 3. Frontend

```bash
# From project root
cp .env.example .env.local
npm install
npm run dev     # http://localhost:3000
```

Set in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/your_channel
```

### 4. Admin panel

Open [http://localhost:3000/admin](http://localhost:3000/admin) → login → add/edit products.

## Features

**Public site**

- Hero slider (featured deals)
- Trending & latest deals with Load More
- Category pages: mobiles, electronics, fashion, kitchen, beauty, gadgets
- Search with category filter
- Click tracking → opens affiliate URL in new tab
- Sticky header, mobile bottom nav, floating Telegram button
- SEO: metadata, sitemap, robots, Open Graph

**Admin (`/admin`)**

- JWT login
- CRUD products with image upload
- Affiliate URL, store badge, featured toggle
- Categories management
- Dashboard: clicks, top products, store breakdown

## API endpoints

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/health` | — |
| POST | `/api/auth/login` | — |
| GET | `/api/categories` | — |
| GET | `/api/products` | — |
| POST | `/api/clicks/:productId` | — |
| POST | `/api/upload` | JWT |
| GET | `/api/analytics/dashboard` | JWT |

Query params for products: `page`, `limit`, `search`, `category`, `featured`, `trending`.

## Deployment

### Frontend — Vercel

1. Import repo, set root directory to project root.
2. Environment variables:
   - `NEXT_PUBLIC_API_URL` → your Railway/Render API URL
   - `NEXT_PUBLIC_SITE_URL` → `https://your-domain.com`
   - `NEXT_PUBLIC_TELEGRAM_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`

### Backend — Railway or Render

1. Deploy `backend/` folder.
2. Set env: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL` (Vercel URL), `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
3. Run `npm run seed` once via shell.
4. Use persistent volume for `uploads/` or switch to S3/Cloudinary for images in production.

### MongoDB Atlas

Use connection string in `MONGODB_URI` on the backend service.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js dev server |
| `npm run dev:api` | Express API dev server |
| `npm run seed` | Seed DB (backend) |
| `npm run build` | Production Next.js build |
| `npm run build:api` | Compile backend TypeScript |

## Disclaimer

This site lists affiliate deals only. Purchases happen on third-party stores. Prices and stock may change without notice.

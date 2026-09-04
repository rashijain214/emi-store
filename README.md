# SDE1 EMI Plans Project (MySQL)

This is a full-stack demo app showing products with EMI plans backed by a MySQL database.

Quick start

1. Start MySQL with Docker:

```bash
docker-compose up -d
```

2. Backend (in a new terminal):

```bash
cd backend
npm install
cp .env.example .env
# edit .env if needed (DATABASE_URL)
npx prisma generate
node prisma/seed.js
npm run dev
```

3. Frontend (in a new terminal):

```bash
cd frontend
npm install
npm run dev
```

APIs
- `GET /api/products` — list products
- `GET /api/products/:slug` — product details with variants and EMI plans

Database
- MySQL (configured in `docker-compose.yml`)
- Prisma schema: `backend/prisma/schema.prisma`

Deploy
For a single Vercel deployment of the full app:

1. Push this repo to GitHub and create a new Vercel project from the repo root.
2. Set the environment variable `DATABASE_URL` to a managed MySQL connection string.
3. Leave `VITE_API_URL` unset in production so the frontend uses the same origin as the API.
4. Deploy. Vercel will run the root build script and publish `frontend/dist`.

What is deployed on Vercel:
- Frontend: Vite build from `frontend/`.
- API: serverless functions under `api/products`.
- Database: external MySQL, accessed through Prisma.

Local development stays the same:
- Frontend: `cd frontend && npm run dev`
- Backend: `cd backend && npm run dev`


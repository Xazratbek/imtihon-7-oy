# EduShare

Talabalar uchun bilim va fayl almashish platformasi (MVP): Django REST Framework backend + React frontend.

## Backend o'rnatish

```bash
uv sync
cp .env.example .env    # kerakli qiymatlarni to'ldiring (POSTGRES_*, SECRET_KEY)
createdb edushare       # yoki: psql -c "CREATE DATABASE edushare;"
uv run python manage.py migrate
uv run python manage.py createsuperuser
uv run python manage.py runserver 8001
```

## Frontend o'rnatish

```bash
cd frontend
npm install
npm run dev             # http://localhost:5173
```

Vite dev server `/api` so'rovlarni avtomatik `http://127.0.0.1:8001` ga proxy qiladi (`frontend/vite.config.js`).

`.env` da `POSTGRES_DB` bo'sh bo'lsa, loyiha avtomatik SQLite ga tushadi (tez lokal test uchun).

## API hujjatlari

- Swagger UI: `http://127.0.0.1:8000/api/docs/`
- OpenAPI schema: `http://127.0.0.1:8000/api/schema/`
- Admin panel: `http://127.0.0.1:8000/admin/`

## Asosiy endpointlar

| Endpoint | Metod | Tavsif |
|---|---|---|
| `/api/accounts/register/` | POST | Ro'yxatdan o'tish |
| `/api/accounts/login/` | POST | JWT access/refresh olish |
| `/api/accounts/login/refresh/` | POST | Access tokenni yangilash |
| `/api/accounts/me/` | GET | Joriy foydalanuvchi |
| `/api/subjects/` | GET/POST | Fanlar CRUD (yozish faqat admin) |
| `/api/materials/` | GET/POST | Material qidirish/filtrlash/yuklash |
| `/api/materials/{id}/` | GET/PATCH/DELETE | Material detail |
| `/api/materials/{id}/download/` | POST | Yuklab olish (download_count +1) |
| `/api/materials/tags/` | GET | Teglar ro'yxati |
| `/api/materials/dashboard/` | GET | Statistika |
| `/api/ratings/` | POST | Like/Dislike (toggle) |
| `/api/ai/summary/` | POST | AI xulosa |
| `/api/ai/generate/` | POST | AI referat/konspekt generatsiya |
| `/api/ai/auto-tag/` | POST | AI teg tavsiyasi |

Imtihonda himoya qilish uchun har bir qismning tushuntirilishi: **HIMOYA.md**.

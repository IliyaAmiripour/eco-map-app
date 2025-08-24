# Eco Fullstack – Render Ready

این بسته شامل **backend** (Node.js + Express + Firebase Admin) و **frontend** شماست؛ آماده برای دیپلوی روی **Render**.

## ساختار
- `backend/` → سرور Express
- `frontend/` → کد فرانت‌اند

---

## دیپلوی بک‌اند (Web Service با Dockerfile)
1) Render → **New + → Web Service** → **Deploy an existing Dockerfile**
2) مسیر Dockerfile: `backend/Dockerfile`
3) Environment Variables:
   - `PORT=8080`
   - `FIREBASE_PROJECT_ID=your-project-id`
   - `FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com`
   - `SERVICE_ACCOUNT_JSON=<متن کامل JSON سرویس‌اکانت>`
4) بعد از Deploy: `GET /health` را تست کنید.

## دیپلوی فرانت‌اند (Static Site)
- اگر Build دارد:
  - Build Command: `npm install && npm run build`
  - Publish Directory: `dist` یا `build`
- اگر استاتیک ساده است: Publish Directory را ریشه قرار دهید.

## اتصال
- آدرس API را در فرانت به URL بک‌اند روی Render تغییر دهید.

موفق باشید 🌱

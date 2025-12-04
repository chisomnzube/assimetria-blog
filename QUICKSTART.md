# 🚀 QUICK START GUIDE

## Get the app running in 5 minutes!

### Step 1: Open Two Terminals

**Terminal 1 - Backend**
```bash
cd c:\wamp64\NextJS\assimetria-blog\backend
npm start
```

Wait for:
```
✅ Database connection successful
🚀 Server running on port 4000
```

**Terminal 2 - Frontend**
```bash
cd c:\wamp64\NextJS\assimetria-blog
npm run dev
```

Wait for:
```
▲ Next.js 14.x.x
- Local: http://localhost:3000
```

### Step 2: Open Browser

Go to: **http://localhost:3000**

You should see:
- 3 blog articles
- Clean, modern UI
- Click any article to read full content

### Step 3: Test the API

Open: **http://localhost:4000/api/articles**

You should see JSON response with all articles.

---

## ✅ Already Done For You

- ✅ Database initialized
- ✅ 3 sample articles seeded
- ✅ Dependencies installed
- ✅ Environment configured

---

## 🔧 Common Commands

```bash
# Backend
cd backend
npm start          # Start backend server
npm run dev        # Start with auto-reload

# Frontend  
npm run dev        # Start frontend
npm run build      # Build for production

# Database
cd backend
npm run init-db    # Initialize database (already done)
npm run seed-sample # Add sample articles (already done)
```

---

## 🐳 Using Docker Instead?

```bash
# From project root
docker-compose up --build
```

Then visit: http://localhost:3000

---

## ❓ Troubleshooting

**Backend won't start?**
- Check if port 4000 is free
- Verify `.env` files exist in root and backend/

**Frontend shows error?**
- Make sure backend is running first
- Check NEXT_PUBLIC_API_URL in `.env`

**No articles showing?**
- Run: `cd backend && npm run seed-sample`

---

## 📝 Want to Generate AI Articles?

1. Add credits to your OpenAI account
2. Update OPENAI_API_KEY in backend/.env
3. Run: `curl -X POST http://localhost:4000/api/articles/generate`

---

## 🎯 What Next?

- Explore the code in `app/` and `backend/src/`
- Check `README.md` for full documentation
- See `docs/ARCHITECTURE.md` for system design
- Review `docs/LOCAL_SETUP.md` for detailed setup

---

**That's it! Your blog is running! 🎉**

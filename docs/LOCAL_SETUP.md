# Local Setup Guide

This guide will walk you through setting up the AI Blog project on your local machine.

## Step 1: Prerequisites

Make sure you have the following installed:

- **Node.js 18+**: [Download here](https://nodejs.org/)
- **Git**: [Download here](https://git-scm.com/)
- **Docker Desktop** (optional): [Download here](https://www.docker.com/products/docker-desktop/)

## Step 2: Clone the Repository

```bash
git clone <your-repository-url>
cd assimetria-blog
```

## Step 3: Set Up Database

You have two options:

### Option A: Use Neon (Cloud PostgreSQL) - Recommended

1. Go to [Neon](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string

### Option B: Use Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database: `createdb blogdb`
3. Your connection string will be: `postgresql://localhost:5432/blogdb`

## Step 4: Configure Environment Variables

### Frontend Environment

Create `.env` in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your values:

```env
OPENAI_API_KEY=sk-your-openai-api-key
DATABASE_URL=postgresql://your-database-url
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend Environment

Create `backend/.env`:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
OPENAI_API_KEY=sk-your-openai-api-key
DATABASE_URL=postgresql://your-database-url
PORT=4000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

## Step 5: Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ..
npm install
```

## Step 6: Initialize Database

```bash
cd backend
npm run init-db
```

You should see:
```
✅ Articles table created successfully
✅ Database indexes created
✅ Database initialization complete!
```

## Step 7: Seed Initial Articles

```bash
npm run seed
```

This will generate 3 initial articles using OpenAI. You should see:
```
🌱 Starting article seeding...
📝 Generating 3 articles...
📄 Generating article 1/3...
✅ Created: "Article Title"
...
✅ Seeding complete! All articles generated.
```

## Step 8: Run the Application

### Option A: Run with Docker Compose (Easiest)

From the root directory:

```bash
docker-compose up --build
```

Wait for the containers to start, then access:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000/api/articles

### Option B: Run Manually (Development Mode)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
✅ Database connection successful
🚀 Server running on port 4000
📝 API: http://localhost:4000/api/articles
❤️  Health: http://localhost:4000/health
📅 Article generation scheduled for 10:00 AM daily
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

You should see:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
```

## Step 9: Verify Everything Works

1. **Open the Frontend**: http://localhost:3000
   - You should see 3 articles on the home page
   - Click on any article to view it

2. **Test the Backend API**: http://localhost:4000/api/articles
   - You should see a JSON response with all articles

3. **Check Health**: http://localhost:4000/health
   - Should return: `{"status":"ok","timestamp":"...","service":"blog-backend"}`

## Step 10: Generate a New Article (Optional)

You can manually generate a new article:

```bash
curl -X POST http://localhost:4000/api/articles/generate
```

Or use Postman/Insomnia to make a POST request to:
```
http://localhost:4000/api/articles/generate
```

## Troubleshooting

### Backend won't start

**Error: Connection refused**
- Make sure PostgreSQL is running
- Check your DATABASE_URL is correct
- Try connecting to the database with a PostgreSQL client

**Error: Invalid API key**
- Check your OPENAI_API_KEY is correct
- Make sure it starts with `sk-`

### Frontend can't connect to backend

**Error: Failed to fetch articles**
- Make sure backend is running on port 4000
- Check NEXT_PUBLIC_API_URL in `.env`
- Verify CORS settings in backend

### Database initialization fails

```bash
# Try connecting manually
psql "your_database_url"

# If successful, try init again
npm run init-db
```

### Port already in use

**Error: Port 3000 is already in use**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

## Next Steps

- Explore the code in `app/`, `backend/src/`
- Customize article topics in `backend/src/services/aiClient.js`
- Modify the UI in `components/`
- Check `docs/ARCHITECTURE.md` for more details

## Common Commands

```bash
# Backend
cd backend
npm run dev          # Development mode
npm start            # Production mode
npm run init-db      # Initialize database
npm run seed         # Seed articles

# Frontend
npm run dev          # Development mode
npm run build        # Build for production
npm start            # Run production build

# Docker
docker-compose up    # Start all services
docker-compose down  # Stop all services
docker-compose logs  # View logs
```

## Getting Help

If you encounter issues:

1. Check the logs for error messages
2. Review the troubleshooting section above
3. Make sure all environment variables are set correctly
4. Verify dependencies are installed: `npm install`
5. Check that ports 3000 and 4000 are available

## Ready for Production?

Once everything works locally, see:
- `README.md` for AWS deployment instructions
- `docs/ARCHITECTURE.md` for infrastructure details
- `buildspec.yml` for CI/CD configuration

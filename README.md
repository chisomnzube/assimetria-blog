# AI Blog - Auto-Generated Content Platform

A full-stack blog application that automatically generates articles using OpenAI's GPT models. Built with Next.js, Node.js, and PostgreSQL, containerized with Docker, and deployable to AWS.

## 🏗️ Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   Next.js       │ ───> │   Node.js       │ ───> │   PostgreSQL    │
│   Frontend      │      │   Backend API   │      │   Database      │
│   (Port 3000)   │      │   (Port 4000)   │      │   (Neon Cloud)  │
└─────────────────┘      └─────────────────┘      └─────────────────┘
                                │
                                ▼
                         ┌─────────────────┐
                         │   OpenAI API    │
                         │   (GPT-3.5)     │
                         └─────────────────┘
```

## ✨ Features

- **AI-Powered Content**: Automatic article generation using OpenAI GPT-3.5-turbo
- **Automated Publishing**: Cron job generates 1 new article daily at 10:00 AM
- **Modern UI**: Clean, minimal interface with responsive design
- **RESTful API**: Well-structured backend with Express.js
- **Containerized**: Docker & Docker Compose for easy deployment
- **AWS Ready**: CodeBuild + ECR + EC2 deployment pipeline
- **Database**: PostgreSQL with connection pooling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (or use Neon cloud database)
- OpenAI API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd assimetria-blog
   ```

2. **Set up environment variables**
   
   Copy `.env` files and configure:
   ```bash
   # Root .env (for frontend)
   NEXT_PUBLIC_API_URL=http://localhost:4000
   OPENAI_API_KEY=your_key_here
   DATABASE_URL=your_postgres_url
   
   # backend/.env
   DATABASE_URL=your_postgres_url
   OPENAI_API_KEY=your_key_here
   PORT=4000
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Initialize the database**
   ```bash
   cd backend
   npm install
   npm run init-db
   npm run seed
   ```

4. **Run with Docker Compose** (Recommended)
   ```bash
   docker-compose up --build
   ```
   
   OR **Run manually**:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm install
   npm run dev
   
   # Terminal 2 - Frontend
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000/api/articles
   - Health Check: http://localhost:4000/health

## 📁 Project Structure

```
assimetria-blog/
├── app/                      # Next.js app directory
│   ├── article/[id]/        # Article detail page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── backend/                  # Node.js backend
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   │   ├── aiClient.js  # OpenAI integration
│   │   │   └── articleJob.js # Cron job scheduler
│   │   ├── scripts/         # Database scripts
│   │   └── index.js         # Server entry point
│   ├── Dockerfile           # Backend container
│   └── package.json
├── components/              # React components
│   ├── ArticleCard.js
│   ├── Header.js
│   └── Footer.js
├── lib/                     # Utilities
│   ├── api.js              # API client
│   └── utils.js            # Helper functions
├── scripts/                 # Deployment scripts
│   ├── init-ec2.sh         # EC2 initialization
│   └── deploy.sh           # Deployment automation
├── buildspec.yml           # AWS CodeBuild configuration
├── docker-compose.yml      # Local development setup
├── Dockerfile              # Frontend container
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/articles` | Get all articles |
| GET | `/api/articles/:id` | Get single article |
| POST | `/api/articles/generate` | Generate new article |

## 🐳 Docker Deployment

### Build Images

```bash
# Backend
cd backend
docker build -t blog-backend .

# Frontend
docker build -t blog-frontend .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

## ☁️ AWS Deployment

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed deployment instructions.

## 📝 License

MIT

## 👤 Author

Created for Asymetric Ventures Technical Challenge

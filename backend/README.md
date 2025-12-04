# Blog Backend API

Auto-generated blog backend built with Node.js, Express, and PostgreSQL.

## Features

- RESTful API for blog articles
- AI-powered article generation using OpenAI
- Automated daily article generation using cron jobs
- PostgreSQL database with connection pooling
- CORS and security middleware
- Health check endpoint

## Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API key

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@host:port/database
OPENAI_API_KEY=your_openai_api_key
PORT=4000
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

## Database Setup

Initialize the database:

```bash
npm run init-db
```

Seed with initial articles:

```bash
npm run seed
```

## Running

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

- `GET /health` - Health check
- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get single article
- `POST /api/articles/generate` - Generate new article

## Docker

Build:
```bash
docker build -t blog-backend .
```

Run:
```bash
docker run -p 4000:4000 --env-file .env blog-backend
```

## Automated Article Generation

Articles are automatically generated daily at 10:00 AM using node-cron. You can also trigger manual generation via the `/api/articles/generate` endpoint.

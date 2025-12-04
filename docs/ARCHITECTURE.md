# Architecture Documentation

## System Overview

The AI Blog platform is a full-stack application designed to automatically generate and publish blog articles using artificial intelligence. The system consists of three main components:

1. **Frontend (Next.js)**: Server-side rendered React application
2. **Backend (Node.js)**: RESTful API with automated article generation
3. **Database (PostgreSQL)**: Persistent storage for articles

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript/JavaScript
- **Styling**: Tailwind CSS
- **Rendering**: Server-Side Rendering (SSR)

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Database Client**: node-postgres (pg)
- **Scheduler**: node-cron
- **AI Integration**: OpenAI SDK

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: AWS CodeBuild
- **Registry**: Amazon ECR
- **Hosting**: AWS EC2
- **Database**: Neon (PostgreSQL Cloud)

## Component Architecture

### Frontend Architecture

```
app/
├── layout.tsx              # Root layout with metadata
├── page.tsx                # Home page (article list)
└── article/[id]/
    └── page.js             # Article detail page

components/
├── Header.js               # Navigation header
├── Footer.js               # Site footer
└── ArticleCard.js          # Article preview card

lib/
├── api.js                  # Backend API client
└── utils.js                # Helper functions
```

**Key Features**:
- Server-side data fetching for SEO
- Dynamic routing for articles
- Responsive design
- Error handling and loading states

### Backend Architecture

```
src/
├── index.js                # Express server setup
├── config/
│   └── database.js         # PostgreSQL connection pool
├── models/
│   └── Article.js          # Article data model
├── routes/
│   └── articles.js         # API route handlers
├── services/
│   ├── aiClient.js         # OpenAI integration
│   └── articleJob.js       # Cron job scheduler
└── scripts/
    ├── initDb.js           # Database initialization
    └── seedArticles.js     # Initial data seeding
```

**API Design**:
- RESTful endpoints
- JSON responses
- Error handling middleware
- CORS configuration
- Health check endpoint

## Data Flow

### Article Listing Flow

```
User Request
    ↓
Next.js Page (SSR)
    ↓
API Client (lib/api.js)
    ↓
Backend API (/api/articles)
    ↓
Article Model
    ↓
PostgreSQL Database
    ↓
Response (JSON)
    ↓
React Component Rendering
    ↓
HTML Response to User
```

### Article Generation Flow

```
Cron Trigger (Daily 10:00 AM)
    ↓
articleJob.js
    ↓
aiClient.js
    ↓
OpenAI API Request
    ↓
Article Content Generated
    ↓
Article Model (Create)
    ↓
PostgreSQL Insert
    ↓
Article Stored
```

## Database Design

### Articles Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | SERIAL | PRIMARY KEY | Unique identifier |
| title | VARCHAR(500) | NOT NULL | Article title |
| content | TEXT | NOT NULL | Full article content |
| author | VARCHAR(255) | NOT NULL | Author name |
| excerpt | TEXT | - | Short preview |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_articles_created_at` on `created_at DESC` for efficient sorting

## Security Considerations

1. **Environment Variables**: Sensitive data stored in `.env` files
2. **CORS**: Configured to allow only frontend origin
3. **SQL Injection**: Using parameterized queries
4. **Helmet**: Security headers middleware
5. **SSL**: Database connections use SSL

## Scalability Considerations

1. **Connection Pooling**: PostgreSQL connection pool for efficiency
2. **Stateless Backend**: Can be horizontally scaled
3. **CDN Ready**: Static assets can be served via CDN
4. **Database**: Neon provides auto-scaling PostgreSQL

## Deployment Architecture

### Local Development

```
Docker Compose
├── Frontend Container (Port 3000)
├── Backend Container (Port 4000)
└── PostgreSQL Container (Port 5432)
```

### Production (AWS)

```
GitHub Repository
    ↓
AWS CodeBuild (Triggered on push)
    ↓
Docker Images Built
    ↓
Amazon ECR (Image Storage)
    ↓
EC2 Instance (Pull & Deploy)
    ├── Frontend Container
    └── Backend Container
         ↓
    Neon PostgreSQL (Cloud)
```

## CI/CD Pipeline

1. **Source**: GitHub repository
2. **Build**: AWS CodeBuild
   - Pulls source code
   - Builds Docker images
   - Runs tests (if configured)
   - Pushes to ECR
3. **Deploy**: EC2 Instance
   - Pulls latest images from ECR
   - Stops old containers
   - Starts new containers
   - Health checks

## Monitoring & Maintenance

### Health Checks

- **Backend**: `/health` endpoint returns server status
- **Docker**: Health check configured in Dockerfile
- **Database**: Connection test on server start

### Logging

- **Backend**: Morgan middleware for HTTP logging
- **Application**: Console logs for debugging
- **Docker**: Container logs via `docker logs`

### Backup Strategy

- **Database**: Neon provides automatic backups
- **Code**: Version controlled in Git
- **Environment**: Document all configuration

## Future Enhancements

1. **Authentication**: User accounts and protected routes
2. **Admin Panel**: UI for managing articles
3. **Analytics**: Track article views and engagement
4. **Search**: Full-text search functionality
5. **Categories**: Organize articles by topic
6. **Comments**: User discussion system
7. **Caching**: Redis for improved performance
8. **CDN**: CloudFront for static assets
9. **Auto-scaling**: ECS or Kubernetes deployment
10. **Monitoring**: CloudWatch or Datadog integration

## Cost Optimization

- **Neon Free Tier**: PostgreSQL hosting
- **EC2 t2.micro**: Free tier eligible
- **OpenAI**: GPT-3.5-turbo is cost-effective
- **CodeBuild**: Free tier includes 100 build minutes
- **ECR**: Free tier includes 500 MB storage

## Performance Targets

- **Page Load**: < 2 seconds
- **API Response**: < 500ms
- **Article Generation**: 10-30 seconds
- **Uptime**: 99.9%

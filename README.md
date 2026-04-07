# DevOps Portfolio — Kanhaiya Tiwari

A production-grade personal portfolio platform for a DevOps & Cloud Engineer. Built with Next.js App Router, a Go backend, PostgreSQL, and fully containerized with Docker Compose. Includes a live WebSocket DevOps dashboard, Gemini AI recruiter chat, interactive multi-page sections, and a certificate gallery.

**Live:** [https://info.buildwithkanha.shop](https://info.buildwithkanha.shop)

---

## 🚀 Features

- **Multi-page Next.js App Router** — Home, About, Experience, Projects, Skills, Gallery, Summary, Contact
- **Live DevOps Dashboard** (WebSocket-backed real-time feed):
  - CI/CD pipeline status tiles (Build, Test, Scan, Deploy)
  - Kubernetes cluster simulation (pods, ready pods, deployments)
  - Prometheus-style monitoring metrics (CPU, memory, latency, error rate)
  - Streaming log viewer
  - AWS architecture preview (ALB, EC2, RDS, S3)
  - Terraform configuration snapshot panel
- **Gemini AI Recruiter Chat** (`/assistant/stream`):
  - Token-by-token SSE streaming with ChatGPT-style interface
  - Portfolio Q&A with graceful fallback answers
- **Robot Assistant** (`RobotAssistant.tsx` + `RobotAvatar.tsx`):
  - Drag-to-rotate 360° interaction and wheel-based zoom
  - Voice input and voice response support
- **Contact Form** — saves to PostgreSQL and sends Gmail email notification to admin
- **Gallery Page** — categorized image viewer (certificates, internship certificates, academic results) with fullscreen lightbox
- **Scroll-reveal animations** and responsive layout across all sections

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (^16.1.1), React 19, TypeScript |
| Styling | Tailwind CSS 3.4, custom `globals.css` design tokens |
| Fonts | Manrope (body), Space Grotesk (title) via `next/font/google` |
| Icons | Lucide React |
| Backend | Go 1.25.5, gorilla/mux, godotenv |
| Realtime | gorilla/websocket (WebSocket) + SSE chunked streaming |
| AI | Google Gemini 1.5 Flash (`/v1beta/models/gemini-1.5-flash`) |
| Email | Gmail SMTP via `GMAIL_USERNAME` + `GMAIL_APP_PASSWORD` |
| Database | PostgreSQL 16 (lib/pq driver) |
| Containers | Docker, Docker Compose |
| Frontend runtime | nginx:alpine (static export served via nginx) |
| Backend runtime | distroless (multi-stage Go build) |

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Home — hero, intro, featured projects, AI chat, contact form |
| `/about` | About — identity, core strengths, current role, goals |
| `/experience` | Experience — internships with expandable achievement lists |
| `/projects` | Projects — 7 projects with GitHub links and tech tags |
| `/skills` | Skills — 11 skills with interactive proficiency bars |
| `/gallery` | Gallery — certifications list + filterable image gallery |
| `/summary` | Summary — concise profile highlights and career objective |
| `/contact` | Contact — contact details, resume download link, and message form |

---

## 🧩 Folder Structure

```text
DevOps-Portfolio/
├── backend/
│   ├── db/
│   │   └── postgres.go          # DB connection init
│   ├── email/                   # Gmail SMTP helper
│   ├── migrations/              # SQL migration files
│   ├── models/                  # Data models (Contact)
│   ├── routes/
│   │   ├── assistant.go         # Gemini standard + SSE streaming endpoints
│   │   ├── contact.go           # Contact form save + email notification
│   │   └── devops_stream.go     # WebSocket telemetry generator
│   ├── main.go                  # Server entry point, CORS middleware
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── app/
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── summary/page.tsx
│   │   ├── layout.tsx           # Root layout with Nav
│   │   └── page.tsx             # Home page
│   ├── components/
│   │   ├── CommandParser.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Cursor.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── LiveDevOpsDashboard.tsx
│   │   ├── Nav.tsx
│   │   ├── OutputBlock.tsx
│   │   ├── RecruiterAIChat.tsx
│   │   ├── RobotAssistant.tsx
│   │   └── RobotAvatar.tsx
│   ├── data/
│   │   ├── experience.json
│   │   ├── profile.json
│   │   ├── projects.json
│   │   ├── skills.json
│   │   └── summary.json
│   ├── styles/
│   │   └── globals.css          # Design tokens, animations, utility classes
│   ├── public/
│   │   └── images/certificates/ # Certificate and academic result images
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── next.config.js
│   └── package.json
├── docker-compose.yml
├── .env.compose.example
├── go.mod
└── go.sum
```

---

## 🔌 API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/contact` | Saves message to PostgreSQL and emails admin via Gmail |
| `POST` | `/assistant` | Standard Gemini AI response (single JSON reply) |
| `POST` | `/assistant/stream` | SSE streaming Gemini AI response (token-by-token chunks) |
| `GET` | `/devops/ws` | WebSocket feed — emits telemetry metrics every 1.2 s |

---

## 📦 Local Setup

### Prerequisites

- Node.js 20+ and npm
- Go 1.21+
- PostgreSQL (or use Docker Compose)

### 1) Environment Setup

```bash
# For Docker Compose (full stack)
cp .env.compose.example .env

# For running backend locally
cp backend/.env.example backend/.env

# For running frontend locally
cp frontend/.env.example frontend/.env.local
```

**Backend environment variables** (`backend/.env.example`):

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `ADMIN_EMAIL` | Recipient address for contact form emails |
| `GMAIL_USERNAME` | Gmail sender address |
| `GMAIL_APP_PASSWORD` | Gmail App Password (not your account password) |
| `GEMINI_API_KEY` | Google Gemini API key |

**Frontend environment variables** (`frontend/.env.example`):

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Browser-accessible backend URL (default: `http://localhost:8080`) |

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend available at `http://localhost:3000`

### 3) Backend

```bash
go mod download
go run main.go
```

Backend available at `http://localhost:8080`

---

## 🐳 Docker Deployment

Production-ready Docker images are included:

- **Frontend**: multi-stage `node:20` build → `nginx:alpine` runtime (static Next.js export)
- **Backend**: multi-stage Go build → `distroless` runtime image
- **Database**: `postgres:16-alpine` with health check

### Run the full platform

```bash
cp .env.compose.example .env
# Edit .env and fill in GEMINI_API_KEY, GMAIL_USERNAME, GMAIL_APP_PASSWORD, ADMIN_EMAIL
docker compose up --build -d
```

### Local URLs

| Service | URL |
|---|---|
| Frontend | `http://localhost:3000` |
| Backend API | `http://localhost:8080` |
| PostgreSQL | `localhost:5432` |

### Stop the platform

```bash
docker compose down
```

---

## 🚀 Deployment

### GitHub Pages (Static Export)

The repository includes `.github/workflows/gh-pages.yml` which builds the Next.js frontend as a static site and publishes it to the `gh-pages` branch on every push to `main`. The workflow uses Node.js 20.x.

Steps to enable:

1. Push code to the `main` branch.
2. Go to **Settings → Pages** in your GitHub repository.
3. Set source to the `gh-pages` branch and save.

### Docker Compose CI

`.github/workflows/docker-compose.yml` validates the compose config and builds both Docker images on push and pull requests.

### Build frontend bundle locally

```bash
cd frontend
npm run build
npm start
```

---

## 👤 Author

**Kanhaiya Tiwari** — DevOps & Cloud Engineer  
Final-year B.Tech Computer Science Engineering student at AKS University, Satna  
Based in Jabalpur, India

- Email: [kt230088@gmail.com](mailto:kt230088@gmail.com)
- GitHub: [@Kanhaiya-Tiwari](https://github.com/Kanhaiya-Tiwari)
- LinkedIn: [Kanhaiya Tiwari](https://www.linkedin.com/in/kanhaiya-tiwari-46685422a)

---

## 📝 License

ISC


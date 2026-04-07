# Portfolio 2026 - Production-Grade DevOps Platform

FAANG-style personal platform with futuristic UI, real-time DevOps telemetry, recruiter-focused AI chat, and containerized deployment.

## 🚀 Feature Set

- **Dark Futuristic UI**: glassmorphism cards, layered gradients, micro-motion, and scroll reveal transitions
- **Live DevOps Dashboard** (WebSocket-backed):
  - CI/CD pipeline status tiles
  - Kubernetes cluster simulation
  - Prometheus-style monitoring metrics
  - Streaming logs viewer
- **Architecture + IaC Views**:
  - AWS architecture preview blocks (ALB, EC2, RDS, S3)
  - Terraform configuration snapshot panel
- **Gemini AI Recruiter Chat**:
  - `/assistant/stream` token streaming endpoint
  - ChatGPT-style interface with typing state
  - Resume/project Q&A behavior and graceful fallback answers
- **Large 3D Robot Assistant**:
  - drag-to-rotate 360 interaction
  - wheel-based zoom/rotation behavior
  - voice input + voice response support
- **Mobile-first responsive layout** across all sections

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Go (Golang)
- **Database**: PostgreSQL
- **Containers**: Docker, Docker Compose
- **Realtime**: Gorilla WebSocket + streaming HTTP (SSE-style chunks)

## 📦 Local Setup

### Prerequisites
- Node.js 18+ and npm
- Go 1.21+
- PostgreSQL

### 1) Environment Setup

```bash
cp .env.compose.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

Required key variables:

- `GEMINI_API_KEY`
- `DATABASE_URL` (for local non-docker run)
- `NEXT_PUBLIC_BACKEND_URL`

### 2) Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 3) Backend Setup

```bash
cd backend
go mod download
go run main.go
```

## 🔌 API Endpoints

- `POST /contact` - contact form submission
- `POST /assistant` - standard AI response/tip
- `POST /assistant/stream` - streaming AI response chunks
- `GET /devops/ws` - WebSocket telemetry feed for live dashboard

## 🐳 Docker Deployment

This repo now includes production-friendly Docker images:

- Frontend: `node:20-slim` build stage + `nginx:alpine` runtime
- Backend: Go multi-stage build + `distroless` runtime image
- Database: `postgres:16-alpine`

### Run full platform

```bash
cp .env.compose.example .env
docker compose up --build -d
```

### Local URLs

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080`
- Postgres: `localhost:5432`

### Stop platform

```bash
docker compose down
```

## 🧩 Folder Structure

```text
backend/
  db/
  routes/
    assistant.go        # Gemini standard + streaming endpoints
    devops_stream.go    # WebSocket telemetry stream
frontend/
  app/
    page.tsx            # Main premium landing experience
  components/
    LiveDevOpsDashboard.tsx
    RecruiterAIChat.tsx
    RobotAssistant.tsx
  styles/
    globals.css         # Design system + motion
```

## ⚙️ Implementation Flow

1. Build dark glass design primitives in `globals.css`.
2. Compose modular section components for projects, skills, dashboard, and chat.
3. Implement WebSocket telemetry generator in backend (`/devops/ws`).
4. Add streaming assistant endpoint (`/assistant/stream`) with Gemini integration.
5. Wire frontend chat parser to stream token chunks in real-time.
6. Containerize services and validate with `docker compose up -d --build`.
7. Add CI workflows for compose validation and image build checks.

## 🚀 Deployment

### GitHub Pages

This repository includes a GitHub Actions workflow that builds the Next.js frontend as a static site and publishes it to the `gh-pages` branch. The workflow now uses **Node.js 20.x** (required by your Next.js version); make sure any local development uses the same or newer version. The site will be available at `https://<your‑username>.github.io/<your-repo>` once you enable GitHub Pages in the repository settings. Steps:

1. Push your code to the `main` branch (the workflow also compiles the Go backend to catch any errors).
2. Go to **Settings > Pages** in your GitHub repository.
3. Choose the `gh-pages` branch as the source and save.

The workflow (`.github/workflows/gh-pages.yml`) runs automatically on every push to `main`.

Additional CI workflow (`.github/workflows/docker-compose.yml`) validates compose config and builds both Docker images on push/PR.

### Live Link

- Custom domain: `https://info.buildwithkanha.shop`
- GitHub Pages fallback: `https://<your-username>.github.io/portfolio-2026`

Build frontend production bundle locally:

```bash
cd frontend
npm run build
npm start
```

## 📝 License

ISC

## 👤 Author

**Kanhaiya Tiwari**
- Email: kt230088@gmail.com
- GitHub: [@Kanhaiya-Tiwari](https://github.com/Kanhaiya-Tiwari)
- LinkedIn: [Kanhaiya Tiwari](https://www.linkedin.com/in/kanhaiya-tiwari-46685422a)

---

Built with ❤️ using Next.js and Go


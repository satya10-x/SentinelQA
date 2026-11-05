# SentinelQA

SentinelQA is an autonomous UI testing and self-healing system designed to continuously ingest Jira ticket acceptance criteria, synthesize reliable end-to-end Playwright test suites using the Groq LLM API, execute headless browser test runs, and automatically heal broken locators when UI selectors shift across application releases.

## Tech Stack

- **Backend:** Node.js, Express.js (ES Modules, `"type": "module"`), Mongoose (MongoDB ODM), Helmet, CORS, Morgan
- **Frontend:** React 18, Vite, Tailwind CSS, React Router v6, Axios, Lucide React icons
- **Database:** MongoDB (configured via environment connection string)
- **Tooling & Orchestration:** npm monorepo with `concurrently`

---

## Monorepo Architecture

```text
sentinelqa/
├── server/                    # Node.js + Express backend API
│   ├── src/
│   │   ├── config/            # Environment parsing (env.js) & Mongoose DB connection (db.js)
│   │   ├── controllers/       # Controller logic (health.controller.js)
│   │   ├── routes/            # Route declarations (index.js, health.routes.js)
│   │   ├── models/            # Mongoose schemas & models (foundation placeholder)
│   │   ├── services/          # Business logic & LLM services (foundation placeholder)
│   │   ├── middleware/        # Global error and 404 handlers (errorHandler.js, notFound.js)
│   │   ├── utils/             # Logger, ApiError, and asyncHandler
│   │   ├── app.js             # Express app setup and middleware pipeline
│   │   └── server.js          # Server entry point with graceful shutdown handling
│   ├── .env.example           # Environment template for server configuration
│   └── package.json
├── client/                    # Vite + React frontend application
│   ├── src/
│   │   ├── api/               # Axios client instance (axios.js)
│   │   ├── components/        # Reusable UI components (StatCard.jsx, EmptyState.jsx)
│   │   ├── hooks/             # Custom React hooks (useHealth.jsx)
│   │   ├── layouts/           # App layout with responsive navigation (AppLayout.jsx)
│   │   ├── pages/             # Pages: Dashboard, Tickets, TestRuns, Repairs, Settings, NotFound
│   │   ├── utils/             # String formatters and helper utilities
│   │   ├── App.jsx            # Central React Router configuration
│   │   ├── index.css          # Tailwind CSS styles
│   │   └── main.jsx           # React DOM root entry
│   ├── .env.example           # Environment template for client
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── vite.config.js         # Vite bundler configuration
│   └── package.json
├── demo-app/                  # Placeholder for sample target application under test
├── artifacts/                 # Static storage for test run reports and failure screenshots
├── .gitignore                 # Excludes secrets, node_modules, build outputs, and logs
├── package.json               # Monorepo root scripts with concurrently
└── README.md
```

---

## Setup & Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- **MongoDB**: A running local or remote MongoDB instance (e.g., MongoDB Atlas or `mongodb://localhost:27017/sentinelqa`)

### 2. Configure Environment Variables

#### Backend (`server/.env`):
Copy `server/.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```
Populate the environment variables in `server/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/sentinelqa

# Optional: Groq LLM Integration (for test generation and locator healing)
GROQ_API_KEY=
GROQ_MODEL=llama-3.3-70b-versatile

# Target Application URL
DEMO_APP_URL=http://localhost:4000

# Optional: Jira Cloud Integration (for user story sync)
JIRA_BASE_URL=
JIRA_EMAIL=
JIRA_API_TOKEN=
JIRA_PROJECT_KEY=
```
> **Note:** Only `MONGODB_URI` is required to start the backend. If optional integration keys (Groq, Jira) are missing, a friendly startup warning is logged and the server starts in degraded mode with mock/disabled integrations.

#### Frontend (`client/.env`):
Copy `client/.env.example` to `client/.env`:
```bash
cp client/.env.example client/.env
```
Set the API target URL:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies
Run the monorepo installation script from the root directory:
```bash
npm run install:all
```
*This installs root dependencies (`concurrently`), server dependencies, and client dependencies.*

### 4. Run the Application
Launch both backend and frontend concurrently:
```bash
npm run dev
```

Alternatively, you can run them individually in separate terminals:
```bash
# Terminal 1: Backend API (runs on port 5000)
npm run dev:server

# Terminal 2: Vite React Frontend (runs on port 5173)
npm run dev:client
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the SentinelQA dashboard.

---

## API Endpoints

### Health Check
- **Endpoint:** `GET /api/health`
- **Description:** Verifies service uptime, MongoDB connection status, and integration readiness without exposing secrets.
- **Example Response:**
  ```json
  {
    "success": true,
    "service": "SentinelQA API",
    "uptime": 42.15,
    "timestamp": "2026-11-05T17:00:00.000Z",
    "db": "connected",
    "integrations": {
      "groq": false,
      "jira": false
    }
  }
  ```

### Static Artifacts
- **Endpoint:** `GET /artifacts/*`
- **Description:** Serves static test artifacts, screenshots, and Playwright execution traces stored in `sentinelqa/artifacts/`.

---

## Security

- **Zero Hardcoded Secrets:** All credentials, API tokens (Groq, Jira), database URIs, and port configurations are strictly sourced from environment variables (`.env`).
- **Secret Protection:** Root `.gitignore` prevents `.env` and `.env.*` files from ever being committed to source control (only `.env.example` templates are tracked).
- **Safe Telemetry:** Health checks and status endpoints report boolean configuration flags (`true` / `false`) and never return secret keys or tokens.
- **Defensive Headers & Sanitation:** Express is shielded with `helmet` security headers, strict CORS rules bound to `CLIENT_URL`, and bounded JSON body payloads (`5mb` limit).


# LinkFlow

LinkFlow is a full-stack URL shortener for creating, managing, and analysing shareable short links. It combines a React dashboard with a Spring Boot REST API, MySQL persistence, JWT authentication, click tracking, optional link expiry, activation controls, and soft deletion.

**LinkFlow v1.0.0 is fully deployed to production.**
## Project Status

**Status:** Production Deployed (v1.0.0)

---

## 🌐 Project Links

- **Live Demo:** https://linkflow-blush.vercel.app
- **GitHub Repository:** https://github.com/Sushant-813/URL-Shortener-Service

---

##  Live Demo

| | URL |
| --- | --- |
| **Frontend** | [https://linkflow-blush.vercel.app](https://linkflow-blush.vercel.app) |
| **Backend API** | [https://linkflow-backend-g0nx.onrender.com](https://linkflow-backend-g0nx.onrender.com) |

> **Note:** The backend is hosted on Render's free tier. The first request after a period of inactivity may take approximately 30–60 seconds while the service wakes up. Subsequent requests respond at normal speed.

---

## Project Status

**Production deployment complete.** LinkFlow v1.0.0 is fully deployed and verified. All features have been tested end-to-end in the production environment.

---

## Project Highlights

- Production-ready full-stack architecture (React + Spring Boot + MySQL)
- Stateless JWT authentication with session restoration
- Spring Security with deny-by-default policy and BCrypt password hashing
- Dockerized backend deployed to a managed cloud platform
- Managed cloud MySQL database with SSL/TLS enforcement
- RESTful API with pagination, search, and sorting
- URL analytics with date-filtered charts and per-URL click tracking
- Responsive React UI with skeleton loaders, micro-animations, and accessible markup

---

## Features

### Authentication

- User registration with validation
- Login with JWT authentication
- Persistent sessions with session restoration across page reloads
- Logout

### URL Management

- URL shortening with validated input
- Redirect (active, unexpired, non-deleted links only)
- Pagination
- Search (by original URL or short code)
- Sorting (by created date, click count, original URL, short URL)
- Optional expiration dates
- Active / Inactive URL toggle
- Soft delete (logical deletion preserving historical data)

### Analytics

- Dashboard overview with summary statistics
- Click tracking per redirect
- Date-filtered total clicks chart (area chart)
- Per-URL click analytics (bar chart)

### Security

- Spring Security with stateless JWT authentication
- BCrypt password hashing
- Protected APIs with deny-by-default security policy
- CORS restricted to the production frontend origin

### Deployment

- Docker containerization
- Production environment variables (no committed secrets)
- HTTPS on all traffic
- Health monitoring via Spring Boot Actuator

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS, React Router, TanStack Query, Zustand, React Hook Form, Axios, Recharts |
| Backend | Java 17, Spring Boot, Spring Security, Spring Data JPA, Hibernate, JJWT, Bean Validation |
| Database | MySQL (Aiven managed cloud) |
| Deployment | Docker, Render, Vercel |

---

## Architecture

### Application Architecture

The frontend composes pages from reusable components. Hooks own UI and data behaviour, service modules make API calls through one Axios client, and the client adds JWT headers automatically. The backend uses controller → service → repository layering, DTO payloads, and Spring Security for authenticated APIs.

### Deployment Architecture

```
React + Vite  (Vercel)
       │
       ▼
Spring Boot API  (Render — Docker)
       │
       ▼
MySQL Database  (Aiven)
```

| Component | Platform | Notes |
| --- | --- | --- |
| Frontend | Vercel | React static build; SPA routing configured via `vercel.json` |
| Backend | Render | Dockerized Spring Boot application |
| Database | Aiven MySQL | Managed cloud MySQL instance with SSL/TLS |
| Containerization | Docker | Production Dockerfile; environment-variable driven |

---

## Production Deployment

### Backend (Render)

The Spring Boot application is containerized using Docker and deployed to Render.

- Environment variables are configured securely through the Render dashboard.
- The application runs the `prod` Spring profile (`SPRING_PROFILES_ACTIVE=prod`).
- Health monitoring is available at `/actuator/health`.
- The database schema was applied automatically via JPA/Hibernate on first startup.

### Frontend (Vercel)

The React application is built with `npm run build` and deployed to Vercel.

- `VITE_API_BASE_URL` is configured to point to the Render backend.
- `vercel.json` includes a catch-all rewrite rule so all routes are served by `index.html`, enabling client-side navigation on direct URL access and page refresh.

### Database (Aiven MySQL)

A managed MySQL instance is provisioned on Aiven.

- SSL/TLS is enforced for all database connections.
- Credentials are supplied exclusively through environment variables.
- No database credentials are committed to the repository.

### Environment Variable Configuration

All secrets and environment-specific values are supplied through platform environment variables. No sensitive values are committed to the repository. Refer to [`.env.example`](.env.example) and [`frontend/.env.example`](frontend/.env.example) for the complete list of required variables.

---

## Installation

### Prerequisites

Java 17, Node.js with npm, and MySQL. Maven is optional because the Maven Wrapper is committed.

### Local Setup

1. Create a MySQL database named `urlshortenerdb`, or choose a different URL through `DB_URL`.
2. Copy [`.env.example`](.env.example) to `.env` and supply `DB_PASSWORD` plus a strong Base64-encoded `JWT_SECRET`.
3. Copy [`frontend/.env.example`](frontend/.env.example) to `frontend/.env` and set the backend address.
4. Run `npm install` from `frontend/`.

For a brand-new local database, initialise the schema in development with `JPA_DDL_AUTO=update`, then return it to `validate`. Production uses `validate`.

### Backend Setup

From the repository root:

```powershell
.\mvnw.cmd clean package
java -jar target\url-shortener-sb-1.0.0.jar
```

The API listens on `http://localhost:8080` by default.

### Frontend Setup

From `frontend/`:

```powershell
npm install
npm run dev
```

Use `npm run build` to create the static production output in `frontend/dist/`.

### Running Locally

1. Start MySQL and confirm the configured database exists.
2. Start the backend with the required environment variables.
3. Start the frontend development server.
4. Open `http://localhost:5173`, register, and create a link.

---

## Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` | Yes | MySQL connection configuration |
| `JWT_SECRET` | Yes | Base64-encoded JWT signing secret |
| `JWT_EXPIRATION_MS` | No | JWT lifetime; default `172800000` |
| `CORS_ALLOWED_ORIGINS` | Yes | Comma-separated allowed frontend origins |
| `JPA_DDL_AUTO` | No | Schema mode; production default `validate` |
| `JPA_SHOW_SQL`, `JPA_FORMAT_SQL` | No | SQL logging; default `false` |
| `SPRING_SECURITY_LOG_LEVEL`, `APP_LOG_LEVEL` | No | Log levels; default `INFO` |
| `VITE_API_BASE_URL` | Yes | Frontend API base URL |

Do not commit `.env` files or replace environment placeholders with literal secrets.

---

## API Overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/public/register` | Create an account |
| `POST` | `/api/auth/public/login` | Authenticate and receive a JWT |
| `POST` | `/api/urls/shorten` | Create a short URL |
| `GET` | `/api/urls/myurls` | List the authenticated user's URLs |
| `GET` | `/api/urls/search` | Search the authenticated user's URLs |
| `PATCH` | `/api/urls/{id}/toggle` | Toggle a link's active state |
| `DELETE` | `/api/urls/{id}` | Soft-delete a link |
| `GET` | `/api/urls/totalClicks` | Retrieve aggregate click counts by date |
| `GET` | `/api/urls/analytics/{shortUrl}` | Retrieve clicks for one owned URL |
| `GET` | `/{shortUrl}` | Redirect an active, unexpired, non-deleted link |

Authenticated requests require `Authorization: Bearer <token>`.

---

## Folder Structure

```text
src/main/java/com/urlshortener/  Spring Boot controllers, services, repositories, security, and DTOs
src/main/resources/              Runtime configuration
frontend/src/components/         Reusable UI and feature components
frontend/src/pages/              Route pages
frontend/src/services/           API service layer
frontend/src/hooks/              Reusable React hooks
frontend/src/store/              Zustand stores
frontend/src/utils/              Formatting, JWT, and analytics helpers
docs/                            Design, architecture, standards, and project log
```

---

## Future Roadmap

- QR code generation for short links
- Custom short URL aliases
- Custom domains and branded links
- Team workspaces and shared link management
- Password reset and email verification flows
- Rate limiting for public and authenticated endpoints
- Redis caching layer for high-traffic redirects
- Admin dashboard and user management
- Advanced analytics (referrer tracking, geographic breakdown, device breakdown)
- Database migration tooling (Flyway or Liquibase) and CI regression suite

---

## Screenshots

Screenshots of the production application will be added soon.

---

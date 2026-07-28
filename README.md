# LinkFlow

LinkFlow is a full-stack URL shortener for creating, managing, and analysing shareable short links. It combines a React dashboard with a Spring Boot REST API, MySQL persistence, JWT authentication, click tracking, optional link expiry, activation controls, and soft deletion.

## Features

- Secure registration, login, logout, persisted sessions, and JWT expiry handling
- Validated URL creation with optional expiration dates, copy, and open actions
- Searchable, sortable, paginated URL management with active-state controls and soft deletion
- Protected redirects for inactive, expired, and deleted links
- Dashboard statistics, recent links, date-filtered click charts, loading, empty, and error states
- Responsive and keyboard-accessible dashboard and landing pages

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router, TanStack Query, Zustand, React Hook Form, Tailwind CSS, Recharts |
| Backend | Java 17, Spring Boot, Spring Security, Spring Data JPA, Bean Validation, JJWT |
| Database | MySQL |

## Architecture

The frontend composes pages from reusable components. Hooks own UI/data behaviour, service modules make API calls through one Axios client, and the client adds JWT headers. The backend uses controller → service → repository layering, DTO payloads, and Spring Security for authenticated APIs.

## Installation

Prerequisites: Java 17, Node.js with npm, and MySQL. Maven is optional because the Maven Wrapper is committed.

1. Create a MySQL database named `urlshortenerdb`, or choose a different URL through `DB_URL`.
2. Copy [`.env.example`](.env.example) to `.env` and supply `DB_PASSWORD` plus a strong Base64-encoded `JWT_SECRET`.
3. Copy [`frontend/.env.example`](frontend/.env.example) to `frontend/.env` and set the backend address.
4. Run `npm install` from `frontend/`.

For a brand-new local database, initialise the legacy schema only in development with `JPA_DDL_AUTO=update`, then return it to `validate`. Production should use explicit migrations and `validate`.

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

## Backend Setup

From the repository root:

```powershell
.\mvnw.cmd clean package
java -jar target\url-shortener-sb-1.0.0.jar
```

The API listens on `http://localhost:8080` by default.

## Frontend Setup

From `frontend/`:

```powershell
npm install
npm run dev
```

Use `npm run build` to create the static production output in `frontend/dist/`.

## Running the Project

1. Start MySQL and confirm the configured database exists.
2. Start the backend with the required environment variables.
3. Start the frontend development server.
4. Open `http://localhost:5173`, register, and create a link.

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

## Deployment

Build the backend with the Maven Wrapper and deploy `target/url-shortener-sb-1.0.0.jar` with Java 17 and production environment variables. Build the frontend with `npm run build` and serve `frontend/dist/` from a static host. Set `VITE_API_BASE_URL` before the frontend build and `CORS_ALLOWED_ORIGINS` to the deployed frontend origin(s). Use HTTPS and a managed MySQL instance with backups.

## Future Enhancements

- Database migrations and a CI regression suite
- Custom domains, branded links, and QR codes
- User profiles, teams, API keys, and analytics exports
- Rate limiting and audit logging

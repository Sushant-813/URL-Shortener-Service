====================================================================================================================
                                        PROJECT LOG
                                URL Shortener SaaS Platform
                                         Version 1.0
====================================================================================================================

============================================================
PROJECT OVERVIEW
============================================================

Project Name

URL Shortener SaaS Platform

Description

A production-ready full-stack URL Shortener application built using
Spring Boot and React. The project focuses on clean architecture,
secure authentication, maintainable code, scalable frontend design,
and production-ready development practices.

Technology Stack

Backend

• Java
• Spring Boot
• Spring Security
• JWT Authentication
• Spring Data JPA
• Hibernate
• MySQL

Frontend

• React
• Vite
• Tailwind CSS
• React Router
• Axios
• React Query
• Zustand
• React Hook Form

Project Goals

• Secure JWT Authentication
• URL Shortening
• Analytics Dashboard
• Search
• Pagination
• Sorting
• URL Expiration
• Active / Inactive URLs
• Soft Delete
• Responsive UI
• Production Ready Architecture

====================================================================================================================
                         BACKEND DEVELOPMENT
====================================================================================================================

============================================================
                 BACKEND FEATURES 
============================================================
Configuring Spring Security
JWT Implementation 
Defining Custom Security Config 
Building Authentication-Signup
Building Authentication-Login 
Shortening the URLs
Fetching all URLs of the user
Added URL Analytics 
URL Redirect Functionality created
Backend is Complete and a GitHub Tag is created successfully

============================================================
                 BACKEND SANITY CHECK
============================================================ 
1)Phase A Completed (10-07-2026)

Features Added
- Bean Validation using @Valid
- Request validation with @NotBlank, @Email, @Size
- spring-boot-starter-validation dependency
- DuplicateUserException
- GlobalExceptionHandler using @RestControllerAdvice
- Validation error responses (400 Bad Request)
- Duplicate user responses (409 Conflict)
- Database UNIQUE constraints on username and email
- Database NOT NULL constraints
- Improved registration flow
- Better API error handling

2) Phase B Completed (12-07-2026)

Features Verified
- User registration and database persistence
- Login authentication with JWT generation
- Protected endpoints reject unauthenticated requests (403 Forbidden)
- Protected endpoints accessible with valid JWT
- Automatic JWT handling in Postman using collection variables
- URL shortening endpoint secured with Spring Security
- Password encryption verified using BCrypt
- Database UNIQUE and NOT NULL constraints verified
- Hibernate schema synchronization by recreating the database
- MySQL foreign key dependency handling during data cleanup

3) Phase C Completed (12-07-2026)

Features Verified
- URL redirection
- Click tracking
- Click count updates
- Get My URLs endpoint
- User-specific URL retrieval

4) Phase D Completed (12-07-2026)

Features Verified
- URL-specific analytics
- Total clicks analytics
- Date range filtering
- Click event aggregation
- Analytics endpoints verified
============================================================
               BACKEND FEATURES ENHANCEMENT
============================================================
1) Phase E Completed (15-07-2026)

Features Added
- Pagination support for "Get My URLs" endpoint
- Spring Data JPA Pageable implementation
- PageRequest-based pagination in service layer
- Paginated repository query using Page<UrlMapping>
- Controller support for page and size query parameters
- Default pagination values (page=0, size=10)
- Page<UrlMappingDTO> response with pagination metadata

Features Verified
- Default pagination returns first page successfully
- Custom page size works correctly
- Multiple page navigation verified
- Out-of-range page requests return empty content (200 OK)
- Pagination metadata (totalPages, totalElements, currentPage, pageSize) verified
- JWT authentication compatibility verified with paginated endpoint

2) Phase F Completed (15-07-2026)

Features Added
- URL search endpoint
- Case-insensitive search using Spring Data JPA
- Partial matching with ContainingIgnoreCase
- User-specific search restricted to authenticated user
- Search support for original URLs and short URLs
- Input validation for empty search queries

Features Verified
- Search by original URL
- Search by short URL
- Partial keyword search
- Case-insensitive search
- Empty search returns 400 Bad Request
- No matching results return empty list
- User isolation verified (search limited to authenticated user's URLs)

3) Phase G Completed (15-07-2026)

Objective
Enhance the Get My URLs endpoint with flexible sorting while ensuring invalid client requests are handled gracefully.

Features Added
- Dynamic sorting for paginated user URLs
- Support for sorting by:
  - createdDate
  - clickCount
  - originalUrl
  - shortUrl
- Configurable sort direction:
  - asc
  - desc
- Default sorting by createdDate in descending order
- Validation of supported sort fields
- Validation of supported sort directions
- Global exception handling for invalid sorting requests
- Refactored allowed sort fields into a class-level constant for maintainability

Features Verified
✓ Default sorting returns newest URLs first
✓ Ascending and descending sorting work correctly
✓ Sorting by createdDate
✓ Sorting by clickCount
✓ Sorting by originalUrl
✓ Sorting by shortUrl
✓ Pagination works correctly with sorting
✓ Search works correctly alongside sorting
✓ Invalid sort field returns HTTP 400 Bad Request
✓ Invalid sort direction returns HTTP 400 Bad Request

Concepts Learned
- Spring Data JPA Sort API
- Combining Pageable with Sort
- Request parameter validation
- Centralized exception handling using @RestControllerAdvice
- Use of class-level constants (private static final)
- Designing APIs with meaningful client error responses

4) Phase H Completed (17-07-2026)

Objective
Implement logical (soft) deletion for URLs to preserve historical data while hiding deleted URLs from normal application workflows.

Features Added
- Soft delete support using a new `deleted` boolean column
- DELETE endpoint for logical URL deletion
- Repository queries updated to exclude deleted URLs
- Redirect logic updated to block deleted URLs
- Search endpoint updated to ignore deleted URLs
- User URL listing updated to return only active (non-deleted) URLs
- Database schema automatically synchronized through Hibernate

Features Verified
- Soft delete endpoint successfully marks URLs as deleted
- Deleted URLs remain stored in the database
- `deleted` column updated from `0` to `1`
- Deleted URLs no longer appear in Get My URLs
- Deleted URLs no longer appear in search results
- Deleted short URLs no longer redirect to the original URL
- Invalid delete requests handled gracefully
- JWT authentication verified with delete endpoint
- Repository filtering for non-deleted URLs verified
- Database state verified using MySQL Workbench

5) Phase I Completed (17-07-2026)

Objective
Implement URL activation/deactivation to temporarily disable redirects without permanently deleting URLs, while improving API design using custom exceptions and centralized error handling.

Features Added
- Added `active` boolean column to the UrlMapping entity
- Implemented PATCH endpoint to toggle URL active/inactive status
- Toggle endpoint flips the current active state without requiring a request body
- Redirect logic updated to block inactive URLs
- Added custom `UrlNotFoundException` for missing short URLs
- Added custom `UrlInactiveException` for inactive URLs
- Added global exception handlers for custom URL exceptions
- Replaced null-based service responses with exception-driven flow
- Simplified RedirectController by removing manual null checks

Features Verified
- Toggle endpoint successfully switches URLs between active and inactive
- Consecutive toggle requests correctly alternate the active state
- `active` column updates correctly in the MySQL database
- Active URLs redirect successfully to the original URL
- Inactive URLs no longer redirect
- Missing short URLs return custom error responses
- Redirect controller remains clean with business logic handled in the service layer
- JWT authentication verified with the toggle endpoint
- Database state verified using MySQL Workbench

Concepts Learned
- Difference between soft deletion and temporary deactivation
- Designing RESTful toggle operations using HTTP PATCH
- Service-layer business rule validation
- Creating custom RuntimeExceptions in Spring Boot
- Centralized exception handling using @RestControllerAdvice
- Exception-driven API design instead of returning null
- Cleaner separation of responsibilities between Controller and Service
- Choosing appropriate HTTP status codes for different resource states

6) Phase J Completed (18-07-2026)

Objective
Implement URL expiration to automatically disable expired URLs while preserving historical data and improving API design through request DTOs, validation, and exception-driven error handling.

Features Added
- Added `expirationDate` column to the UrlMapping entity
- Introduced `CreateUrlRequest` DTO for URL creation requests
- Replaced raw `Map<String, String>` request handling with a strongly typed request DTO
- Added support for optional expiration dates during URL creation
- Implemented validation to reject expiration dates in the past
- Added custom `InvalidExpirationDateException` for invalid expiration requests
- Added custom `UrlExpiredException` for expired URL access
- Added global exception handlers for expiration-related exceptions
- Updated redirect logic to block expired URLs
- Exposed expiration date in `UrlMappingDTO` responses

Features Verified
- URLs can be created without an expiration date
- URLs can be created with a valid future expiration date
- Expiration dates are correctly persisted in the MySQL database
- Requests with past expiration dates return HTTP 400 Bad Request
- Expired URLs no longer redirect to the original URL
- Expired URLs return HTTP 410 Gone with a custom error response
- Click count is not incremented after URL expiration
- No ClickEvent is recorded for expired URL access
- Active, non-expired URLs continue to redirect normally
- JWT authentication verified with URL creation and redirection
- Database state verified using MySQL Workbench

Concepts Learned
- Using `LocalDateTime` for time-based business rules
- Difference between validation during resource creation and validation during resource access
- Designing APIs with dedicated request and response DTOs
- Implementing optional resource expiration using nullable timestamps
- Using HTTP 410 Gone for expired resources
- Creating domain-specific custom RuntimeExceptions
- Centralized exception handling using `@RestControllerAdvice`
- Preventing business side effects by validating before updating application state
- Separating controller responsibilities from service-layer business logic

============================================================
         BACKEND DEVELOPMENT CORE FEATURES ADDED
============================================================


====================================================================================================================
                         FRONTEND DEVELOPMENT
====================================================================================================================

Frontend development follows a documentation-first approach.

Before implementing any feature, the project establishes a unified
design language, architecture, and coding standards to ensure
consistent AI-assisted development.

------------------------------------------------------------
Phase K – Frontend Project Foundation
------------------------------------------------------------

Status

✅ Completed

Objective

Initialize the React application and establish the frontend structure.

Completed

• React + Vite setup
• Tailwind CSS configuration
• React Router setup
• Frontend folder structure
• Public Layout
• Dashboard Layout
• Protected Route
• Placeholder pages
• Initial route verification

Outcome

Frontend foundation completed successfully.

------------------------------------------------------------
Phase L – AI Frontend Foundation
------------------------------------------------------------

Status

Completed 

Objective

Prepare the project for documentation-driven frontend development.

Completed

• DESIGN.md
• ARCHITECTURE.md
• CODING_STANDARDS.md

Completed

• Finalize PROJECT_LOG.md
• Create docs/references/
• Configure Codex workflow
• Verify project indexing

Outcome

AI-assisted frontend development environment ready.

------------------------------------------------------------
Phase M – Authentication Module
------------------------------------------------------------

Status

Completed

Features

• Login
• Register
• JWT Persistence
• Session Restore
• Protected Routes
• Logout
• Form Validation
• Axios Authentication Service

------------------------------------------------------------
Phase N – Dashboard Module
------------------------------------------------------------

Status

Completed

Features

• Dashboard Overview
• Statistics Cards
• Recent URLs
• Sidebar
• Responsive Dashboard

============================================================
Phase O – URL Shortening Module
============================================================

Status

✅ Completed

Objective

Implement the complete URL shortening workflow.

Features

• URL creation form
• Client-side URL validation
• Optional expiration date
• React Query mutation
• Toast notification system
• Copy shortened URL
• Open shortened URL
• Loading states
• Result panel

------------------------------------------------------------
Phase P – URL Management
------------------------------------------------------------

Status

⬜ Pending

Features

• URL Table
• Search
• Sorting
• Pagination
• Status Badges
• Responsive Layout

------------------------------------------------------------
Phase Q – URL Actions
------------------------------------------------------------

Status

⬜ Pending

Features

• Activate
• Deactivate
• Soft Delete
• Confirmation Dialog
• Optimistic Updates

------------------------------------------------------------
Phase R – Analytics Dashboard
------------------------------------------------------------

Status

⬜ Pending

Features

• Statistics
• Charts
• Timeline
• Date Filters
• Skeleton Loading

------------------------------------------------------------
Phase S – UI Polish & Motion
------------------------------------------------------------

Status

⬜ Pending

Features

• Micro Animations
• Skeleton Loaders
• Accessibility
• Responsive Improvements
• Toast Notifications

------------------------------------------------------------
Phase T – Final QA & Deployment
------------------------------------------------------------

Status

⬜ Pending

Tasks

• Backend Integration Testing
• Authentication Testing
• CRUD Testing
• Analytics Testing
• Responsive Testing
• Accessibility Review
• Documentation Review
• README Update
• Deployment


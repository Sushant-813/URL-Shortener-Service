# Graph Report - .  (2026-07-29)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 481 nodes · 972 edges · 21 communities (19 shown, 2 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 51 edges (avg confidence: 0.72)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2435f757`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 20

## God Nodes (most connected - your core abstractions)
1. `User` - 27 edges
2. `UrlMapping` - 19 edges
3. `UrlMappingService` - 19 edges
4. `Card()` - 14 edges
5. `UserService` - 14 edges
6. `UrlMappingController` - 13 edges
7. `UrlMappingDTO` - 13 edges
8. `Button()` - 12 edges
9. `useAuth()` - 12 edges
10. `WebSecurityConfig` - 12 edges

## Surprising Connections (you probably didn't know these)
- `RedirectController` --references--> `UrlMappingService`  [EXTRACTED]
  src/main/java/com/urlshortener/controller/RedirectController.java → src/main/java/com/urlshortener/service/UrlMappingService.java
- `UrlMappingController` --references--> `UserService`  [EXTRACTED]
  src/main/java/com/urlshortener/controller/UrlMappingController.java → src/main/java/com/urlshortener/service/UserService.java
- `UserRepository` --references--> `User`  [EXTRACTED]
  src/main/java/com/urlshortener/repository/UserRepository.java → src/main/java/com/urlshortener/models/User.java
- `UserDetailsServiceImpl` --references--> `UserRepository`  [EXTRACTED]
  src/main/java/com/urlshortener/service/UserDetailsServiceImpl.java → src/main/java/com/urlshortener/repository/UserRepository.java
- `UserService` --references--> `JwtUtils`  [EXTRACTED]
  src/main/java/com/urlshortener/service/UserService.java → src/main/java/com/urlshortener/security/jwt/JwtUtils.java

## Import Cycles
- None detected.

## Communities (21 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (37): DeleteMapping, Pageable, PatchMapping, PreAuthorize, Principal, AllArgsConstructor, GetMapping, Page (+29 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (26): App(), getMinDatetimeLocal(), getShortenErrorMessage(), parseDatetimeLocal(), ShortenForm(), UrlEmptyState(), UrlTable(), COLUMNS (+18 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (19): DashboardLayout(), PAGE_TITLES, Navbar(), PublicLayout(), NAVIGATION_ITEMS, Sidebar(), Topbar(), UrlPagination() (+11 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (23): QuickActionCard(), QUICK_ACTIONS, QuickActions(), StatisticCard(), EMPTY_STATS, STAT_DEFINITIONS, StatisticsGrid(), StatisticsGridSkeleton() (+15 more)

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (18): FilterChain, GrantedAuthority, HttpServletResponse, NoArgsConstructor, OncePerRequestFilter, SecretKey, Component, HttpServletRequest (+10 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (20): JpaRepository, AuthController, PostMapping, RequestMapping, ResponseEntity, RestController, Data, LoginRequest (+12 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (28): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks (+20 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (17): AnalyticsSummaryCards(), ChartSkeleton(), DateRangePicker(), PRESETS, TotalClicksChart(), resolveStatus(), SelectedUrlMeta(), UrlAnalyticsPanel() (+9 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (19): AuthenticationConfiguration, Bean, Configuration, CorsConfigurationSource, DaoAuthenticationProvider, EnableMethodSecurity, EnableWebSecurity, HttpSecurity (+11 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (9): ExceptionHandler, MethodArgumentNotValidException, RestControllerAdvice, DuplicateUserException, GlobalExceptionHandler, ResponseEntity, InvalidExpirationDateException, UrlExpiredException (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.15
Nodes (14): RecentUrlItem(), mapUrlToItem(), RecentUrls(), resolveStatus(), RecentUrlsSkeleton(), ShortenResult(), UrlActionButtons(), resolveStatus() (+6 more)

### Community 11 - "Community 11"
Cohesion: 0.08
Nodes (24): axios, dependencies, axios, lucide-react, react, react-dom, react-hook-form, react-router-dom (+16 more)

### Community 12 - "Community 12"
Cohesion: 0.17
Nodes (11): analyticsService, apiClient, clearExpirationTimer(), EMPTY_AUTH_STATE, getSessionState(), scheduleSessionExpiration(), decodeJwt(), extractRoles() (+3 more)

### Community 13 - "Community 13"
Cohesion: 0.33
Nodes (6): mvnw script, clean(), die(), exec_maven(), set_java_home(), verbose()

### Community 14 - "Community 14"
Cohesion: 0.48
Nodes (5): AllArgsConstructor, GetMapping, ResponseEntity, RestController, RedirectController

### Community 15 - "Community 15"
Cohesion: 0.60
Nodes (3): SpringBootTest, UrlShortenerSbApplicationTests, Test

### Community 16 - "Community 16"
Cohesion: 0.83
Nodes (3): Getter, Setter, CreateUrlRequest

## Knowledge Gaps
- **47 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+42 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 11` to `Community 6`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `ConfirmDialog()` connect `Community 11` to `Community 1`, `Community 2`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _47 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07034431691965938 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07020408163265306 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09176788124156546 - nodes in this community are weakly interconnected._
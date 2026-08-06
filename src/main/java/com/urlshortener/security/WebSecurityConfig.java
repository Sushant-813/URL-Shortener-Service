package com.urlshortener.security;

import com.urlshortener.security.jwt.JwtAuthenticationFilter;
import com.urlshortener.service.UserDetailsServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.security.config.Customizer;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@AllArgsConstructor
public class WebSecurityConfig {

    private UserDetailsServiceImpl userDetailsService;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // ── Cross-origin policy (uses the corsConfigurationSource bean below) ──
                .cors(Customizer.withDefaults())

                // ── CSRF disabled: stateless JWT API, no session cookies ──
                .csrf(AbstractHttpConfigurer::disable)

                // ── Session management: stateless — never create an HttpSession ──
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // ── Authorization rules ──
                //
                // Rules are evaluated top-to-bottom; the first match wins.
                // Every path not matched by an explicit permitAll() rule falls
                // through to the final denyAll() catch-all.
                .authorizeHttpRequests(auth -> auth

                        // Allow all CORS preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // 1. Authentication endpoints — must be reachable before a token exists.
                        .requestMatchers(
                                "/api/auth/public/login",
                                "/api/auth/public/register")
                        .permitAll()

                        // 2. URL redirect endpoint — core public functionality; no login required.
                        // Pattern uses a single-segment wildcard so it matches /abc123 but NOT
                        // /a/b or /actuator/health (which contain slashes).
                        .requestMatchers("/{shortUrl:[a-zA-Z0-9]+}").permitAll()

                        // 3. Actuator health & info — required for container liveness/readiness probes.
                        // Only these two sub-paths are permitted; /actuator/env, /actuator/beans,
                        // etc. are denied by the catch-all below.
                        .requestMatchers(
                                "/actuator/health",
                                "/actuator/info")
                        .permitAll()

                        // 4. All URL management API endpoints — authenticated users only.
                        // @PreAuthorize("hasRole('USER')") on each method provides a second
                        // enforcement layer.
                        .requestMatchers("/api/urls/**").authenticated()

                        // 5. Deny everything else — no implicit public surface.
                        // Any endpoint added in future is protected by default until
                        // an explicit rule is added above.
                        .anyRequest().denyAll());

        http.authenticationProvider(authenticationProvider());

        http.addFilterBefore(
                jwtAuthenticationFilter(),
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(
            @Value("${app.cors.allowed-origins}") List<String> allowedOrigins) {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(allowedOrigins);

        configuration.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "PATCH",
                "OPTIONS"));

        // Only the three headers the frontend actually sends.
        configuration.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "Accept"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}

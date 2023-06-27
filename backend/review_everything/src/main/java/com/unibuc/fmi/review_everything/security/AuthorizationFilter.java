package com.unibuc.fmi.review_everything.security;

import com.unibuc.fmi.review_everything.exception.auth.AuthUnauthorizedAccessException;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@AllArgsConstructor
@Component
@Slf4j
@Order(1)
public class AuthorizationFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        try {
            String authorizationHeader = request.getHeader("Authorization");
            String token = resolveToken(authorizationHeader);

            if (authorizationHeader != null && jwtProvider.validate(token)) {
                Authentication authentication = jwtProvider.doAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);

        } catch (AuthUnauthorizedAccessException e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid jwt token in filter");
        }
    }

    private String resolveToken(String authorizationHeader) {
        log.info(authorizationHeader);

        if (authorizationHeader == null ||
                authorizationHeader.isBlank() ||
                !authorizationHeader.contains("Bearer")) {
            return "";
        }
        return authorizationHeader.substring(7);
    }
}
package com.bonelfederico.gestorcaballos.filters;

import com.bonelfederico.gestorcaballos.dtos.responses.ErrorResponseDTO;
import com.bonelfederico.gestorcaballos.errors.UnauthorizedError;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Filtro de verificacion de los JWTs que llegan al servidor
 */
@Component
public class JWTVerificationFilter extends OncePerRequestFilter {

    @Value("${jwt.secret}")
    private String secret;

    @Override
    protected void doFilterInternal(HttpServletRequest httpRequest,
                                    HttpServletResponse httpResponse,
                                    FilterChain chain) throws ServletException, IOException {
        String authHeader = httpRequest.getHeader("authorization");

        if (httpRequest.getMethod().equals("OPTIONS")) {
            // Si el usuario solo solicita info de la api
            httpResponse.setStatus(HttpServletResponse.SC_OK);

        } else {
            try {
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                    throw new UnauthorizedError();
                }
                String token = authHeader.substring(7);
                Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
                httpRequest.setAttribute("userInfo", claims);

            } catch (Exception e) {
                ObjectMapper objectMapper = new ObjectMapper();
                String error = "Por favor provea un JWT valido en el encabezado 'Authorization' siguiendo el formato "
                        + "'Bearer' ";
                ErrorResponseDTO<String> resBody = new ErrorResponseDTO<>(error);
                httpResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
                httpResponse.setContentType("application/json");
                httpResponse.getWriter().write(objectMapper.writeValueAsString(resBody));
                return;
            }
        }

        // Continua con el siguiente filtro
        chain.doFilter(httpRequest, httpResponse);
    }
}

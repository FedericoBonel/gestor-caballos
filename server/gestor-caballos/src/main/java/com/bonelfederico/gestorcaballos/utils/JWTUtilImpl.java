package com.bonelfederico.gestorcaballos.utils;

import com.bonelfederico.gestorcaballos.models.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTUtilImpl implements JWTUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expirationdays}")
    private Long expDays;

    @Override
    public String generateToken(Usuario usuario) {
        long expMiliseconds = expDays * 24 * 60 * 60 * 1000;
        Date issueDate = new Date();
        Date expirationDate = new Date(issueDate.getTime() + expMiliseconds);

        return Jwts.builder()
                .setSubject(usuario.getUsername())
                .setIssuedAt(issueDate)
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }
}

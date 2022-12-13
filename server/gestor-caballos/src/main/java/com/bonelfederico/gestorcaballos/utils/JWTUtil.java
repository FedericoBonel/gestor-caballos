package com.bonelfederico.gestorcaballos.utils;

import com.bonelfederico.gestorcaballos.models.Usuario;

/**
 * Abstraccion de un objeto de utilidades de Json Web Tokens
 */
public interface JWTUtil {

    /**
     * Crea un nuevo JWT para el usuario recibido (Con sus datos)
     * @param usuario Usuario para el cual se genera el token
     * @return JWT con los datos publicos del usuario
     */
    String generateToken(Usuario usuario);

}

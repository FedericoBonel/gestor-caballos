package com.bonelfederico.gestorcaballos.utils;

import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Proveedor del encriptador de contrasenas siendo utilizado en la aplicacion
 */
public interface EncoderProvider {

    /**
     * Devuelve el encriptador de contrasenas siendo utilizado en la aplicacion
     * @return El encriptador de contrasenas siendo utilizado actualmente
     */
    PasswordEncoder getEncoder();
}

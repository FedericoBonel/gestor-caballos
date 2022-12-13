package com.bonelfederico.gestorcaballos.errors;

/**
 * Abstraccion de un error HTTP de tipo Unauthorized
 * el uso de esta clase permite un mejor manejo de este tipo de problemas.
 * Sera lanzada cuando se encuentre alguna solicitud HTTP recibida que no posee credenciales validas.
 */
public class UnauthorizedError extends RuntimeException {
    public UnauthorizedError() {
        super();
    }

    public UnauthorizedError(String message) {
        super(message);
    }

    public UnauthorizedError(String message, Throwable cause) {
        super(message, cause);
    }

    public UnauthorizedError(Throwable cause) {
        super(cause);
    }

    protected UnauthorizedError(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}

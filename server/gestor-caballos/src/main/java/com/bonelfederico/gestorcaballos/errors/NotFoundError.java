package com.bonelfederico.gestorcaballos.errors;

/**
 * Abstraccion de un error HTTP de tipo Not Found
 * el uso de esta clase permite un mejor manejo de este tipo de problemas.
 * Sera lanzada cuando una solicitud HTTP recibida pida acceso a un recurso no encontrado en el sistema.
 */
public class NotFoundError extends RuntimeException {
    public NotFoundError() {
    }

    public NotFoundError(String message) {
        super(message);
    }

    public NotFoundError(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFoundError(Throwable cause) {
        super(cause);
    }

    public NotFoundError(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}

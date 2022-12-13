package com.bonelfederico.gestorcaballos.errors;

/**
 * Abstraccion de un error HTTP de tipo Bad Request
 * el uso de esta clase permite un mejor manejo de este tipo de problemas.
 * Sera lanzada cuando se encuentre que alguna parte de una solicitud HTTP recibida no es valida.
 */
public class BadRequestError extends RuntimeException {
    public BadRequestError() {
        super();
    }

    public BadRequestError(String message) {
        super(message);
    }

    public BadRequestError(String message, Throwable cause) {
        super(message, cause);
    }

    public BadRequestError(Throwable cause) {
        super(cause);
    }

    protected BadRequestError(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}

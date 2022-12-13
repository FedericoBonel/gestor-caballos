package com.bonelfederico.gestorcaballos.controllers;

import com.bonelfederico.gestorcaballos.dtos.responses.ErrorResponseDTO;
import com.bonelfederico.gestorcaballos.errors.BadRequestError;
import com.bonelfederico.gestorcaballos.errors.NotFoundError;
import com.bonelfederico.gestorcaballos.errors.UnauthorizedError;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

/**
 * Clase que abstrae a un objeto "ControllerAdvice",
 * contiene los metodos que manejaran las excepciones lanzadas durante la ejecucion del programa
 */
@ControllerAdvice
public class ErrorHandler extends ResponseEntityExceptionHandler {

    /**
     * Respuesta customizada de errores de validacion
     *
     * @param exception Error que contiene los problemas de validacion
     * @param headers   Headers de la respuesta a ser enviada
     * @param status    Estado de la respuesta a ser enviada
     * @param request   Solicitud HTTP recibida desde el cliente
     * @return Respuesta HTTP a ser enviada al cliente
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {
        // Extrae los errores desde la excepcion y envialos al cliente
        Map<String, Object> body = new HashMap<>();

        body.put("errors", exception.getFieldErrors()
                .stream()
                .map(fieldError -> {
                    Map<String, String> error = new HashMap<>();
                    error.put(fieldError.getField(), fieldError.getDefaultMessage());
                    return error;
                }));

        ErrorResponseDTO<Map<String, Object>> responseBody = new ErrorResponseDTO<>(body);
        return new ResponseEntity<>(responseBody, headers, status);
    }

    /**
     * Maneja los errores de tipo 404 not found y los devuelve como respuestas HTTP
     *
     * @param exception Error recibido desde el lugar donde se haya lanzado
     * @return Respuesta HTTP a ser enviada al cliente
     */
    @ExceptionHandler(NotFoundError.class)
    public ResponseEntity<Object> handleNotFound(RuntimeException exception) {
        ErrorResponseDTO<String> responseBody = new ErrorResponseDTO<>(exception.getMessage());
        return new ResponseEntity<>(responseBody, new HttpHeaders(), HttpStatus.NOT_FOUND);
    }

    /**
     * Maneja los errores de tipo 400 Bad Request y los devuelve como respuestas HTTP
     *
     * @param exception Error recibido desde el lugar donde se haya lanzado
     * @return Respuesta HTTP a ser enviada al cliente
     */
    @ExceptionHandler(BadRequestError.class)
    public ResponseEntity<Object> handleBadRequest(RuntimeException exception) {
        ErrorResponseDTO<String> responseBody = new ErrorResponseDTO<>(exception.getMessage());
        return new ResponseEntity<>(responseBody, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }


    /**
     * Maneja los errores de tipo 401 Unauthorized y los devuelve como respuestas HTTP
     *
     * @param exception Error recibido desde el lugar donde se haya lanzado
     * @return Respuesta HTTP a ser enviada al cliente
     */
    @ExceptionHandler(UnauthorizedError.class)
    public ResponseEntity<Object> handleUnauthorized(RuntimeException exception) {
        ErrorResponseDTO<String> responseBody = new ErrorResponseDTO<>(exception.getMessage());
        return new ResponseEntity<>(responseBody, new HttpHeaders(), HttpStatus.UNAUTHORIZED);
    }

}

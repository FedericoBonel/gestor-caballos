package com.bonelfederico.gestorcaballos.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Abstraccion de una respuesta erronea, contiene un mensaje de exito y un error con los datos necesarios a ser
 * devueltos
 * @param <CONTENT> Tipo de los datos a ser devueltos
 */
@Data
@AllArgsConstructor
public class ErrorResponseDTO<CONTENT> {
    private final Boolean status = false;
    private CONTENT error;
}

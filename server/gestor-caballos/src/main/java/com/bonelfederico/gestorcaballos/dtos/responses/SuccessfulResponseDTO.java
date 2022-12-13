package com.bonelfederico.gestorcaballos.dtos.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Abstraccion de una respuesta exitosa, contiene un mensaje de exito y datos
 * @param <CONTENT> Tipo de los datos a ser devueltos
 */
@Data
@AllArgsConstructor
public class SuccessfulResponseDTO<CONTENT> {
        private final Boolean status = true;
        private CONTENT data;
}

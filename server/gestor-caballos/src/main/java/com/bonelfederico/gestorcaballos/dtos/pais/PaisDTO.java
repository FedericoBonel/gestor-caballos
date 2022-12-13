package com.bonelfederico.gestorcaballos.dtos.pais;

import lombok.Data;

/**
 * Clase que abstrae a un pais tal y como se devolvera al ser solicitado en la API
 */
@Data
public class PaisDTO {
    private Long id;

    private String nombre;
}

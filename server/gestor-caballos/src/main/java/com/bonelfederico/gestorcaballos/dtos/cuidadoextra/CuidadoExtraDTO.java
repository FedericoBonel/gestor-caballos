package com.bonelfederico.gestorcaballos.dtos.cuidadoextra;

import lombok.Data;

/**
 * Clase que abstrae a un cuidado extra tal y como se devolvera al ser solicitado en la API
 */
@Data
public class CuidadoExtraDTO {
    private Long id;

    private String descripcion;
}

package com.bonelfederico.gestorcaballos.dtos.dueno;

import lombok.Data;

/**
 * Clase que abstrae a un dueno de un caballo tal y como se devolvera al ser solicitado en la API a traves de otro
 * objeto sin grandes niveles de detalle
 */
@Data
public class DuenoExcerptDTO {

    private Long id;

    private String nombres;

    private String apellidos;

}

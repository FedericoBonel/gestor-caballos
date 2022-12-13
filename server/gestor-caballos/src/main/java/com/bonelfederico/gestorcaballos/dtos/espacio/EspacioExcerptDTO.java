package com.bonelfederico.gestorcaballos.dtos.espacio;

import lombok.Data;

/**
 * Clase que abstrae a un espacio de un caballo tal y como se devolvera al ser solicitado en la API desde otro
 * objeto o en una lista sin grandes niveles de datalle
 */
@Data
public class EspacioExcerptDTO {
    private Long id;

    private String nombre;

    private String tipo;

}

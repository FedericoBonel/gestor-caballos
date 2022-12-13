package com.bonelfederico.gestorcaballos.dtos.espacio;

import com.bonelfederico.gestorcaballos.dtos.caballo.CaballoExcerptDto;
import lombok.Data;

/**
 * Clase que abstrae a un espacio disponible de un caballo tal y como se devolvera al ser solicitado en la API en
 * detalle
 */
@Data
public class EspacioDTO {
    private Long id;

    private String localizacion;

    private String nombre;

    private String tipo;

    private CaballoExcerptDto caballo;
}

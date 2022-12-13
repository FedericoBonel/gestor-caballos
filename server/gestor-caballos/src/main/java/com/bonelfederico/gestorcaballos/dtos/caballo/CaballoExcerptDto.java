package com.bonelfederico.gestorcaballos.dtos.caballo;

import lombok.Data;

/**
 * Clase que abstrae a un caballo tal y como se devolvera al ser solicitado en la API de manera resumida
 */
@Data
public class CaballoExcerptDto {
    private Long id;

    private String nombre;

    private String sexo;

    private String identificacion;
}

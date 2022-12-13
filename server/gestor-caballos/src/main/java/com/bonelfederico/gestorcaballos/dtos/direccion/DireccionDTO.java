package com.bonelfederico.gestorcaballos.dtos.direccion;

import com.bonelfederico.gestorcaballos.dtos.ciudad.CiudadDTO;
import lombok.Data;

/**
 * Clase que abstrae a una direccion tal y como se devolvera al ser solicitada en la API
 */
@Data
public class DireccionDTO {

    private String calle;

    private Integer numero;

    private CiudadDTO ciudad;
}

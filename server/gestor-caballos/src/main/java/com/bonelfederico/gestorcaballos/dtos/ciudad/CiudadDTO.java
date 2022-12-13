package com.bonelfederico.gestorcaballos.dtos.ciudad;

import com.bonelfederico.gestorcaballos.dtos.pais.PaisDTO;
import lombok.Data;

/**
 * Clase que abstrae a una ciudad tal y como se devolvera al ser solicitada en la API
 */
@Data
public class CiudadDTO {
    private Long id;

    private String nombre;

    private PaisDTO pais;
}

package com.bonelfederico.gestorcaballos.dtos.dueno;

import com.bonelfederico.gestorcaballos.dtos.direccion.DireccionDTO;
import lombok.Data;

/**
 * Clase que abstrae a un dueno de un caballo tal y como se devolvera al ser solicitado en la API en detalle
 */
@Data
public class DuenoDTO {

    private Long id;

    private String nombres;

    private String apellidos;

    private String telefono;

    private String email;

    private DireccionDTO direccion;
}

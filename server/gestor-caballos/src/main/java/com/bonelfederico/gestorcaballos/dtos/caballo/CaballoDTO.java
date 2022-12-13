package com.bonelfederico.gestorcaballos.dtos.caballo;

import com.bonelfederico.gestorcaballos.dtos.cuidadoextra.CuidadoExtraDTO;
import com.bonelfederico.gestorcaballos.dtos.dueno.DuenoExcerptDTO;
import com.bonelfederico.gestorcaballos.dtos.espacio.EspacioExcerptDTO;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * Clase que abstrae a un caballo tal y como se devolvera al ser solicitado en la API
 */
@Data
public class CaballoDTO {
    private Long id;

    private String nombre;

    private Date fechaNacimiento;

    private String colorPelo;

    private Float alturaMetros;

    private String sexo;

    private String identificacion;

    private DuenoExcerptDTO dueno;

    private EspacioExcerptDTO espacio;

    private List<CuidadoExtraDTO> cuidadosExtra;
}

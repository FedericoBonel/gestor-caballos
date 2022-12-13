package com.bonelfederico.gestorcaballos.services;

import com.bonelfederico.gestorcaballos.dtos.dueno.DuenoDTO;
import com.bonelfederico.gestorcaballos.dtos.dueno.DuenoExcerptDTO;

import java.util.List;

/**
 * Servicio de duenos de caballos cuidados, encapsula toda la logica del negocio relacionada a la gestion de
 * duenos de caballos en el sistema
 */
public interface DuenosService {

    /**
     * Obtiene una lista con todos los duenos de caballos registrados en el sistema
     *
     * @return Lista con todos los caballos registrados en el sistema
     */
    List<DuenoExcerptDTO> getAll();

    /**
     * Obtiene un dueno por id
     * @param idDueno Id del dueno a obtener
     * @return Dueno encontrado
     */
    DuenoDTO getById(Long idDueno);
}

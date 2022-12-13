package com.bonelfederico.gestorcaballos.services;

import com.bonelfederico.gestorcaballos.dtos.espacio.EspacioDTO;
import com.bonelfederico.gestorcaballos.dtos.espacio.EspacioExcerptDTO;

import java.util.List;

/**
 * Servicio de espacios para los caballos cuidados, encapsula toda la logica del negocio relacionada a la gestion de
 * espacios de caballos en el sistema
 */
public interface EspaciosService {

    /**
     * Obtiene una lista con todos los espacios de caballos registrados en el sistema
     *
     * @return Lista con todos los caballos registrados en el sistema
     */
    List<EspacioExcerptDTO> getAll();

    /**
     * Obtiene un espacio almacenado por id
     * @param idDueno Id del espacio a obtener
     * @return Espacio encontrado
     */
    EspacioDTO getById(Long idDueno);
}

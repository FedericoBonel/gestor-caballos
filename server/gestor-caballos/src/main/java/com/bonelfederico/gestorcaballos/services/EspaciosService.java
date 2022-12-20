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
     * Obtiene una lista con todos los espacios de caballos registrados en el sistema por estado de ocupado o no ocupado
     * (i.e. Si ocupado == true -> Todos los espacios que ya tiene un caballo asignado, en caso contrario -> Todos
     * los espacios que no tienen un caballo asignado)
     * @param ocupado Verdadero si se quiere la lista de espacios con caballos asignados, falso en caso contrario
     * @return Lista de todos los espacios con o sin caballos asignados
     */
    List<EspacioExcerptDTO> getAllByOcupado(Boolean ocupado);

    /**
     * Obtiene un espacio almacenado por id
     * @param idDueno Id del espacio a obtener
     * @return Espacio encontrado
     */
    EspacioDTO getById(Long idDueno);
}

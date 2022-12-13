package com.bonelfederico.gestorcaballos.services;

import com.bonelfederico.gestorcaballos.dtos.cuidadoextra.CuidadoExtraDTO;
import com.bonelfederico.gestorcaballos.dtos.cuidadoextra.CuidadoExtraInputDTO;

/**
 * Servicio de cuidados extra, encapsula toda la logica del negocio relacionada a la gestion de cuidados extra en el
 * sistema
 */
public interface CuidadosExtraService {

    /**
     * Crea un nuevo cuidado para el caballo indicado
     *
     * @param cuidado Nuevo cuidado a ser creado
     * @return El nuevo cuidado creado
     */
    CuidadoExtraDTO create(CuidadoExtraInputDTO cuidado);

    /**
     * Elimina un cuidado extra para un caballo
     *
     * @param idCuidado Id del cuidado que se desea eliminar
     */
    void deleteById(Long idCuidado);
}

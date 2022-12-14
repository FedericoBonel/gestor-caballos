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
     * @param idCaballo Id del caballo para el cual se esta creando el cuidado
     * @param cuidado Nuevo cuidado a ser creado
     * @return El nuevo cuidado creado
     */
    CuidadoExtraDTO create(Long idCaballo, CuidadoExtraInputDTO cuidado);

    /**
     * Elimina un cuidado extra para un caballo
     *
     * @param idCaballo Id del caballo del cual se desea eliminar el cuidado extra
     * @param idCuidado Id del cuidado que se desea eliminar
     */
    void deleteById(Long idCaballo, Long idCuidado);
}

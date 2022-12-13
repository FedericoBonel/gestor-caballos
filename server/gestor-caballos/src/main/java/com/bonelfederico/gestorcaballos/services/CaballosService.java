package com.bonelfederico.gestorcaballos.services;

import com.bonelfederico.gestorcaballos.dtos.caballo.CaballoDTO;
import com.bonelfederico.gestorcaballos.dtos.caballo.CaballoInputDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;

import java.util.List;

/**
 * Servicio de caballos, encapsula toda la logica del negocio relacionada a la gestion de caballos en el sistema
 */
public interface CaballosService {

    /**
     * Registra un nuevo caballo en el sistema
     *
     * @param caballo Nuevo caballo a ser registrado
     * @return El caballo registrado
     */
    CaballoDTO create(CaballoInputDTO caballo);

    /**
     * Obtiene una lista con todos los caballos registrados en el sistema
     *
     * @return Lista con todos los caballos registrados en el sistema
     */
    List<CaballoDTO> getAll();

    /**
     * Obtiene una lista con todos los caballos registrados en el sistema por pagina
     *
     * @param page Pagina de caballos a buscar
     * @param limit Cantidad de caballos por pagina
     * @return Lista con todos los caballos registrados en el sistema para esa pagina con ese limite
     */
    List<CaballoDTO> getAllByPage(Integer page, Integer limit);

    /**
     * Obtiene un caballo por id
     *
     * @param id Identificador del caballo a ser conseguido
     * @return caballo encontrado
     */
    CaballoDTO getById(Long id);

    /**
     * Elimina un caballo por id
     *
     * @param id Id del caballo a ser eliminado
     */
    void deleteById(Long id);

    /**
     * Actualiza un caballo por id
     *
     * @param id      Id del caballo a ser actualizado
     * @param caballo caballo con todos los cambios a ser guardado en el sistema
     * @return caballo guardado y actualizado
     */
    CaballoDTO updateById(Long id, CaballoInputDTO caballo);
}

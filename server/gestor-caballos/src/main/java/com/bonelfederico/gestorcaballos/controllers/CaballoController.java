package com.bonelfederico.gestorcaballos.controllers;

import com.bonelfederico.gestorcaballos.dtos.caballo.CaballoDTO;
import com.bonelfederico.gestorcaballos.dtos.caballo.CaballoInputDTO;
import com.bonelfederico.gestorcaballos.dtos.responses.SuccessfulResponseDTO;
import com.bonelfederico.gestorcaballos.services.CaballosService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Controlador de caballos,
 * contiene todos los metodos que manejan solicitudes y respuestas HTTP
 * asociadas a la gestion de caballos
 */
@Slf4j
@RestController
@RequestMapping(CaballoController.CABALLOS_BASE_URL)
public class CaballoController {
    public static final String CABALLOS_BASE_URL = "/api/v1/caballos";
    public static final String BY_ID_CABALLO_BASE_URL = "/{idCaballo}";
    public static final Integer PAGE_LIMIT = 10;

    private final CaballosService caballosService;

    public CaballoController(CaballosService caballosService) {
        this.caballosService = caballosService;
    }

    /**
     * Obtiene una lista de caballos y la devuelve como JSON por pagina
     *
     * @param page Pagina de caballos que se desea obtener
     * @return Lista de todos los caballos almacenados como JSON
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public SuccessfulResponseDTO<List<CaballoDTO>> getCaballos(
            @RequestParam(required = false, defaultValue = "1") Integer page) {
        log.debug("Obteniendo lista de caballos");
        return new SuccessfulResponseDTO<>(caballosService.getAllByPage(page - 1, PAGE_LIMIT));
    }

    /**
     * Obtiene un caballo por id
     *
     * @param idCaballo Id del caballo a obtener
     * @return El caballo obtenido
     */
    @GetMapping(path = BY_ID_CABALLO_BASE_URL)
    @ResponseStatus(HttpStatus.OK)
    public SuccessfulResponseDTO<CaballoDTO> getCaballo(@PathVariable Long idCaballo) {
        log.info("Obteniendo caballo por id " + idCaballo);
        return new SuccessfulResponseDTO<>(caballosService.getById(idCaballo));
    }

    /**
     * Elimina un caballo por id
     *
     * @param idCaballo Id del caballo a eliminar
     */
    @DeleteMapping(path = BY_ID_CABALLO_BASE_URL)
    @ResponseStatus(HttpStatus.OK)
    public void deleteCaballo(@PathVariable Long idCaballo) {
        log.info("Eliminando caballo por id " + idCaballo);
        caballosService.deleteById(idCaballo);
    }

    /**
     * Actualiza un caballo por id
     *
     * @param idCaballo Id del caballo a actualizar
     * @param caballo   Cambios a ser aplicados al caballo
     * @return caballo actualizado
     */
    @PutMapping(path = BY_ID_CABALLO_BASE_URL)
    @ResponseStatus(HttpStatus.OK)
    public SuccessfulResponseDTO<CaballoDTO> putCaballo(@PathVariable Long idCaballo,
                                                        @Valid @RequestBody CaballoInputDTO caballo) {
        log.info("Actualizando caballo por id " + idCaballo);
        return new SuccessfulResponseDTO<>(caballosService.updateById(idCaballo, caballo));
    }

    /**
     * Registra un nuevo caballo en el sistema
     *
     * @param caballo caballo a ser creado
     * @return caballo registrado en el sistema
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessfulResponseDTO<CaballoDTO> postCaballo(@Valid @RequestBody CaballoInputDTO caballo) {
        log.info("Creando nuevo caballo con nombre " + caballo.getNombre());
        return new SuccessfulResponseDTO<>(caballosService.create(caballo));
    }
}

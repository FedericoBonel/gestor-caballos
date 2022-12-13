package com.bonelfederico.gestorcaballos.controllers;

import com.bonelfederico.gestorcaballos.dtos.dueno.DuenoDTO;
import com.bonelfederico.gestorcaballos.dtos.dueno.DuenoExcerptDTO;
import com.bonelfederico.gestorcaballos.dtos.responses.SuccessfulResponseDTO;
import com.bonelfederico.gestorcaballos.services.DuenosService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador de duenos de caballos,
 * contiene todos los metodos que manejan solicitudes y respuestas HTTP
 * asociadas a la gestion de los duenos de caballos
 */
@Slf4j
@RestController
@RequestMapping(DuenosController.DUENOS_BASE_URL)
public class DuenosController {
    public static final String DUENOS_BASE_URL = "/api/v1/duenos";
    public static final String DUENO_BY_ID_BASE_URL = "/{idDueno}";

    private final DuenosService duenosService;


    public DuenosController(DuenosService duenosService) {
        this.duenosService = duenosService;
    }

    /**
     * Obtiene una lista de todos los duenos de caballos y la devuelve como JSON
     *
     * @return Lista de todos los duenos de caballos almacenados como JSON
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public SuccessfulResponseDTO<List<DuenoExcerptDTO>> getDuenos() {
        log.info("Obteniendo listado de duenos del sistema");
        return new SuccessfulResponseDTO<>(duenosService.getAll());
    }

    /**
     * Obtiene un dueno por id
     * @param idDueno Identificador del dueno a ser encontrado
     * @return Dueno encontrado
     */
    @GetMapping(DUENO_BY_ID_BASE_URL)
    public SuccessfulResponseDTO<DuenoDTO> getDueno(@PathVariable Long idDueno) {
        log.info("Obteniendo dueno del sistema con id " + idDueno);
        return new SuccessfulResponseDTO<>(duenosService.getById(idDueno));
    }
}

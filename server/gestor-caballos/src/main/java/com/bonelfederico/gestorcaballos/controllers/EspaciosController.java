package com.bonelfederico.gestorcaballos.controllers;

import com.bonelfederico.gestorcaballos.dtos.espacio.EspacioDTO;
import com.bonelfederico.gestorcaballos.dtos.espacio.EspacioExcerptDTO;
import com.bonelfederico.gestorcaballos.dtos.responses.SuccessfulResponseDTO;
import com.bonelfederico.gestorcaballos.services.EspaciosService;
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
@RequestMapping(EspaciosController.ESPACIOS_BASE_URL)
public class EspaciosController {

    public static final String ESPACIOS_BASE_URL = "/api/v1/espacios";
    public static final String ESPACIO_BY_ID_BASE_URL = "/{idDueno}";
    private final EspaciosService espaciosService;

    public EspaciosController(EspaciosService espaciosService) {
        this.espaciosService = espaciosService;
    }


    /**
     * Obtiene una lista de todos los espacios de caballos y la devuelve como JSON
     *
     * @return Lista de todos los espacios de caballos almacenados como JSON
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public SuccessfulResponseDTO<List<EspacioExcerptDTO>> getEspacios(@RequestParam(required = false) Boolean ocupado) {
        log.info("Obteniendo listado de espacios de caballos del sistema");
        List<EspacioExcerptDTO> espacios;

        if (ocupado == null) {
            espacios = espaciosService.getAll();
        } else {
            espacios = espaciosService.getAllByOcupado(ocupado);
        }

        return new SuccessfulResponseDTO<>(espacios);
    }

    /**
     * Obtiene un espacio de caballo almacenado por id
     * @param idDueno Identificador del espacio a ser encontrado
     * @return Espacio encontrado
     */
    @GetMapping(ESPACIO_BY_ID_BASE_URL)
    public SuccessfulResponseDTO<EspacioDTO> getEspacio(@PathVariable Long idDueno) {
        log.info("Obteniendo espacios de caballos del sistema con id " + idDueno);
        return new SuccessfulResponseDTO<>(espaciosService.getById(idDueno));
    }
}

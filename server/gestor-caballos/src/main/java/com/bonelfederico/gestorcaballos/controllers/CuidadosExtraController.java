package com.bonelfederico.gestorcaballos.controllers;

import com.bonelfederico.gestorcaballos.dtos.cuidadoextra.CuidadoExtraDTO;
import com.bonelfederico.gestorcaballos.dtos.cuidadoextra.CuidadoExtraInputDTO;
import com.bonelfederico.gestorcaballos.dtos.responses.SuccessfulResponseDTO;
import com.bonelfederico.gestorcaballos.services.CuidadosExtraService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Controlador de cuidados extra,
 * contiene todos los metodos que manejan solicitudes y respuestas HTTP
 * asociadas a la gestion de los cuidados de caballos
 */
@Slf4j
@RestController
@RequestMapping(CuidadosExtraController.CUIDADOS_BASE_URL)
public class CuidadosExtraController {
    public static final String CUIDADOS_BASE_URL = "/api/v1/cuidados";

    private final CuidadosExtraService cuidadosExtraService;


    public CuidadosExtraController(CuidadosExtraService cuidadosExtraService) {
        this.cuidadosExtraService = cuidadosExtraService;
    }

    /**
     * Registra un nuevo cuidado especial para un caballo
     *
     * @param cuidadoExtra Cuidado extra a ser registrado
     * @return El nuevo cuidado especial registrado
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SuccessfulResponseDTO<CuidadoExtraDTO> postCuidado(@Valid @RequestBody CuidadoExtraInputDTO cuidadoExtra) {
        log.info("Creando nuevo cuidado especial para el caballo " + cuidadoExtra.getCaballoId());
        return new SuccessfulResponseDTO<>(cuidadosExtraService.create(cuidadoExtra));
    }

    /**
     * Elimina un cuidado especial del sistema por id
     *
     * @param idCuidado Id del cuidado a ser eliminado
     */
    @DeleteMapping("/{idCuidado}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCuidado(@PathVariable Long idCuidado) {
        log.info("Eliminando cuidado especial con el id: " + idCuidado);
        cuidadosExtraService.deleteById(idCuidado);
    }
}

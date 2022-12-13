package com.bonelfederico.gestorcaballos.controllers;

import com.bonelfederico.gestorcaballos.dtos.responses.SuccessfulResponseDTO;
import com.bonelfederico.gestorcaballos.dtos.usuario.AuthDTO;
import com.bonelfederico.gestorcaballos.dtos.usuario.AuthInputDTO;
import com.bonelfederico.gestorcaballos.services.UsuariosService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping(UsuariosController.BASE_URL_USUARIOS)
public class UsuariosController {

    public static final String BASE_URL_USUARIOS = "/api/v1/usuarios";
    private final UsuariosService usuariosService;

    public UsuariosController(UsuariosService usuariosService) {
        this.usuariosService = usuariosService;
    }

    /**
     * Autentica a un usuario por su nombre de usuario y contrasena
     * @param inputDTO Nombre de usuario y contrasena del usuario a autenticar
     * @return Los datos publicos del usuario y su token para utilizar el sistema
     */
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public SuccessfulResponseDTO<AuthDTO> authenticateUsuario(@Valid @RequestBody AuthInputDTO inputDTO) {
        log.info("Autenticando usuario con username " + inputDTO.getUsername());

        return new SuccessfulResponseDTO<>(usuariosService.authenticateUsuario(inputDTO));
    }
}

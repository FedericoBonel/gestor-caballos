package com.bonelfederico.gestorcaballos.dtos.usuario;

import lombok.Data;

/**
 * Abstraccion de un usuario tal y como se expondra en la api al autenticar correctamente a un usuario
 */
@Data
public class AuthDTO {
    private Long idUsuario;

    private String username;

    private String nombres;

    private String apellidos;

    private String token;

    private String email;

}

package com.bonelfederico.gestorcaballos.dtos.usuario;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * Abstraccion de las llaves del usuario a ser recibidas en la api a la hora de autenticar un usuario
 */
@Data
public class AuthInputDTO {

    @Size(min = 1, max = 80, message = "Por favor provea un nombre de usuario válido (Entre 1 a 80 caracteres)")
    @NotBlank(message = "Por favor provea su nombre de usuario")
    private String username;

    @Size(min = 1, max = 80, message = "Por favor provea una contraseña válida (Entre 1 a 80 caracteres)")
    @NotBlank(message = "Por favor provea su contraseña")
    private String password;
}

package com.bonelfederico.gestorcaballos.dtos.caballo;

import lombok.Data;

import javax.validation.constraints.*;
import java.util.Date;

/**
 * Clase que abstrae a un caballo tal y como se recibira al ser enviado a la API por una solicitud HTTP de tipo POST
 * o PUT
 */
@Data
public class CaballoInputDTO {

    @Size(min = 1, max = 80, message = "Por favor provea el nombre del caballo valido (Entre 1 a 80 caracteres)")
    @NotBlank(message = "Por favor provea el nombre del caballo")
    private String nombre;

    @NotNull(message = "Por favor provea una fecha valida de nacimiento del caballo")
    @Past(message = "La fecha de nacimiento del caballo debe ser en el pasado")
    private Date fechaNacimiento;

    @Size(min = 1, max = 80, message = "Por favor provea un color de pelo del caballo valido (Entre 1 a 80 caracteres)")
    @NotBlank(message = "Por favor provea el color de pelo del caballo")
    private String colorPelo;

    @NotNull(message = "Por favor provea una altura para el caballo")
    @Positive(message = "Por favor provea una altura valida para el caballo en metros")
    private Float alturaMetros;

    @Size(min = 1, max = 1)
    @NotBlank(message = "Por favor provea un sexo para el caballo")
    private String sexo;

    @Size(min = 1, max = 80, message = "Por favor provea un numero de identificacion del caballo valido (Entre 1 a 80"
            + " caracteres)")
    @NotBlank(message = "Por favor provea un numero de identificacion del caballo")
    private String identificacion;

    @NotNull(message = "Por favor provea un identificador valido para el dueño del caballo")
    @Positive(message = "Por favor provea un identificador valido para el dueño del caballo")
    private Long duenoId;

    @NotNull(message = "Por favor provea un identificador valido para el espacio del caballo")
    @Positive(message = "Por favor provea un identificador valido para el espacio del caballo")
    private Long espacioId;

}

package com.bonelfederico.gestorcaballos.dtos.cuidadoextra;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

/**
 * Clase que abstrae a un cuidado extra de un caballo tal y como se recibira al ser enviado a la API por una solicitud
 * HTTP de tipo POST o PUT
 */
@Data
public class CuidadoExtraInputDTO {

    @NotNull(message = "Por favor provea un identificador del caballo para el cual se esta creando este cuidado")
    @Positive(message = "Por favor provea un identificador valido del caballo para el cual se esta creando este "
            + "cuidado")
    private Long caballoId;

    @Size(min = 1, max = 80, message = "Por favor provea una descripcion valida del cuidado del caballo valido")
    @NotBlank(message = "Por favor provea una descripcion valida del cuidado del caballo.")
    private String descripcion;
}

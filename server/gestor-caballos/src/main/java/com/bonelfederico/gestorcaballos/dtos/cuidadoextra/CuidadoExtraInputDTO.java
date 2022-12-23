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
    @Size(min = 1, max = 255, message = "Por favor provea una descripcion valida del cuidado del caballo valido")
    @NotBlank(message = "Por favor provea una descripcion valida del cuidado del caballo.")
    private String descripcion;
}

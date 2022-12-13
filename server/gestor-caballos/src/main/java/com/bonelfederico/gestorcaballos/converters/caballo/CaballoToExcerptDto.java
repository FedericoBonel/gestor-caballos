package com.bonelfederico.gestorcaballos.converters.caballo;

import com.bonelfederico.gestorcaballos.converters.ModelDtoConverter;
import com.bonelfederico.gestorcaballos.dtos.caballo.CaballoExcerptDto;
import com.bonelfederico.gestorcaballos.models.Caballo;

/**
 * Convierte el modelo de un caballo a un caballo tal y como se expone en la API de manera resumida
 */
public interface CaballoToExcerptDto extends ModelDtoConverter<Caballo, CaballoExcerptDto> {
}

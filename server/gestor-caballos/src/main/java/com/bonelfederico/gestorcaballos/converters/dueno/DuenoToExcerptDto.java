package com.bonelfederico.gestorcaballos.converters.dueno;

import com.bonelfederico.gestorcaballos.converters.ModelDtoConverter;
import com.bonelfederico.gestorcaballos.dtos.dueno.DuenoExcerptDTO;
import com.bonelfederico.gestorcaballos.models.Dueno;

/**
 * Convierte un dueno tal y como se persiste en el modelo a como se expone en la api de manera resumida
 */
public interface DuenoToExcerptDto extends ModelDtoConverter<Dueno, DuenoExcerptDTO> {
}

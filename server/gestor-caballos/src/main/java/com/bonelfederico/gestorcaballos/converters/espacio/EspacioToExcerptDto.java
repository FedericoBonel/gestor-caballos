package com.bonelfederico.gestorcaballos.converters.espacio;

import com.bonelfederico.gestorcaballos.converters.ModelDtoConverter;
import com.bonelfederico.gestorcaballos.dtos.espacio.EspacioExcerptDTO;
import com.bonelfederico.gestorcaballos.models.Espacio;

/**
 * Convierte un espacio disponible tal y como se persiste en el modelo a como se expone en la api de manera resumida
 */
public interface EspacioToExcerptDto extends ModelDtoConverter<Espacio, EspacioExcerptDTO> {
}

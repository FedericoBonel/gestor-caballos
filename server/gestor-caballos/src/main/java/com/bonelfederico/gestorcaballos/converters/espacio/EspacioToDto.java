package com.bonelfederico.gestorcaballos.converters.espacio;

import com.bonelfederico.gestorcaballos.converters.ModelDtoConverter;
import com.bonelfederico.gestorcaballos.dtos.espacio.EspacioDTO;
import com.bonelfederico.gestorcaballos.models.Espacio;

/**
 * Convierte un espacio disponible tal y como se persiste en el modelo a como se expone en la api
 */
public interface EspacioToDto extends ModelDtoConverter<Espacio, EspacioDTO> {
}

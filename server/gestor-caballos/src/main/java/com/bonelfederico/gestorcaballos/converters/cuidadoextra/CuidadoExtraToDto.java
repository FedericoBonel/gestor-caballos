package com.bonelfederico.gestorcaballos.converters.cuidadoextra;

import com.bonelfederico.gestorcaballos.converters.ModelDtoConverter;
import com.bonelfederico.gestorcaballos.dtos.cuidadoextra.CuidadoExtraDTO;
import com.bonelfederico.gestorcaballos.models.CuidadoExtra;

/**
 * Convierte un cuidado extra tal y como se persiste en el modelo a como se expone en la api
 */
public interface CuidadoExtraToDto extends ModelDtoConverter<CuidadoExtra, CuidadoExtraDTO> {
}

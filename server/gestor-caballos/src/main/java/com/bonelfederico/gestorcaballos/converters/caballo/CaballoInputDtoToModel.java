package com.bonelfederico.gestorcaballos.converters.caballo;

import com.bonelfederico.gestorcaballos.converters.ModelDtoConverter;
import com.bonelfederico.gestorcaballos.dtos.caballo.CaballoInputDTO;
import com.bonelfederico.gestorcaballos.models.Caballo;

/**
 * Convierte el modelo de un caballo tal y como se recibe en la api a como se persiste en el modelo
 */
public interface CaballoInputDtoToModel extends ModelDtoConverter<CaballoInputDTO, Caballo> {
}

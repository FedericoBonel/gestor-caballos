package com.bonelfederico.gestorcaballos.converters.cuidadoextra;

import com.bonelfederico.gestorcaballos.converters.ModelDtoConverter;
import com.bonelfederico.gestorcaballos.dtos.cuidadoextra.CuidadoExtraInputDTO;
import com.bonelfederico.gestorcaballos.models.CuidadoExtra;

/**
 * Convierte el modelo de un cuidado extra de un caballo tal y como se recibe en la api a como se persiste en el modelo
 */
public interface CuidadoExtraInputToModel extends ModelDtoConverter<CuidadoExtraInputDTO, CuidadoExtra> {
}

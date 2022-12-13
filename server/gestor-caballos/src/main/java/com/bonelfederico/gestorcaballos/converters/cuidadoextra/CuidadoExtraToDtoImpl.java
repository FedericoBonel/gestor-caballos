package com.bonelfederico.gestorcaballos.converters.cuidadoextra;

import com.bonelfederico.gestorcaballos.dtos.cuidadoextra.CuidadoExtraDTO;
import com.bonelfederico.gestorcaballos.models.CuidadoExtra;
import org.springframework.stereotype.Component;

@Component
public class CuidadoExtraToDtoImpl implements CuidadoExtraToDto {

    @Override
    public CuidadoExtraDTO convert(CuidadoExtra originObject) {
        CuidadoExtraDTO cuidadoExtraDTO = new CuidadoExtraDTO();
        cuidadoExtraDTO.setId(originObject.getId());
        cuidadoExtraDTO.setDescripcion(originObject.getDescripcion());
        return cuidadoExtraDTO;
    }

}

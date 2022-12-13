package com.bonelfederico.gestorcaballos.converters.cuidadoextra;

import com.bonelfederico.gestorcaballos.dtos.cuidadoextra.CuidadoExtraInputDTO;
import com.bonelfederico.gestorcaballos.models.Caballo;
import com.bonelfederico.gestorcaballos.models.CuidadoExtra;
import org.springframework.stereotype.Component;

@Component
public class CuidadoExtraInputToModelImpl implements CuidadoExtraInputToModel {
    @Override
    public CuidadoExtra convert(CuidadoExtraInputDTO originObject) {
        CuidadoExtra cuidadoExtra = new CuidadoExtra();
        cuidadoExtra.setDescripcion(originObject.getDescripcion());

        Caballo caballo = new Caballo();
        caballo.setId(originObject.getCaballoId());

        cuidadoExtra.setCaballo(caballo);

        return cuidadoExtra;
    }
}

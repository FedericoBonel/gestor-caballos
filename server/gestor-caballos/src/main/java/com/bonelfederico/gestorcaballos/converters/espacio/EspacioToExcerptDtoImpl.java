package com.bonelfederico.gestorcaballos.converters.espacio;

import com.bonelfederico.gestorcaballos.dtos.espacio.EspacioExcerptDTO;
import com.bonelfederico.gestorcaballos.models.Espacio;
import org.springframework.stereotype.Service;

@Service
public class EspacioToExcerptDtoImpl implements EspacioToExcerptDto {
    @Override
    public EspacioExcerptDTO convert(Espacio originObject) {
        EspacioExcerptDTO espacioExcerptDTO = new EspacioExcerptDTO();

        espacioExcerptDTO.setId(originObject.getId());
        espacioExcerptDTO.setNombre(originObject.getNombre());
        espacioExcerptDTO.setTipo(originObject.getTipo().getDescripcion());

        return espacioExcerptDTO;
    }
}

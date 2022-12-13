package com.bonelfederico.gestorcaballos.converters.dueno;

import com.bonelfederico.gestorcaballos.dtos.dueno.DuenoExcerptDTO;
import com.bonelfederico.gestorcaballos.models.Dueno;
import org.springframework.stereotype.Service;

@Service
public class DuenoToExcerptDtoImpl implements DuenoToExcerptDto {
    @Override
    public DuenoExcerptDTO convert(Dueno originObject) {

        DuenoExcerptDTO duenoExcerptDTO = new DuenoExcerptDTO();
        duenoExcerptDTO.setId(originObject.getId());
        duenoExcerptDTO.setNombres(originObject.getNombres());
        duenoExcerptDTO.setApellidos(originObject.getApellidos());

        return duenoExcerptDTO;
    }
}

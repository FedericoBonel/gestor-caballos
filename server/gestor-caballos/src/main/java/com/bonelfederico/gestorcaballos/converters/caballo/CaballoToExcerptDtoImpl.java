package com.bonelfederico.gestorcaballos.converters.caballo;

import com.bonelfederico.gestorcaballos.dtos.caballo.CaballoExcerptDto;
import com.bonelfederico.gestorcaballos.models.Caballo;
import org.springframework.stereotype.Service;

@Service
public class CaballoToExcerptDtoImpl implements CaballoToExcerptDto {
    @Override
    public CaballoExcerptDto convert(Caballo originObject) {
        CaballoExcerptDto caballoExcerptDto = new CaballoExcerptDto();

        caballoExcerptDto.setId(originObject.getId());
        caballoExcerptDto.setNombre(originObject.getNombre());
        caballoExcerptDto.setIdentificacion(originObject.getIdentificacion());
        caballoExcerptDto.setSexo(originObject.getSexo());

        return caballoExcerptDto;
    }
}

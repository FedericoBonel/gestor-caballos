package com.bonelfederico.gestorcaballos.converters.espacio;

import com.bonelfederico.gestorcaballos.converters.caballo.CaballoToExcerptDto;
import com.bonelfederico.gestorcaballos.dtos.espacio.EspacioDTO;
import com.bonelfederico.gestorcaballos.models.Espacio;
import org.springframework.stereotype.Service;

@Service
public class EspacioToDtoImpl implements EspacioToDto {

    private final CaballoToExcerptDto caballoToExcerptDto;

    public EspacioToDtoImpl(CaballoToExcerptDto caballoToExcerptDto) {
        this.caballoToExcerptDto = caballoToExcerptDto;
    }

    @Override
    public EspacioDTO convert(Espacio originObject) {
        EspacioDTO espacioDto = new EspacioDTO();

        espacioDto.setId(originObject.getId());
        espacioDto.setNombre(originObject.getNombre());
        espacioDto.setTipo(originObject.getTipo().getDescripcion());
        espacioDto.setLocalizacion(originObject.getLocalizacion());
        espacioDto.setCaballo(caballoToExcerptDto.convert(originObject.getCaballo()));

        return espacioDto;
    }
}

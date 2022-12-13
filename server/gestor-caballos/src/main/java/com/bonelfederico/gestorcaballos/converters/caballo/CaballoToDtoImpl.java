package com.bonelfederico.gestorcaballos.converters.caballo;

import com.bonelfederico.gestorcaballos.converters.cuidadoextra.CuidadoExtraToDto;
import com.bonelfederico.gestorcaballos.converters.dueno.DuenoToExcerptDto;
import com.bonelfederico.gestorcaballos.converters.espacio.EspacioToExcerptDto;
import com.bonelfederico.gestorcaballos.dtos.caballo.CaballoDTO;
import com.bonelfederico.gestorcaballos.dtos.cuidadoextra.CuidadoExtraDTO;
import com.bonelfederico.gestorcaballos.dtos.dueno.DuenoExcerptDTO;
import com.bonelfederico.gestorcaballos.dtos.espacio.EspacioExcerptDTO;
import com.bonelfederico.gestorcaballos.models.Caballo;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CaballoToDtoImpl implements CaballoToDto {

    private final DuenoToExcerptDto duenoToExcerptDto;
    private final CuidadoExtraToDto cuidadoExtraToDto;
    private final EspacioToExcerptDto espacioToDto;

    public CaballoToDtoImpl(DuenoToExcerptDto duenoToExcerptDto,
                            CuidadoExtraToDto cuidadoExtraToDto,
                            EspacioToExcerptDto espacioToDto) {
        this.duenoToExcerptDto = duenoToExcerptDto;
        this.cuidadoExtraToDto = cuidadoExtraToDto;
        this.espacioToDto = espacioToDto;
    }

    @Override
    public CaballoDTO convert(Caballo originObject) {
        CaballoDTO convertedCaballo = extractData(originObject);

        DuenoExcerptDTO convertedDueno = duenoToExcerptDto.convert(originObject.getDueno());
        convertedCaballo.setDueno(convertedDueno);

        EspacioExcerptDTO convertedEspacio = espacioToDto.convert(originObject.getEspacio());
        convertedCaballo.setEspacio(convertedEspacio);

        if (originObject.getCuidadosExtra() != null) {
            List<CuidadoExtraDTO> cuidadoExtraDTO = getCuidadosExtraDTOS(originObject);
            convertedCaballo.setCuidadosExtra(cuidadoExtraDTO);
        }

        return convertedCaballo;
    }

    private CaballoDTO extractData(Caballo modelObject) {
        CaballoDTO convertedCaballo = new CaballoDTO();

        convertedCaballo.setId(modelObject.getId());
        convertedCaballo.setAlturaMetros(modelObject.getAlturaMetros());
        convertedCaballo.setColorPelo(modelObject.getColorPelo());
        convertedCaballo.setFechaNacimiento(modelObject.getFechaNacimiento());
        convertedCaballo.setIdentificacion(modelObject.getIdentificacion());
        convertedCaballo.setSexo(modelObject.getSexo());
        convertedCaballo.setNombre(modelObject.getNombre());
        return convertedCaballo;
    }

    private List<CuidadoExtraDTO> getCuidadosExtraDTOS(Caballo modelObject) {
        return modelObject
                .getCuidadosExtra()
                .stream()
                .map(cuidadoExtraToDto::convert)
                .toList();
    }
}

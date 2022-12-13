package com.bonelfederico.gestorcaballos.converters.caballo;

import com.bonelfederico.gestorcaballos.dtos.caballo.CaballoInputDTO;
import com.bonelfederico.gestorcaballos.models.Caballo;
import com.bonelfederico.gestorcaballos.models.Dueno;
import com.bonelfederico.gestorcaballos.models.Espacio;
import org.springframework.stereotype.Component;

@Component
public class CaballoInputDtoToModelImpl implements CaballoInputDtoToModel {

    @Override
    public Caballo convert(CaballoInputDTO originObject) {
        Caballo convertedCaballo = getCaballo(originObject);

        Dueno convertedDueno = getDueno(originObject);
        convertedCaballo.setDueno(convertedDueno);

        Espacio convertedEspacio = getEspacio(originObject);
        convertedCaballo.setEspacio(convertedEspacio);

        return convertedCaballo;
    }

    private Caballo getCaballo(CaballoInputDTO modelObject) {
        Caballo convertedCaballo = new Caballo();

        convertedCaballo.setAlturaMetros(modelObject.getAlturaMetros());
        convertedCaballo.setColorPelo(modelObject.getColorPelo());
        convertedCaballo.setFechaNacimiento(modelObject.getFechaNacimiento());
        convertedCaballo.setIdentificacion(modelObject.getIdentificacion());
        convertedCaballo.setSexo(modelObject.getSexo());
        convertedCaballo.setNombre(modelObject.getNombre());
        return convertedCaballo;
    }

    private Dueno getDueno(CaballoInputDTO modelObject) {
        Dueno convertedDueno = new Dueno();
        convertedDueno.setId(modelObject.getDuenoId());
        return convertedDueno;
    }

    private Espacio getEspacio(CaballoInputDTO modelObject) {
        Espacio convertedEspacio = new Espacio();
        convertedEspacio.setId(modelObject.getEspacioId());
        return convertedEspacio;
    }
}

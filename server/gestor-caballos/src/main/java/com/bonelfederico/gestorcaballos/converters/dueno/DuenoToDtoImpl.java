package com.bonelfederico.gestorcaballos.converters.dueno;

import com.bonelfederico.gestorcaballos.dtos.ciudad.CiudadDTO;
import com.bonelfederico.gestorcaballos.dtos.direccion.DireccionDTO;
import com.bonelfederico.gestorcaballos.dtos.dueno.DuenoDTO;
import com.bonelfederico.gestorcaballos.dtos.pais.PaisDTO;
import com.bonelfederico.gestorcaballos.models.Dueno;
import org.springframework.stereotype.Component;

@Component
public class DuenoToDtoImpl implements DuenoToDto {
    @Override
    public DuenoDTO convert(Dueno originObject) {
        DuenoDTO duenoDTO = new DuenoDTO();

        duenoDTO.setId(originObject.getId());
        duenoDTO.setNombres(originObject.getNombres());
        duenoDTO.setApellidos(originObject.getApellidos());
        duenoDTO.setTelefono(originObject.getTelefono());
        duenoDTO.setEmail(originObject.getEmail());

        PaisDTO paisDTO = extractPaisDto(originObject);

        CiudadDTO ciudadDTO = extractCiudadDto(originObject, paisDTO);

        DireccionDTO direccionDTO = extractDireccionDto(originObject, ciudadDTO);

        duenoDTO.setDireccion(direccionDTO);

        return duenoDTO;
    }

    private DireccionDTO extractDireccionDto(Dueno originObject, CiudadDTO ciudadDTO) {
        DireccionDTO direccionDTO = new DireccionDTO();
        direccionDTO.setNumero(originObject.getDireccion().getNumero());
        direccionDTO.setCalle(originObject.getDireccion().getCalle());
        direccionDTO.setCiudad(ciudadDTO);
        return direccionDTO;
    }

    private CiudadDTO extractCiudadDto(Dueno originObject, PaisDTO paisDTO) {
        CiudadDTO ciudadDTO = new CiudadDTO();
        ciudadDTO.setId(originObject.getDireccion().getCiudad().getId());
        ciudadDTO.setNombre(originObject.getDireccion().getCiudad().getNombre());
        ciudadDTO.setPais(paisDTO);
        return ciudadDTO;
    }

    private PaisDTO extractPaisDto(Dueno originObject) {
        PaisDTO paisDTO = new PaisDTO();
        paisDTO.setId(originObject.getDireccion().getCiudad().getPais().getId());
        paisDTO.setNombre(originObject.getDireccion().getCiudad().getPais().getNombre());
        return paisDTO;
    }
}

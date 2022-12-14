package com.bonelfederico.gestorcaballos.services;

import com.bonelfederico.gestorcaballos.converters.cuidadoextra.CuidadoExtraInputToModel;
import com.bonelfederico.gestorcaballos.converters.cuidadoextra.CuidadoExtraToDto;
import com.bonelfederico.gestorcaballos.dtos.cuidadoextra.CuidadoExtraDTO;
import com.bonelfederico.gestorcaballos.dtos.cuidadoextra.CuidadoExtraInputDTO;
import com.bonelfederico.gestorcaballos.errors.BadRequestError;
import com.bonelfederico.gestorcaballos.errors.NotFoundError;
import com.bonelfederico.gestorcaballos.models.Caballo;
import com.bonelfederico.gestorcaballos.models.CuidadoExtra;
import com.bonelfederico.gestorcaballos.repositories.CaballosRepository;
import com.bonelfederico.gestorcaballos.repositories.CuidadosExtraRepository;
import org.springframework.stereotype.Service;

@Service
public class CuidadosExtraServiceImpl implements CuidadosExtraService {

    private final CaballosRepository caballosRepository;
    private final CuidadosExtraRepository cuidadosExtraRepository;
    private final CuidadoExtraInputToModel toModelConverter;
    private final CuidadoExtraToDto toDtoConverter;

    public CuidadosExtraServiceImpl(CaballosRepository caballosRepository,
                                    CuidadosExtraRepository cuidadosExtraRepository,
                                    CuidadoExtraInputToModel toModelConverter,
                                    CuidadoExtraToDto cuidadoExtraToDto) {
        this.caballosRepository = caballosRepository;
        this.cuidadosExtraRepository = cuidadosExtraRepository;
        this.toModelConverter = toModelConverter;
        this.toDtoConverter = cuidadoExtraToDto;
    }

    @Override
    public CuidadoExtraDTO create(Long idCaballo, CuidadoExtraInputDTO cuidado) {
        Caballo foundCaballo = caballosRepository.findById(idCaballo).orElseThrow(() ->
                new NotFoundError("El caballo con el siguiente identificador no fue encontrado: " + idCaballo));

        // Verifica que el caballo no tenga el maximo numero de cuidados posibles
        if (Caballo.MAX_NUMBER_CUIDADOS == foundCaballo.getCuidadosExtra().size()) {
            throw new BadRequestError("El caballo ya posee el maximo de cuidados extra que se permiten");
        }

        CuidadoExtra cuidadoExtra = toModelConverter.convert(cuidado);
        cuidadoExtra.setCaballo(foundCaballo);

        return toDtoConverter.convert(cuidadosExtraRepository.save(cuidadoExtra));
    }

    @Override
    public void deleteById(Long idCaballo, Long idCuidado) {
        cuidadosExtraRepository.findByIdAndCaballoId(idCuidado, idCaballo).orElseThrow(() ->
                new NotFoundError("El cuidado extra con el siguiente identificador no fue encontrado: " + idCuidado
                        + " o el Caballo con el siguiente identificador no fue encontrado: " + idCaballo));
        cuidadosExtraRepository.deleteById(idCuidado);
    }
}

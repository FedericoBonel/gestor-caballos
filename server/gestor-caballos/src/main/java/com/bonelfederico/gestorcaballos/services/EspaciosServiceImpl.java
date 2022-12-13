package com.bonelfederico.gestorcaballos.services;

import com.bonelfederico.gestorcaballos.converters.espacio.EspacioToDto;
import com.bonelfederico.gestorcaballos.converters.espacio.EspacioToExcerptDto;
import com.bonelfederico.gestorcaballos.dtos.espacio.EspacioDTO;
import com.bonelfederico.gestorcaballos.dtos.espacio.EspacioExcerptDTO;
import com.bonelfederico.gestorcaballos.errors.NotFoundError;
import com.bonelfederico.gestorcaballos.repositories.EspacioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspaciosServiceImpl implements EspaciosService {

    private final EspacioRepository espacioRepository;
    private final EspacioToDto toDtoConverter;
    private final EspacioToExcerptDto toExcerptDtoConverter;

    public EspaciosServiceImpl(EspacioRepository espacioRepository,
                               EspacioToDto toDtoConverter,
                               EspacioToExcerptDto toExcerptDtoConverter) {
        this.espacioRepository = espacioRepository;
        this.toDtoConverter = toDtoConverter;
        this.toExcerptDtoConverter = toExcerptDtoConverter;
    }

    @Override
    public List<EspacioExcerptDTO> getAll() {
        return espacioRepository.findAll()
                .stream()
                .map(toExcerptDtoConverter::convert)
                .toList();
    }

    @Override
    public EspacioDTO getById(Long idDueno) {
        return toDtoConverter.convert(espacioRepository.findById(idDueno)
                .orElseThrow(() -> new NotFoundError("No se encontro un cliente con ese id: " + idDueno)));
    }
}

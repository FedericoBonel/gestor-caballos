package com.bonelfederico.gestorcaballos.services;

import com.bonelfederico.gestorcaballos.converters.dueno.DuenoToDto;
import com.bonelfederico.gestorcaballos.converters.dueno.DuenoToExcerptDto;
import com.bonelfederico.gestorcaballos.dtos.dueno.DuenoDTO;
import com.bonelfederico.gestorcaballos.dtos.dueno.DuenoExcerptDTO;
import com.bonelfederico.gestorcaballos.errors.NotFoundError;
import com.bonelfederico.gestorcaballos.repositories.DuenosRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DuenosServiceImpl implements DuenosService {

    private final DuenosRepository duenosRepository;
    private final DuenoToDto toDtoConverter;
    private final DuenoToExcerptDto toExcerptDtoConverter;

    public DuenosServiceImpl(DuenosRepository duenosRepository,
                             DuenoToDto toDtoConverter,
                             DuenoToExcerptDto toExcerptDtoConverter) {
        this.duenosRepository = duenosRepository;
        this.toDtoConverter = toDtoConverter;
        this.toExcerptDtoConverter = toExcerptDtoConverter;
    }

    @Override
    public List<DuenoExcerptDTO> getAll() {
        return duenosRepository.findAll()
                .stream()
                .map(toExcerptDtoConverter::convert)
                .toList();
    }

    @Override
    public DuenoDTO getById(Long idDueno) {
        return toDtoConverter.convert(duenosRepository
                .findById(idDueno)
                .orElseThrow(() ->
                        new NotFoundError("El cliente no fue encontrado con ese id: " + idDueno)));
    }
}

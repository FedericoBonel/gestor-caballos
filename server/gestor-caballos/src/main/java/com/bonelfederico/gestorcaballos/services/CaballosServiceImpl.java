package com.bonelfederico.gestorcaballos.services;

import com.bonelfederico.gestorcaballos.converters.caballo.CaballoInputDtoToModel;
import com.bonelfederico.gestorcaballos.converters.caballo.CaballoToDto;
import com.bonelfederico.gestorcaballos.dtos.caballo.CaballoDTO;
import com.bonelfederico.gestorcaballos.dtos.caballo.CaballoInputDTO;
import com.bonelfederico.gestorcaballos.errors.BadRequestError;
import com.bonelfederico.gestorcaballos.errors.NotFoundError;
import com.bonelfederico.gestorcaballos.models.Caballo;
import com.bonelfederico.gestorcaballos.models.Dueno;
import com.bonelfederico.gestorcaballos.models.Espacio;
import com.bonelfederico.gestorcaballos.repositories.CaballosRepository;
import com.bonelfederico.gestorcaballos.repositories.DuenosRepository;
import com.bonelfederico.gestorcaballos.repositories.EspacioRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CaballosServiceImpl implements CaballosService {

    private static final ExampleMatcher SEARCH_CONDITIONS_MATCH_ANY = ExampleMatcher
            .matchingAny()
            .withMatcher("nombre", ExampleMatcher.GenericPropertyMatchers.contains())
            .withIgnoreCase();

    private final CaballosRepository caballosRepository;
    private final DuenosRepository duenosRepository;
    private final EspacioRepository espacioRepository;
    private final CaballoToDto toDtoConverter;
    private final CaballoInputDtoToModel toModelConverter;

    public CaballosServiceImpl(CaballosRepository caballosRepository,
                               DuenosRepository duenosRepository,
                               EspacioRepository espacioRepository,
                               CaballoToDto toDtoConverter,
                               CaballoInputDtoToModel toModelConverter) {
        this.caballosRepository = caballosRepository;
        this.duenosRepository = duenosRepository;
        this.espacioRepository = espacioRepository;
        this.toDtoConverter = toDtoConverter;
        this.toModelConverter = toModelConverter;
    }

    @Override
    public CaballoDTO create(CaballoInputDTO caballo) {
        Dueno dueno = duenosRepository.findById(caballo.getDuenoId()).orElseThrow(() ->
                new NotFoundError("El dueño no fue encontrado con ese identificador: " + caballo.getDuenoId()));
        Espacio espacio = espacioRepository.findById(caballo.getEspacioId()).orElseThrow(() ->
                new NotFoundError("El espacio no fue encontrado con ese identificador: " + caballo.getEspacioId()));

        if (espacio.getCaballo() != null) {
            throw new BadRequestError("El espacio seleccionado se haya ocupado: " + espacio.getId());
        }

        // Asigna las relaciones
        Caballo newCaballo = toModelConverter.convert(caballo);
        newCaballo.setDueno(dueno);
        newCaballo.setEspacio(espacio);

        return toDtoConverter.convert(caballosRepository.save(newCaballo));
    }

    @Override
    public List<CaballoDTO> getAll() {
        List<Caballo> foundCaballos = caballosRepository.findAll();

        return foundCaballos.stream().map(toDtoConverter::convert).toList();
    }

    @Override
    public List<CaballoDTO> getAllByQuery(Integer page, Integer limit, String query) {
        Pageable pageable = PageRequest.of(page, limit);

        Caballo caballoExample = new Caballo();
        caballoExample.setNombre(query);
        Example<Caballo> example = Example.of(caballoExample, SEARCH_CONDITIONS_MATCH_ANY);

        return caballosRepository.findAll(example, pageable)
                .map(toDtoConverter::convert)
                .getContent();
    }

    @Override
    public List<CaballoDTO> getAllByPage(Integer page, Integer limit) {
        return caballosRepository
                .findAllBy(PageRequest.of(page, limit))
                .map(toDtoConverter::convert)
                .getContent();
    }

    @Override
    public CaballoDTO getById(Long id) {
        Caballo foundCaballo = caballosRepository.findById(id).orElseThrow(() ->
                new NotFoundError("El caballo no fue encontrado con ese identificador: " + id));

        return toDtoConverter.convert(foundCaballo);
    }

    @Override
    public void deleteById(Long id) {
        caballosRepository.findById(id).orElseThrow(() ->
                new NotFoundError("El caballo no fue encontrado con ese identificador: " + id));

        caballosRepository.deleteById(id);
    }

    @Override
    public CaballoDTO updateById(Long id, CaballoInputDTO caballo) {
        Caballo foundCaballo = caballosRepository.findById(id).orElseThrow(() ->
                new NotFoundError("El caballo no fue encontrado con ese identificador: " + id));
        Dueno dueno = duenosRepository.findById(caballo.getDuenoId()).orElseThrow(() ->
                new NotFoundError("El dueño no fue encontrado con ese identificador: " + caballo.getDuenoId()));
        Espacio espacio = espacioRepository.findById(caballo.getEspacioId()).orElseThrow(() ->
                new NotFoundError("El espacio no fue encontrado con ese identificador: " + caballo.getEspacioId()));

        // Asigna las relaciones
        Caballo updatedCaballo = toModelConverter.convert(caballo);
        updatedCaballo.setId(id);
        updatedCaballo.setDueno(dueno);
        updatedCaballo.setEspacio(espacio);
        updatedCaballo.setCuidadosExtra(foundCaballo.getCuidadosExtra());

        // Guarda la actualizacion
        caballosRepository.save(updatedCaballo);

        return toDtoConverter.convert(updatedCaballo);
    }
}

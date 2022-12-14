package com.bonelfederico.gestorcaballos.repositories;

import com.bonelfederico.gestorcaballos.models.CuidadoExtra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repositorio que encapsula todas las operaciones de los cuidados extra de cada caballo con la base de datos
 */
@Repository
public interface CuidadosExtraRepository extends JpaRepository<CuidadoExtra, Long> {
    Optional<CuidadoExtra> findByIdAndCaballoId(Long id, Long caballoId);
}

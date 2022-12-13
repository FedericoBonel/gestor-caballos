package com.bonelfederico.gestorcaballos.repositories;

import com.bonelfederico.gestorcaballos.models.Caballo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio que encapsula todas las operaciones de los caballos con la base de datos
 */
@Repository
public interface CaballosRepository extends JpaRepository<Caballo, Long> {
    Slice<Caballo> findAllBy(Pageable pageable);
}

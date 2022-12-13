package com.bonelfederico.gestorcaballos.repositories;

import com.bonelfederico.gestorcaballos.models.Dueno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio que encapsula todas las operaciones de los duenos de cada caballo con la base de datos
 */
@Repository
public interface DuenosRepository extends JpaRepository<Dueno, Long> {
}

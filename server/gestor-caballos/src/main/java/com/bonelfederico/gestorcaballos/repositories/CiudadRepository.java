package com.bonelfederico.gestorcaballos.repositories;

import com.bonelfederico.gestorcaballos.models.Ciudad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio que encapsula todas las operaciones de las ciudades con la base de datos
 */
@Repository
public interface CiudadRepository extends JpaRepository<Ciudad, Long> {
}

package com.bonelfederico.gestorcaballos.repositories;

import com.bonelfederico.gestorcaballos.models.Direccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio que encapsula todas las operaciones de las direcciones con la base de datos
 */
@Repository
public interface DireccionRepository extends JpaRepository<Direccion, Long> {
}

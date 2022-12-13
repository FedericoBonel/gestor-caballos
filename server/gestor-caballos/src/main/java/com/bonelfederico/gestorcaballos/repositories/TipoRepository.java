package com.bonelfederico.gestorcaballos.repositories;

import com.bonelfederico.gestorcaballos.models.Tipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio que encapsula todas las operaciones de los tipos de cada espacio disponible con la base de datos
 */
@Repository
public interface TipoRepository extends JpaRepository<Tipo, Long> {
}

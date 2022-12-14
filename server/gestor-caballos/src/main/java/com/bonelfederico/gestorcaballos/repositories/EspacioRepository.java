package com.bonelfederico.gestorcaballos.repositories;

import com.bonelfederico.gestorcaballos.models.Espacio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio que encapsula todas las operaciones de los espacios disponibles de cada caballo con la base de datos
 */
@Repository
public interface EspacioRepository extends JpaRepository<Espacio, Long> {
    List<Espacio> findByCaballoIsNull();
    List<Espacio> findByCaballoIsNotNull();
}

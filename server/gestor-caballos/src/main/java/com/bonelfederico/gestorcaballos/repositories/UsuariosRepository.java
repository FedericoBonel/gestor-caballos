package com.bonelfederico.gestorcaballos.repositories;

import com.bonelfederico.gestorcaballos.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repositorio que encapsula todas las operaciones de los usuarios del sistema con la base de datos
 */
public interface UsuariosRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);
}

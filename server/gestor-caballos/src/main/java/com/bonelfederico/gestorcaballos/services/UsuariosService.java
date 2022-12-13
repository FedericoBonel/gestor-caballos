package com.bonelfederico.gestorcaballos.services;

import com.bonelfederico.gestorcaballos.dtos.usuario.AuthDTO;
import com.bonelfederico.gestorcaballos.dtos.usuario.AuthInputDTO;

/**
 * Servicio de usuarios, encapsula toda la logica del negocio relacionada a la gestion de
 * usuarios en el sistema
 */
public interface UsuariosService {

    /**
     * Autentica a un usuario por nombre de usuario y contrasena
     * @param usernameAndPassword El objeto que contiene el username del usuario a autenticar y su contrasena
     * @return Nombre de usuario, email, nombres, apellidos, id de usuario y token del usuario autenticado para
     * utilizar el sistema
     */
    AuthDTO authenticateUsuario(AuthInputDTO usernameAndPassword);

}

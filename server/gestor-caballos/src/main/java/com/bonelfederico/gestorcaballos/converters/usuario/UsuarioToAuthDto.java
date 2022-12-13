package com.bonelfederico.gestorcaballos.converters.usuario;

import com.bonelfederico.gestorcaballos.converters.ModelDtoConverter;
import com.bonelfederico.gestorcaballos.dtos.usuario.AuthDTO;
import com.bonelfederico.gestorcaballos.models.Usuario;

/**
 * Convierte a un usuario tal y como se persiste en el modelo a como se expone en la api con su informacion publica
 */
public interface UsuarioToAuthDto extends ModelDtoConverter<Usuario, AuthDTO> {
}

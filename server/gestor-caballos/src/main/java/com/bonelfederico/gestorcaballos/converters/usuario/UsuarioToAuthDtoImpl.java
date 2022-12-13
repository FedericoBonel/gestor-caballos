package com.bonelfederico.gestorcaballos.converters.usuario;

import com.bonelfederico.gestorcaballos.dtos.usuario.AuthDTO;
import com.bonelfederico.gestorcaballos.models.Usuario;
import org.springframework.stereotype.Component;

@Component
public class UsuarioToAuthDtoImpl implements UsuarioToAuthDto {
    @Override
    public AuthDTO convert(Usuario originObject) {
        AuthDTO authDTO = new AuthDTO();

        authDTO.setIdUsuario(originObject.getId());
        authDTO.setNombres(originObject.getNombres());
        authDTO.setApellidos(originObject.getApellidos());
        authDTO.setEmail(originObject.getEmail());
        authDTO.setUsername(originObject.getUsername());

        return authDTO;
    }
}

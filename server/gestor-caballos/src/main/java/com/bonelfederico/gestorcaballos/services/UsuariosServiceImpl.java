package com.bonelfederico.gestorcaballos.services;

import com.bonelfederico.gestorcaballos.utils.EncoderProvider;
import com.bonelfederico.gestorcaballos.converters.usuario.UsuarioToAuthDto;
import com.bonelfederico.gestorcaballos.dtos.usuario.AuthDTO;
import com.bonelfederico.gestorcaballos.dtos.usuario.AuthInputDTO;
import com.bonelfederico.gestorcaballos.errors.UnauthorizedError;
import com.bonelfederico.gestorcaballos.models.Usuario;
import com.bonelfederico.gestorcaballos.repositories.UsuariosRepository;
import com.bonelfederico.gestorcaballos.utils.JWTUtil;
import org.springframework.stereotype.Service;

@Service
public class UsuariosServiceImpl implements UsuariosService {

    private final UsuariosRepository usuariosRepository;
    private final UsuarioToAuthDto toAuthDtoConverter;
    private final EncoderProvider encoderProvider;
    private final JWTUtil jwtUtil;

    public UsuariosServiceImpl(UsuariosRepository usuariosRepository,
                               UsuarioToAuthDto toAuthDtoConverter,
                               EncoderProvider encoderProvider,
                               JWTUtil jwtUtil) {
        this.usuariosRepository = usuariosRepository;
        this.toAuthDtoConverter = toAuthDtoConverter;
        this.encoderProvider = encoderProvider;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AuthDTO authenticateUsuario(AuthInputDTO usernameAndPassword) {
        // Asegurate que el usuario exista, que la clave proveida sea correcta y que el usuario este activado
        Usuario foundUsuario = usuariosRepository.findByUsername(usernameAndPassword.getUsername())
                .orElseThrow(() -> new UnauthorizedError("Usuario o contraseña incorrectos"));

        if (!encoderProvider.getEncoder().matches(usernameAndPassword.getPassword(), foundUsuario.getPassword())
                || !foundUsuario.getEnabled()){
            throw new UnauthorizedError("Usuario o contraseña incorrectos");
        }

        String jwt = jwtUtil.generateToken(foundUsuario);
        AuthDTO publicInfoUsuario = toAuthDtoConverter.convert(foundUsuario);
        publicInfoUsuario.setToken(jwt);
        // Devuelve la informacion publica del usuario y el token generado
        return publicInfoUsuario;
    }
}

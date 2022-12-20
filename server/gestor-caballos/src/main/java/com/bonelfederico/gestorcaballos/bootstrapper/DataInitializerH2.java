package com.bonelfederico.gestorcaballos.bootstrapper;

import com.bonelfederico.gestorcaballos.utils.EncoderProvider;
import com.bonelfederico.gestorcaballos.models.*;
import com.bonelfederico.gestorcaballos.repositories.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Bootstraper por defecto,
 * contiene el metodo que inicializa los valores de prueba al ejecutar el programa
 * sin especificar el perfil de produccion
 */
@Slf4j
@Component
@Profile("default")
public class DataInitializerH2 implements ApplicationListener<ContextRefreshedEvent> {

    private final CaballosRepository caballosRepository;
    private final PaisRepository paisRepository;
    private final CiudadRepository ciudadRepository;
    private final DireccionRepository direccionRepository;
    private final DuenosRepository duenosRepository;
    private final EspacioRepository espacioRepository;
    private final TipoRepository tipoRepository;
    private final CuidadosExtraRepository cuidadosExtraRepository;
    private final UsuariosRepository usuariosRepository;
    private final EncoderProvider encoderProvider;


    public DataInitializerH2(CaballosRepository caballosRepository,
                             PaisRepository paisRepository,
                             CiudadRepository ciudadRepository,
                             DireccionRepository direccionRepository,
                             DuenosRepository duenosRepository,
                             EspacioRepository espacioRepository,
                             TipoRepository tipoRepository,
                             CuidadosExtraRepository cuidadosExtraRepository,
                             UsuariosRepository usuariosRepository,
                             EncoderProvider encoderProvider) {
        this.caballosRepository = caballosRepository;
        this.paisRepository = paisRepository;
        this.ciudadRepository = ciudadRepository;
        this.direccionRepository = direccionRepository;
        this.duenosRepository = duenosRepository;
        this.espacioRepository = espacioRepository;
        this.tipoRepository = tipoRepository;
        this.cuidadosExtraRepository = cuidadosExtraRepository;
        this.usuariosRepository = usuariosRepository;
        this.encoderProvider = encoderProvider;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        initializeSampleData();
    }

    /**
     * Inicializa los datos de prueba del sistema
     */
    private void initializeSampleData() {
        Pais pais = new Pais();
        pais.setNombre("Argentina");
        paisRepository.save(pais);

        Ciudad ciudad = new Ciudad();
        ciudad.setNombre("Cordoba");
        ciudad.setPais(pais);
        ciudadRepository.save(ciudad);

        Tipo tipo = new Tipo();
        tipo.setDescripcion("Piquete");
        tipoRepository.save(tipo);

        Espacio espacio = new Espacio();
        espacio.setLocalizacion("Atras del todo a la derecha");
        espacio.setNombre("E01");
        espacio.setTipo(tipo);
        espacioRepository.save(espacio);

        Espacio espacio2 = new Espacio();
        espacio2.setLocalizacion("Atras del todo a la izquierda");
        espacio2.setNombre("E02");
        espacio2.setTipo(tipo);
        espacioRepository.save(espacio2);

        Dueno dueno = new Dueno();
        dueno.setNombres("Federico Jorge");
        dueno.setApellidos("Bonel Tozzi");
        dueno.setEmail("bonelfederico@gmail.com");
        dueno.setTelefono("5493513724222");
        duenosRepository.save(dueno);

        Direccion direccion = new Direccion();
        direccion.setCalle("Rafael Garcia");
        direccion.setNumero(3687);
        direccion.setDueno(dueno);
        direccion.setCiudad(ciudad);
        direccionRepository.save(direccion);

        Caballo caballo = new Caballo();
        caballo.setNombre("nombre");
        caballo.setAlturaMetros(1.5f);
        caballo.setColorPelo("marron");
        caballo.setFechaNacimiento(new Date());
        caballo.setIdentificacion("123456789");
        caballo.setSexo("m");
        caballo.setDueno(dueno);
        caballo.setEspacio(espacio);
        caballosRepository.save(caballo);

        CuidadoExtra cuidadoExtra = new CuidadoExtra();
        cuidadoExtra.setCaballo(caballo);
        cuidadoExtra.setDescripcion("Avena tipo AAA");
        cuidadosExtraRepository.save(cuidadoExtra);

        Usuario usuario = new Usuario();
        usuario.setEmail("bonelfederico@gmail.com");
        usuario.setNombres("Federico");
        usuario.setApellidos("Bonel");
        usuario.setUsername("fedebonel");
        usuario.setEnabled(true);
        usuario.setPassword(encoderProvider.getEncoder().encode("1234"));
        usuariosRepository.save(usuario);
    }
}

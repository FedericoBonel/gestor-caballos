package com.bonelfederico.gestorcaballos.config;

import com.bonelfederico.gestorcaballos.controllers.CaballoController;
import com.bonelfederico.gestorcaballos.controllers.CuidadosExtraController;
import com.bonelfederico.gestorcaballos.controllers.DuenosController;
import com.bonelfederico.gestorcaballos.controllers.EspaciosController;
import com.bonelfederico.gestorcaballos.filters.JWTVerificationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.Filter;

/**
 * Configuracion de todos los filtros utilizados en el servidor antes de llegar a los controladores
 */
@Configuration
public class FilterConfig {

    /**
     * Provee el filtro de verificacion/proteccion de JWTs
     */
    @Bean
    public FilterRegistrationBean<Filter> jwtVerificationFilter(JWTVerificationFilter jwtVerificationFilter) {
        FilterRegistrationBean<Filter> filter = new FilterRegistrationBean<>();
        filter.setFilter(jwtVerificationFilter);

        // Rutas protegidas por JWTs
        filter.addUrlPatterns(CaballoController.CABALLOS_BASE_URL + "/*" );
        filter.addUrlPatterns(CuidadosExtraController.CUIDADOS_BASE_URL + "/*" );
        filter.addUrlPatterns(DuenosController.DUENOS_BASE_URL + "/*" );
        filter.addUrlPatterns(EspaciosController.ESPACIOS_BASE_URL + "/*");

        return filter;
    }
}

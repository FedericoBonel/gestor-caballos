package com.bonelfederico.gestorcaballos.converters;

/**
 * Abstraccion de un convertor de modelo a dto o viceversa
 *
 * @param <ORIGIN>  Clase/interfaz desde la cual se desea convertir
 * @param <DESTINY> Clase/interfaz a la cual se desea convertir
 */
public interface ModelDtoConverter<ORIGIN, DESTINY> {

    /**
     * Convierte el objeto recibido al objeto destino de la implementacion correspondiente
     *
     * @param originObject Objeto a convertir
     * @return El objeto convertido al objeto requerido
     */
    DESTINY convert(ORIGIN originObject);
}

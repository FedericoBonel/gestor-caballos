import axios from "axios";

import { apiConstants } from "./";

const axiosInstace = axios.create({
    baseURL: apiConstants.CABALLOS_URL,
});

/**
 * Crea un cuidado de caballo en el back end
 * @param {String} token token del usuario autenticado
 * @param {String} idCaballo Caballo para el que se esta creando el cuidado
 * @param {{descripcion: String}} newCuidado del cuidado
 * @returns Cuidado creado en el back end
 */
export const postCuidado = async (token, idCaballo, newCuidado) => {
    const response = await axiosInstace.post(
        `/${idCaballo}${apiConstants.CUIDADOS_SUB_URL}`,
        newCuidado,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return response.data;
};

/**
 * Elimina el cuidado de un caballo desde el back end
 * @param {String} token token del usuario autenticado
 * @param {String} idCaballo identificador del caballo desde el cual se eliminara el cuidado
 * @param {String} idCuidado identificador del cuidado a ser eliminado
 */
export const deleteCuidado = async (token, idCaballo, idCuidado) => {
    const response = await axiosInstace.delete(
        `/${idCaballo}${apiConstants.CUIDADOS_SUB_URL}/${idCuidado}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return response.data;
};

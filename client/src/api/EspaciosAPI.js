import axios from "axios";

import { apiConstants } from "./";

const axiosInstace = axios.create({
    baseURL: apiConstants.ESPACIOS_URL,
});

/**
 * Busca el listado de espacios desde el back end
 * @param {String} token token del usuario autenticado
 * @param {Boolean} ocupado True si se desea el listado de espacios con caballos asignados, false en caso contrario
 * @return El listado de espacios del back end
 */
export const getEspacios = async (token, ocupado) => {
    const response = await axiosInstace.get(`/?ocupado=${ocupado}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    
    return response.data;
};

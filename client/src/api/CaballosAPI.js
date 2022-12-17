import axios from "axios";

import { apiConstants } from "./";

const axiosInstace = axios.create({
    baseURL: apiConstants.CABALLOS_URL,
});

/**
 * Busca el listado de caballos desde el back end
 * @param {String} token token del usuario autenticado
 * @param {Number} page pagina de caballos a buscar
 * @param {Number} limit numero de caballos por pagina
 */
export const getCaballos = async (token, page = 1, limit = 10) => {
    const response = await axiosInstace.get(`/?page=${page}&limit=${limit}`, {
        headers: { "Authorization": `Bearer ${token}` },
    });

    return await response.data;
};

import axios from "axios";

import { apiConstants } from "./";

const axiosInstace = axios.create({
    baseURL: apiConstants.DUENOS_URL,
});

/**
 * Busca el listado de duenos desde el back end
 * @param {String} token token del usuario autenticado
 */
export const getDuenos = async (token) => {
    const response = await axiosInstace.get(`/`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

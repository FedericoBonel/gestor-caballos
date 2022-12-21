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
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

/**
 * Busca un caballo por id desde el back end
 * @param {String} token token del usuario autenticado
 * @param {Number} idCaballo identificador del caballo a ser buscado
 */
export const getCaballoById = async (token, idCaballo) => {
    const response = await axiosInstace.get(`/${idCaballo}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

/**
 * Elimina el caballo desde el back end
 * @param {String} token token del usuario autenticado
 * @param {String} idCaballo identificador del caballo a ser eliminado
 */
export const deleteCaballo = async (token, idCaballo) => {
    const response = await axiosInstace.delete(`/${idCaballo}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

/**
 *
 * @param {*} token
 * @param {{nombre,fechaNacimiento,colorPelo,alturaMetros,sexo,identificacion,duenoId,espacioId,cuidadosExtra}} newCaballo
 * @returns
 */
export const postCaballo = async (token, newCaballo) => {
    // Extrae los cuidados extra
    const { cuidadosExtra, ...caballo } = newCaballo;

    // Envia el caballo
    const { data: caballoResult } = await axiosInstace.post("/", caballo, {
        headers: { Authorization: `Bearer ${token}` },
    });

    // Verifica si hay cuidados extra, y si los hay, registralos
    let cuidadosResult = [];
    if (cuidadosExtra) {
        for (const cuidado of cuidadosExtra) {
            const cuidadoRes = await axiosInstace.post(
                `/${caballoResult.data.id}${apiConstants.CUIDADOS_SUB_URL}`,
                { descripcion: cuidado },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            cuidadosResult.push(cuidadoRes.data.data.descripcion);
        }
    }
    caballoResult.data.cuidadosExtra = cuidadosResult;

    return caballoResult;
};

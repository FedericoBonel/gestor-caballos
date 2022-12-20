import axios from "axios";

import { apiConstants } from "./";

const axiosInstace = axios.create({
    baseURL: apiConstants.USUARIOS_URL_LOGIN,
});

/**
 * Autentica a un usuario en el backend y devuelve su informacion relevante en conjunto con su token
 * @param {{username: String, password: String}} userAndPass nombre de usuario y clave del usuario a autenticar
 */
export const authenticateUsuario = async ({ username, password }) => {
    const response = await axiosInstace.post("/", { username, password });

    return response.data;
};

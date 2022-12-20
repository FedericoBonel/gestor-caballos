/**
 * Fichero que contiene todas las constantes utilizadas en las api
 */

// API host URL
export const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api/v1";
// Recursos
export const USUARIOS_URL_LOGIN = `${API_BASE_URL}/usuarios/login`;
export const CABALLOS_URL = `${API_BASE_URL}/caballos`;
export const DUENOS_URL = `${API_BASE_URL}/duenos`;
export const ESPACIOS_URL = `${API_BASE_URL}/espacios`;
export const CUIDADOS_SUB_URL = "/cuidados";
// Nombres de caches creadas por React Query
export const CABALLOS_CACHE = "caballos";
export const DUENOS_CACHE = "duenos";
export const ESPACIOS_CACHE = "espacios";


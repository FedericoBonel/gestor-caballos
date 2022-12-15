/**
 * Este fichero contiene todas las rutas del cliente
 */

// Elementos del dominio
export const DASHBOARD = "dashboard";
export const CABALLOS = "caballos";

// Verbos para el dominio
export const CREATE = "crear";
export const UPDATE = "editar";

// Rutas
export const PATH_HOME = "/";

// Dashboard
export const PATH_DASHBOARD = `/${DASHBOARD}`

// Caballos
export const PATH_CABALLOS = `/${CABALLOS}`;
export const PATH_CREATE_CABALLOS = `${PATH_CABALLOS}/${CREATE}`;
export const PATH_UPDATE_CABALLOS = `${PATH_CABALLOS}/${UPDATE}`;

// Error
export const PATH_ERROR = `/error`;
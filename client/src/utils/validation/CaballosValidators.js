/**
 * Fichero que contiene todos los metodos validadores
 */
import validator from "validator";
import { constants } from ".";

/**
 * Verifica el nombre de un caballo
 * @param {String} name Nombre a verificar
 * @returns true si es valido, falso en caso contrario
 */
export const isName = (name) =>
    validator.isLength(name.toString(), {
        min: constants.CABALLOS_NAME_MIN_LENGTH,
        max: constants.CABALLOS_NAME_MAX_LENGTH,
    });

/**
 * Verifica el id de un caballo
 * @param {String} id Identificador a verificar
 * @returns true si es valido, falso en caso contrario
 */
export const isId = (id) =>
    validator.isAlphanumeric(id) &&
    validator.isLength(id, {
        min: constants.CABALLOS_ID_MIN_LENGTH,
        max: constants.CABALLOS_ID_MAX_LENGTH,
    });

/**
 * Verifica la fecha de nacimiento de un caballo
 * @param {Dayjs|Date} birthdate Fecha de nacimiento a verificar como ISO string
 * @returns true si es valido, falso en caso contrario
 */
export const isBirthdate = (birthdate) => {
    if (birthdate && birthdate.isValid()) {
        return validator.isBefore(
            birthdate.toISOString(),
            new Date().toISOString()
        );
    }
    return false;
};

/**
 * Verifica la altura de un caballo
 * @param {String} height Altura a verificar
 * @returns true si es valido, falso en caso contrario
 */
export const isHeight = (height) =>
    validator.isFloat(height, {
        min: constants.CABALLOS_HEIGHT_METERS_MIN_NUMBER,
        max: constants.CABALLOS_HEIGHT_METERS_MAX_NUMBER,
    });

/**
 * Verifica el color de pelo de un caballo
 * @param {String} furColor Color de pelo a verificar
 * @returns true si es valido, falso en caso contrario
 */
export const isFurColor = (furColor) =>
    validator.isAlphanumeric(furColor) &&
    validator.isLength(furColor, {
        min: constants.CABALLOS_FURCOLOR_MIN_LENGTH,
        max: constants.CABALLOS_FURCOLOR_MAX_LENGTH,
    });

/**
 * Verifica el sexo de un caballo
 * @param {String} sex Sexo a verificar
 * @returns true si es valido, falso en caso contrario
 */
export const isSex = (sex) =>
    validator.isAlpha(sex) &&
    validator.isLength(sex, {
        min: constants.CABALLOS_SEX_LENGTH,
        max: constants.CABALLOS_SEX_LENGTH,
    });

/**
 * Verifica el identificador del dueno de un caballo
 * @param {String} ownerId Identificador a verificar
 * @returns true si es valido, falso en caso contrario
 */
export const isOwnerId = (ownerId) => Boolean(ownerId.toString().length);

/**
 * Verifica el identificador del espacio de un caballo
 * @param {String} spaceId Identificador a verificar
 * @returns true si es valido, falso en caso contrario
 */
export const isSpaceId = (spaceId) => Boolean(spaceId.toString().length);

/**
 * Fichero que contiene todos los metodos validadores
 */
import validator from "validator";
import { constants } from ".";

/**
 * Verifica la descripcion de un cuidado extra
 * @param {String} desc Descripcion a verificar
 * @returns true si es valido, falso en caso contrario
 */
export const isDesc = (desc) =>{
    
    return validator.isLength(desc, {
        min: constants.CABALLOS_CUIDADOS_EXTRA_DESC_MIN_LENGTH,
        max: constants.CABALLOS_CUIDADOS_EXTRA_DESC_MAX_LENGTH,
    });}

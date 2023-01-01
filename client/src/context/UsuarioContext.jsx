import { useQueryClient } from "react-query";
import { useState, createContext, useContext } from "react";
import cookies from "js-cookie";

// Lee el cookie del usuario al inicio de ejecucion
const savedCookie = cookies.get("user");

// Contextos creados
const userContext = createContext();
const userUpdateContext = createContext();

/**
 * Devuelve el contexto que contiene el usuario autenticado
 * @returns Usuario autenticado
 */
export const useUsuario = () => useContext(userContext);

/**
 * Devuelve las funciones disponibles para modificar al usuario autenticado
 * @returns Funciones para modificar el usuario autenticado
 */
export const useUsuarioUpdate = () => useContext(userUpdateContext);

/**
 * Proveedor del contexto donde se almacena el usuario logeado
 */
export const UsuarioProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const [user, setUser] = useState(
        savedCookie ? JSON.parse(savedCookie) : null
    );

    // Valida al usuario autenticado y lo guarda como un cookie
    const validateUser = (user) => {
        cookies.set("user", JSON.stringify(user), { expires: 7 });
        setUser(user);
    };

    // Invalida al usuario autenticado y lo elimina de los cookies
    const invalidateUser = () => {
        cookies.remove("user");
        setUser();
        queryClient.clear();
    };

    // Provee los contextos a los hijos de este componente
    return (
        <userContext.Provider value={user}>
            <userUpdateContext.Provider
                value={{ validateUser, invalidateUser }}
            >
                {children}
            </userUpdateContext.Provider>
        </userContext.Provider>
    );
};

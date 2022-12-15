import { Outlet, Navigate } from "react-router-dom";

import { Navbar } from "../components";
import { useUsuario } from "../context";
import { routes } from "../routes";

/**
 * Plantilla para las rutas que seran privadas y requeriran de autenticacion,
 * aplica los componentes que deben estar presentes en todas las paginas privadas.
 */
const PrivateLayout = () => {
    const loggedUser = useUsuario();

    // Si el usuario esta autenticado, renderiza la pagina, si no envialo al formulario de login
    return loggedUser ? (
        <>
            <Navbar />
            <Outlet />
        </>
    ) : (
        <Navigate to={routes.PATH_HOME} />
    );
};

export default PrivateLayout;

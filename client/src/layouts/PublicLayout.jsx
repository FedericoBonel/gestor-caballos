import { Outlet, Navigate } from "react-router-dom";

import { useUsuario } from "../context";
import { routes } from "../routes";

/**
 * Plantilla para las rutas que seran publicas y no pueden ser ingresadas por los usuarios autenticados
 */
const PublicLayout = () => {
    const loggedUser = useUsuario();

    // Si el usuario no esta autenticado, renderiza la pagina, si no envialo al dashboard
    return loggedUser ? <Navigate to={routes.PATH_CABALLOS} /> : <Outlet />;
};

export default PublicLayout;

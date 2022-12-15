import { Outlet, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import { Navbar } from "../components";
import { useUsuario } from "../context";
import { routes } from "../routes";

const containerStyles = {
    display:"flex",
    flexDirection:"row",
    height: "100vh"
}

/**
 * Plantilla para las rutas que seran privadas y requeriran de autenticacion,
 * aplica los componentes que deben estar presentes en todas las paginas privadas.
 */
const PrivateLayout = () => {
    const loggedUser = useUsuario();

    // Si el usuario esta autenticado, renderiza la pagina, si no envialo al formulario de login
    return loggedUser ? (
        <Box sx={containerStyles}>
            <Navbar />
            <Outlet />
        </Box>
    ) : (
        <Navigate to={routes.PATH_HOME} />
    );
};

export default PrivateLayout;

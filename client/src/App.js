import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { routes } from "./routes/";

import { PrivateLayout, PublicLayout } from "./layouts";
import {
    FormularioCaballos,
    FormularioEdicionCaballos,
    MenuCaballos,
    FormularioLogin,
    Caballo,
    Error,
    Dashboard,
} from "./pages";
import { PATH_HOME } from "./routes/RouteConstants";

/**
 * Componente que enruta todas las solicitudes a diferentes paginas
 */
const App = () => {
    return (
        <Router>
            <Routes>
                {/* Solo accesible a usuarios no logeados */}
                <Route path={"/"} element={<PublicLayout />}>
                    <Route path={PATH_HOME} element={<FormularioLogin />} />
                </Route>
                {/* Solo accesible a usuarios logeados */}
                <Route path="/" element={<PrivateLayout />}>
                    {/* Dashboard */}
                    <Route
                        path={`${routes.DASHBOARD}`}
                        element={<Dashboard />}
                    />
                    <Route path={routes.CABALLOS}>
                        {/* Lista de caballos */}
                        <Route index element={<MenuCaballos />} />
                        {/* Lectura de caballopor id */}
                        <Route path=":idCaballo" element={<Caballo />} />
                        {/* Creacion de caballos */}
                        <Route
                            path={routes.CREATE}
                            element={<FormularioCaballos />}
                        />
                        {/* Edicion de caballos */}
                        <Route
                            path={`${routes.UPDATE}/:idCaballo`}
                            element={<FormularioEdicionCaballos />}
                        />
                    </Route>
                </Route>
                {/* Errores */}
                <Route
                    path={`${routes.PATH_ERROR}/:errorCode`}
                    element={<Error />}
                />
                <Route
                    path="*"
                    element={<Navigate to={`${routes.PATH_ERROR}/404`} />}
                />
            </Routes>
        </Router>
    );
};

export default App;

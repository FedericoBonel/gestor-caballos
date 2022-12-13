import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { routes } from "./routes/";

import { PrivateLayout } from "./layouts";
import {
    FormularioCaballos,
    FormularioEdicionCaballos,
    MenuCaballos,
} from "./pages";

/**
 * Componente que enruta todas las solicitudes a diferentes paginas
 */
const App = () => {
    return (
        <Router>
            <Routes>
                {/* Solo accesible a usuarios logeados */}
                <Route path="/" element={<PrivateLayout />}>
                    <Route path={`${routes.CABALLOS}`}>
                        {/* Lista de caballos */}
                        <Route index element={<MenuCaballos />} />
                        {/* Creacion de caballos */}
                        <Route
                            path={routes.CREATE}
                            element={<FormularioCaballos />}
                        />
                        {/* Edicion de caballos */}
                        <Route
                            path={`${routes.UPDATE}/:idEmpleado`}
                            element={<FormularioEdicionCaballos />}
                        />
                    </Route>
                </Route>
                {/* Errores */}
                <Route
                    path={`${routes.PATH_ERROR}/:errorCode`}
                    element={<p>Error</p>}
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

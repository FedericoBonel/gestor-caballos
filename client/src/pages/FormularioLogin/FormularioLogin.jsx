import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import "./FormularioLogin.css";
import { useUsuarioUpdate } from "../../context/";
import { LoginForm } from "../../components";
import { usuariosApi } from "../../api";
import { routes } from "../../routes";

/**
 * Componente de la pagina de autenticacion
 */
const FormularioLogin = () => {
    const navigate = useNavigate();
    const { validateUser } = useUsuarioUpdate();

    // Accesos a api -------------------------------------
    const {
        mutate: authenticateUsuario,
        isSuccess: loginIsSuccesful,
        isLoading: loginIsLoading,
        isError: loginIsError,
        error: loginError,
        data,
    } = useMutation(usuariosApi.authenticateUsuario);

    // Use effect para evitar warnings
    useEffect(() => {
        if (loginIsSuccesful) {
            validateUser(data.data);
        }
    }, [loginIsSuccesful, data, validateUser]);

    // Si ocurrio un error que no es esperado, redirecciona a la pagina de error
    if (loginIsError && !loginError.response?.status === 401) {
        navigate(
            `${routes.PATH_ERROR}/${
                loginError.response ? loginError.response.status : "500"
            }`
        );
    }

    const showWrongCredentials =
        loginIsError && loginError.response?.status === 401;

    // Manejadores de eventos ----------------------------
    const handleSubmit = ({ username, password }) => {
        authenticateUsuario({ username, password });
    };

    // Renderizaciones -----------------------------------
    return (
        <LoginForm
            submitCredentials={handleSubmit}
            showWrongCredentials={showWrongCredentials}
            isLoading={loginIsLoading}
        />
    );
};

export default FormularioLogin;

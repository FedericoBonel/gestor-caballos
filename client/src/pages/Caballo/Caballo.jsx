import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Container } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { routes } from "../../routes";
import { CaballoDetails } from "../../components";
import { apiConstants, caballosApi } from "../../api";
import { useUsuario } from "../../context";

const spinnerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    py: 4,
};

/**
 * Componente de la pagina del detalle de un caballo
 */
const Caballo = () => {
    const navigate = useNavigate();
    const { idCaballo } = useParams();
    const usuario = useUsuario();

    // Interacciones con API --------------------------------------------
    const {
        error: caballoError,
        isError: caballoIsError,
        isLoading: caballoIsLoading,
        isSuccess: caballoIsSuccess,
        data: caballo,
    } = useQuery([apiConstants.CABALLOS_CACHE, idCaballo], () =>
        caballosApi.getCaballoById(usuario.token, idCaballo)
    );

    if (caballoIsError) {
        navigate(
            `${routes.PATH_ERROR}/${
                caballoError.response ? caballoError.response.status : "500"
            }`
        );
    }

    // Renderizaciones --------------------------------------------------
    const details = caballoIsLoading ? (
        <Container maxWidth="xs" sx={spinnerStyles}>
            <CircularProgress />
        </Container>
    ) : (
        caballoIsSuccess && <CaballoDetails caballo={caballo.data} />
    );

    return details;
};

export default Caballo;

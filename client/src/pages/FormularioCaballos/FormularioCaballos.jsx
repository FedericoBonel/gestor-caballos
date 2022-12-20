import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import {
    Container,
    Stack,
    Typography,
    IconButton,
    Divider,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useUsuario } from "../../context";
import { NewCaballoForm } from "../../components";
import { messages } from "../../assets/messages";
import { apiConstants, caballosApi, duenosApi, espaciosApi } from "../../api/";
import { routes } from "../../routes";
import { useEffect } from "react";

const containerStyles = {
    pt: 4,
    pb: 1,
    display: "flex",
    flexDirection: "column",
};

const headerStyles = {
    py: 2,
    display: "flex",
    justifyContent: "space-between",
};

const spinnerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    py: 4,
};

/**
 * Componente de la pagina del formulario de registro de caballos
 */
const FormularioCaballos = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const usuario = useUsuario();
    // Interacciones con API ---------------------------------------------------
    const {
        error: duenosError,
        isError: duenosIsError,
        isLoading: duenosIsLoading,
        isSuccess: duenosIsSuccess,
        data: duenos,
    } = useQuery(apiConstants.DUENOS_CACHE, () =>
        duenosApi.getDuenos(usuario.token)
    );

    if (duenosIsError) {
        navigate(
            `${routes.PATH_ERROR}/${
                duenosError.response ? duenosError.response.status : "500"
            }`
        );
    }

    const {
        error: espaciosError,
        isError: espaciosIsError,
        isLoading: espaciosIsLoading,
        isSuccess: espaciosIsSuccess,
        data: espacios,
    } = useQuery(apiConstants.ESPACIOS_CACHE, () =>
        espaciosApi.getEspacios(usuario.token, false)
    );

    if (espaciosIsError) {
        navigate(
            `${routes.PATH_ERROR}/${
                espaciosError.response ? espaciosError.response.status : "500"
            }`
        );
    }

    const {
        error: caballoError,
        isError: caballoIsError,
        isLoading: caballoIsLoading,
        isSuccess: caballoIsSuccess,
        mutate: saveCaballo,
    } = useMutation(
        (newCaballo) => caballosApi.postCaballo(usuario.token, newCaballo),
        {
            onSuccess: () =>
                queryClient.invalidateQueries({
                    queryKey: apiConstants.CABALLOS_CACHE,
                }),
        }
    );

    if (caballoIsError && caballoError.response?.status !== 400) {
        navigate(
            `${routes.PATH_ERROR}/${
                caballoError.response ? caballoError.response.status : "500"
            }`
        );
    }

    useEffect(() => {
        if (caballoIsSuccess) {
            navigate(routes.PATH_CABALLOS);
        }
    }, [caballoIsSuccess, navigate]);

    // Renderizaciones ---------------------------------------------------------
    const dataLoaded = duenosIsSuccess && espaciosIsSuccess;

    const espaciosAvailable = espacios?.data.length;

    const form = dataLoaded ? (
        espaciosAvailable ? (
            <NewCaballoForm
                duenos={duenos.data}
                espacios={espacios.data}
                submitCaballo={saveCaballo}
                isLoading={caballoIsLoading}
            />
        ) : (
            <Container maxWidth="xs" sx={spinnerStyles}>
                {messages.FORM_NEW_CABALLO_NO_MORE_SPACES}
            </Container>
        )
    ) : (
        (duenosIsLoading || espaciosIsLoading) && (
            <Container maxWidth="xs" sx={spinnerStyles}>
                <CircularProgress />
            </Container>
        )
    );

    return (
        <Container component="main" sx={containerStyles}>
            <Stack direction="row" sx={headerStyles} component="header">
                <Typography variant="h2">
                    {messages.FORM_NEW_CABALLO_TITULO}
                </Typography>
                <IconButton component={Link} to={routes.PATH_CABALLOS}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Divider />
            {form}
        </Container>
    );
};

export default FormularioCaballos;

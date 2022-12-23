import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
    Container,
    Stack,
    Typography,
    IconButton,
    Divider,
    CircularProgress,
    Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { EditCaballoForm } from "../../components";
import { useUsuario } from "../../context";
import {
    apiConstants,
    caballosApi,
    cuidadosApi,
    duenosApi,
    espaciosApi,
} from "../../api/";
import { routes } from "../../routes";
import { messages } from "../../assets/messages";

const containerStyles = {
    pt: 4,
    pb: 1,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    height: "100vh",
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
 * Componente de la pagina de edicion de caballos
 */
const FormularioEdicionCaballos = () => {
    const { idCaballo } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const usuario = useUsuario();

    // Interacciones con API ---------------------------------------------------
    const {
        error: oldCaballoError,
        isError: oldCaballoIsError,
        isLoading: oldCaballoIsLoading,
        isSuccess: oldCaballoIsSuccess,
        data: oldCaballo,
    } = useQuery([apiConstants.CABALLOS_CACHE, idCaballo], () =>
        caballosApi.getCaballoById(usuario.token, idCaballo)
    );

    if (oldCaballoIsError) {
        navigate(
            `${routes.PATH_ERROR}/${
                oldCaballoError.response
                    ? oldCaballoError.response.status
                    : "500"
            }`
        );
    }

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
        data: savedCaballo,
    } = useMutation(
        (updatedCaballo) =>
            caballosApi.putCaballo(usuario.token, idCaballo, updatedCaballo),
        {
            onSuccess: () =>
                queryClient.invalidateQueries({
                    queryKey: apiConstants.CABALLOS_CACHE,
                }),
        }
    );

    if (caballoIsError) {
        navigate(
            `${routes.PATH_ERROR}/${
                caballoError.response ? caballoError.response.status : "500"
            }`
        );
    }

    useEffect(() => {
        if (caballoIsSuccess) {
            navigate(`${routes.PATH_CABALLOS}/${savedCaballo.data?.id}`);
        }
    }, [caballoIsSuccess, navigate, savedCaballo]);

    const {
        error: createCuidadoError,
        isError: createCuidadoIsError,
        isLoading: createCuidadoIsLoading,
        isSuccess: createCuidadoIsSuccess,
        mutate: saveCuidado,
    } = useMutation(
        (updatedCuidado) =>
            cuidadosApi.postCuidado(usuario.token, idCaballo, updatedCuidado),
        {
            onSuccess: () =>
                queryClient.invalidateQueries({
                    queryKey: [apiConstants.CABALLOS_CACHE, idCaballo],
                }),
        }
    );

    if (createCuidadoIsError) {
        navigate(
            `${routes.PATH_ERROR}/${
                createCuidadoError.response
                    ? createCuidadoError.response.status
                    : "500"
            }`
        );
    }

    const {
        error: delCuidadoError,
        isError: delCuidadoIsError,
        isLoading: delCuidadoIsLoading,
        isSuccess: delCuidadoIsSuccess,
        mutate: deleteCuidado,
    } = useMutation(
        (idCuidado) =>
            cuidadosApi.deleteCuidado(usuario.token, idCaballo, idCuidado),
        {
            onSuccess: () =>
                queryClient.invalidateQueries({
                    queryKey: [apiConstants.CABALLOS_CACHE, idCaballo],
                }),
        }
    );

    if (delCuidadoIsError) {
        navigate(
            `${routes.PATH_ERROR}/${
                delCuidadoError.response
                    ? delCuidadoError.response.status
                    : "500"
            }`
        );
    }

    // Renderizaciones ---------------------------------------------------------
    const dataLoading =
        duenosIsLoading || espaciosIsLoading || oldCaballoIsLoading;

    const dataLoaded =
        duenosIsSuccess && espaciosIsSuccess && oldCaballoIsSuccess;

    const form = dataLoaded ? (
        <EditCaballoForm
            caballo={oldCaballo.data}
            duenos={duenos.data}
            espacios={[oldCaballo.data.espacio, ...espacios.data]}
            submitCaballo={saveCaballo}
            isCaballoLoading={caballoIsLoading}
            onCreateCuidado={saveCuidado}
            isCuidadoLoading={
                (createCuidadoIsLoading && !createCuidadoIsSuccess) ||
                (delCuidadoIsLoading && !delCuidadoIsSuccess)
            }
            onDeleteCuidado={deleteCuidado}
        />
    ) : (
        dataLoading && (
            <Container maxWidth="xs" sx={spinnerStyles}>
                <CircularProgress />
            </Container>
        )
    );

    return (
        <Container component="main" sx={containerStyles}>
            <Stack direction="row" sx={headerStyles} component="header">
                <Typography variant="h2">
                    {messages.FORM_EDIT_CABALLO_TITLE}
                </Typography>
                <IconButton component={Link} to={routes.PATH_CABALLOS}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Divider />
            {form}
            <Snackbar
                open={createCuidadoIsLoading || delCuidadoIsLoading}
                message={messages.FORM_EDIT_CABALLO_CARE_LOADING}
                action={<CircularProgress size={22} />}
            />
        </Container>
    );
};

export default FormularioEdicionCaballos;

import { useEffect } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import {
    Container,
    Stack,
    Typography,
    Button,
    Snackbar,
    CircularProgress,
} from "@mui/material";

import "./MenuCaballos.css";
import { useUsuario } from "../../context";
import { messages } from "../../assets/messages";
import { routes } from "../../routes";
import { caballosApi, apiConstants } from "../../api";
import { CaballosList } from "../../components";

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

/**
 * Componente de la pagina del Menu de gestion de caballos
 */
const MenuCaballos = () => {
    const queryClient = useQueryClient();
    const usuario = useUsuario();
    const navigate = useNavigate();

    // Interacciones con API ---------------------------------------------
    const {
        isLoading: caballosIsLoading,
        isError: caballosIsError,
        error: caballosError,
        data: caballos,
        isSuccess: caballosIsSuccess,
        fetchNextPage: getNextCaballosPage,
        hasNextPage: caballosHasNextPage,
        isFetchingNextPage: caballosIsFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: apiConstants.CABALLOS_CACHE,
        queryFn: ({ pageParam = 1 }) =>
            caballosApi.getCaballos(usuario.token, pageParam),
        getNextPageParam: (lastPage, allPages) =>
            // Si la ultima pagina tuvo resultados agrega una pagina mas
            lastPage.data?.length ? allPages.length + 1 : undefined,
    });

    useEffect(() => {
        if (caballosIsError) {
            navigate(
                `${routes.PATH_ERROR}/${
                    caballosError.response ? caballos.response.status : "500"
                }`
            );
        }
    }, [caballos, caballosError, caballosIsError, navigate]);

    const {
        mutate: deleteCaballo,
        isError: delCaballoIsError,
        error: delCaballoError,
        isLoading: delCaballoIsLoading,
    } = useMutation(
        ([token, idCaballo]) => caballosApi.deleteCaballo(token, idCaballo),
        {
            onSuccess: () =>
                queryClient.invalidateQueries(apiConstants.CABALLOS_CACHE),
        }
    );

    useEffect(() => {
        if (delCaballoIsError) {
            navigate(
                `${routes.PATH_ERROR}/${
                    delCaballoError.resposne
                        ? delCaballoError.response.status
                        : "500"
                }`
            );
        }
    }, [delCaballoError, delCaballoIsError, navigate]);

    // Manejadores de eventos ---------------------------------------------
    const onDeleteCaballo = (idCaballo) =>
        deleteCaballo([usuario.token, idCaballo]);

    // Renderizaciones ----------------------------------------------------
    return (
        <Container sx={containerStyles}>
            <Stack direction="row" sx={headerStyles} component="header">
                <Typography variant="h2">
                    {messages.MENU_CABALLOS_TITULO}
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to={routes.PATH_CREATE_CABALLOS}
                    color="secondary"
                >
                    {messages.MENU_CABALLOS_AGREGAR}
                </Button>
            </Stack>
            <CaballosList
                caballosPages={caballos?.pages}
                hasNextPage={caballosHasNextPage}
                isSuccess={caballosIsSuccess}
                isLoading={caballosIsLoading}
                isLoadingNextPage={caballosIsFetchingNextPage}
                onClickNextPage={getNextCaballosPage}
                onDeleteCaballo={onDeleteCaballo}
                deleteIsLoading={delCaballoIsLoading}
            />
            <Snackbar
                open={delCaballoIsLoading}
                message={messages.MENU_CABALLOS_DEL_LOADING}
                action={<CircularProgress size={22} />}
            />
        </Container>
    );
};

export default MenuCaballos;

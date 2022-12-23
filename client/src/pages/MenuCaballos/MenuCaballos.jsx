import { useEffect } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { Container, Stack, Typography, Button } from "@mui/material";

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
    flex: 1,
    height: "100vh",
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
        (idCaballo) => caballosApi.deleteCaballo(usuario.token, idCaballo),
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

    // Renderizaciones ----------------------------------------------------
    return (
        <Container component="main" sx={containerStyles}>
            <Stack direction="row" sx={headerStyles} component="header">
                <Typography variant="h2">
                    {messages.MENU_CABALLOS_TITLE}
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to={routes.PATH_CREATE_CABALLOS}
                    color="secondary"
                >
                    {messages.MENU_CABALLOS_REGISTER_NEW}
                </Button>
            </Stack>
            <CaballosList
                caballosPages={caballos?.pages}
                hasNextPage={caballosHasNextPage}
                isSuccess={caballosIsSuccess}
                isLoading={caballosIsLoading}
                isLoadingNextPage={caballosIsFetchingNextPage}
                onClickNextPage={getNextCaballosPage}
                onDeleteCaballo={deleteCaballo}
                deleteIsLoading={delCaballoIsLoading}
            />
        </Container>
    );
};

export default MenuCaballos;

import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
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
    flexDirection: "column"
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
            />
        </Container>
    );
};

export default MenuCaballos;

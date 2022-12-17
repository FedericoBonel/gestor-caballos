import {
    Container,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    CircularProgress,
    Typography,
} from "@mui/material";

import CaballoExcerpt from "../CaballoExcerpt/CaballoExcerpt";
import { messages } from "../../assets/messages";

const spinnerContainerStyles = {
    display: "flex",
    justifyContent: "center",
    py: 2,
};

const tableStyles = {
    borderCollapse: "separate",
    borderSpacing: "0 16px",
    th: { borderTop: 1, borderColor: "grey.400" },
};

/**
 * Componente del listado de caballos
 */
const CaballosList = ({
    caballosPages,
    hasNextPage,
    isLoading,
    isLoadingNextPage,
    isSuccess,
    onClickNextPage,
}) => {
    // Renderizaciones -------------------------------------------
    let table;
    if (isSuccess) {
        const rows = caballosPages.map((page) =>
            page.data.map((caballo) => <CaballoExcerpt caballo={caballo} />)
        );

        table = (
            <TableContainer>
                <Table sx={tableStyles} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                {messages.LISTA_CABALLOS_NAME}
                            </TableCell>
                            <TableCell align="center">
                                {messages.LISTA_CABALLOS_SEX}
                            </TableCell>
                            <TableCell align="center">
                                {messages.LISTA_CABALLOS_HEIGHT}
                            </TableCell>
                            <TableCell align="left">
                                {messages.LISTA_CABALLOS_FUR_COLOR}
                            </TableCell>
                            <TableCell align="right">
                                {messages.LISTA_CABALLOS_BIRTHDATE}
                            </TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{rows}</TableBody>
                </Table>
            </TableContainer>
        );
    } else if (isLoading) {
        table = (
            <Container sx={spinnerContainerStyles}>
                <CircularProgress />
            </Container>
        );
    }

    const buttonLoadMore = !isLoading && (
        <Container sx={spinnerContainerStyles}>
            {hasNextPage ? (
                // Si hay mas caballos, verifica si esta cargando o no
                <Button
                    onClick={onClickNextPage}
                    disabled={!hasNextPage || isLoadingNextPage}
                >
                    {isLoadingNextPage ? (
                        <CircularProgress size={16} />
                    ) : (
                        messages.LISTA_CABALLOS_LOAD_MORE
                    )}
                </Button>
            ) : (
                // Si no hay mas caballos, mostra un mensaje al usuario
                <Typography variant="subtitle2">
                    {messages.LISTA_CABALLOS_NO_MORE}
                </Typography>
            )}
        </Container>
    );

    return (
        <>
            {table}
            {buttonLoadMore}
        </>
    );
};

export default CaballosList;

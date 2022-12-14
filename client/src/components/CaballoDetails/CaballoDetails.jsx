import {
    Container,
    Typography,
    Stack,
    IconButton,
    Divider,
    List,
    ListItem,
    Box,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

import { routes } from "../../routes";
import { messages } from "../../assets/messages";

const containerStyles = {
    pt: 4,
    pb: 1,
    display: "flex",
    flexDirection: "column",
    flex: 1,
};

const headerStyles = {
    py: 2,
    display: "flex",
    justifyContent: "space-between",
};

const dataStyles = {
    p: 2,
    flex: 1,
    overflowY: "auto",
    gap: 4,
    "&::-webkit-scrollbar": { display: "none" },
    maxWidth: "100%",
};

const upperDataStyles = {
    gap: "inherit",
};

const columnDataLeft = { gap: 4, display: "flex", flex: 1, maxWidth: "50%" };

const columnDataRight = { gap: 4, display: "flex", flex: 1, maxWidth: "50%" };

const extraCaresListStyles = {
    border: 1,
    borderColor: "grey.400",
    bgcolor: "listItemBg.main",
    borderRadius: 1,
    maxWidth: "100%",
};

const cuidadoExtraStyles = { whiteSpace: "pre-wrap" };

/**
 * Componente que muestra los detalles de un caballo
 */
const CaballoDetails = ({ caballo }) => {
    // Renderizaciones -----------------------------------------------------------
    const id = (
        <Stack>
            <Typography variant="caption">
                {messages.DETAIL_CABALLO_ID}
            </Typography>
            <Typography variant="body">{caballo.identificacion}</Typography>
        </Stack>
    );

    const furColor = (
        <Stack>
            <Typography variant="caption">
                {messages.DETAIL_CABALLO_FUR_COLOR}
            </Typography>
            <Typography variant="body">{caballo.colorPelo}</Typography>
        </Stack>
    );

    const sex = (
        <Stack>
            <Typography variant="caption">
                {messages.DETAIL_CABALLO_SEX}
            </Typography>
            <Typography variant="body">
                {caballo.sexo === "m"
                    ? messages.DETAIL_CABALLO_SEX_M
                    : messages.DETAIL_CABALLO_SEX_F}
            </Typography>
        </Stack>
    );

    const space = (
        <Stack>
            <Typography variant="caption">
                {messages.DETAIL_CABALLO_SPACE}
            </Typography>
            <Typography variant="body">
                {caballo.espacio.nombre} - {caballo.espacio.tipo}
            </Typography>
        </Stack>
    );

    const birthDate = (
        <Stack>
            <Typography variant="caption">
                {messages.DETAIL_CABALLO_BIRTHDATE}
            </Typography>
            <Typography variant="body">
                {new Date(caballo.fechaNacimiento).toLocaleDateString("es-AR")}
            </Typography>
        </Stack>
    );

    const height = (
        <Stack>
            <Typography variant="caption">
                {messages.DETAIL_CABALLO_HEIGHT}
            </Typography>
            <Typography variant="body">{caballo.alturaMetros}</Typography>
        </Stack>
    );

    const owner = (
        <Stack>
            <Typography variant="caption">
                {messages.DETAIL_CABALLO_OWNER}
            </Typography>
            <Typography variant="body">
                {caballo.dueno.nombres} {caballo.dueno.apellidos}
            </Typography>
        </Stack>
    );

    const extraCares = caballo.cuidadosExtra &&
        Boolean(caballo.cuidadosExtra.length) && (
            <Stack>
                <Typography variant="caption">
                    {messages.DETAIL_CABALLO_EXTRA_CARES}
                </Typography>
                <Stack sx={extraCaresListStyles}>
                    <List>
                        {caballo.cuidadosExtra.map((cuidado, index) => {
                            return (
                                <Box key={cuidado.id}>
                                    <ListItem
                                        key={cuidado.id}
                                        sx={cuidadoExtraStyles}
                                    >
                                        {cuidado.descripcion}
                                    </ListItem>
                                    {index !==
                                        caballo.cuidadosExtra.length - 1 && (
                                        <Divider />
                                    )}
                                </Box>
                            );
                        })}
                    </List>
                </Stack>
            </Stack>
        );

    return (
        <Container sx={containerStyles} component="main">
            {/* Encabezado */}
            <Stack direction="row" component="header" sx={headerStyles}>
                <Stack direction="row" gap={1}>
                    <Typography variant="h2">{caballo.nombre}</Typography>
                    <IconButton
                        aria-label={messages.LISTA_CABALLOS_EDIT}
                        component={Link}
                        to={`${routes.PATH_UPDATE_CABALLOS}/${caballo.id}`}
                    >
                        <EditOutlinedIcon />
                    </IconButton>
                </Stack>
                <IconButton component={Link} to={routes.PATH_CABALLOS}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Divider />
            <Stack sx={dataStyles}>
                <Stack sx={upperDataStyles} direction="row">
                    <Stack sx={columnDataLeft}>
                        {/* Identificacion */}
                        {id}
                        {/* Color de Pelo */}
                        {furColor}
                        {/* Sexo */}
                        {sex}
                        {/* Espacio */}
                        {space}
                    </Stack>
                    <Stack sx={columnDataRight}>
                        {/* Fecha de nacimiento */}
                        {birthDate}
                        {/* Altura */}
                        {height}
                        {/* Due??o */}
                        {owner}
                    </Stack>
                </Stack>
                {/* Cuidados extra */}
                {extraCares}
            </Stack>
        </Container>
    );
};

export default CaballoDetails;

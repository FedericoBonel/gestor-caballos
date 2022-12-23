import {
    TableRow,
    TableCell,
    IconButton,
    Link as MuiLink,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";

import { messages } from "../../assets/messages";
import { routes } from "../../routes";

const listItemStyles = { bgcolor: "listItemBg.main", td: { border: "none" } };

const listItemLeftCellStyles = {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
};

const listItemRightCellStyles = {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
};

/**
 * Componente de un item de un caballo singular de la lista de caballos
 */
const CaballoExcerpt = ({ caballo, onDelete, delIsLoading }) => {
    // Renderizaciones ---------------------------------------------------------
    return (
        <TableRow sx={listItemStyles}>
            {/* Nombre */}
            <TableCell align="left" sx={listItemLeftCellStyles}>
                <MuiLink
                    underline="hover"
                    component={Link}
                    to={`${routes.PATH_CABALLOS}/${caballo.id}`}
                >
                    {caballo.nombre}
                </MuiLink>
            </TableCell>
            {/* Sexo */}
            <TableCell align="center">{caballo.sexo}</TableCell>
            {/* Altura */}
            <TableCell align="center">{caballo.alturaMetros}</TableCell>
            {/* Color de Pelo */}
            <TableCell align="left">{caballo.colorPelo}</TableCell>
            {/* Fecha de Nacimiento */}
            <TableCell align="right">
                {new Date(caballo.fechaNacimiento).toLocaleDateString("es-AR")}
            </TableCell>
            {/* Botones de accion */}
            <TableCell align="right" sx={listItemRightCellStyles}>
                <IconButton
                    aria-label={messages.LISTA_CABALLOS_DELETE}
                    onClick={() => onDelete(caballo.id)}
                    disabled={delIsLoading}
                >
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
                <IconButton
                    aria-label={messages.LISTA_CABALLOS_EDIT}
                    component={Link}
                    to={`${routes.PATH_UPDATE_CABALLOS}/${caballo.id}`}
                >
                    <EditOutlinedIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default CaballoExcerpt;

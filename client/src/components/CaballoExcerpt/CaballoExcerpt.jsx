import { TableRow, TableCell, IconButton } from "@mui/material";
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
const CaballoExcerpt = ({ caballo }) => {
    // Renderizaciones ---------------------------------------------------------
    return (
        <TableRow key={caballo.id} sx={listItemStyles}>
            <TableCell align="left" sx={listItemLeftCellStyles}>
                {caballo.nombre}
            </TableCell>
            <TableCell align="center">{caballo.sexo}</TableCell>
            <TableCell align="center">{caballo.alturaMetros}</TableCell>
            <TableCell align="left">{caballo.colorPelo}</TableCell>
            <TableCell align="right">
                {new Date(caballo.fechaNacimiento).toLocaleDateString("es-AR")}
            </TableCell>
            <TableCell align="right" sx={listItemRightCellStyles}>
                <IconButton aria-label={messages.LISTA_CABALLOS_BORRAR}>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>
                <IconButton
                    aria-label={messages.LISTA_CABALLOS_EDITAR}
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
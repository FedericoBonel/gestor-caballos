import { useState } from "react";
import {
    TableRow,
    TableCell,
    IconButton,
    Link as MuiLink,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";

import { messages } from "../../assets/messages";
import { routes } from "../../routes";

const listItemStyles = {
    bgcolor: "listItemBg.main",
    td: { border: "none" },
    maxWidth: "100%",
};

const listItemLeftCellStyles = {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
};

const listItemRightCellStyles = {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
};

const dialogContextTextStyles = { whiteSpace: "pre-wrap" };

/**
 * Componente de un item de un caballo singular de la lista de caballos
 */
const CaballoExcerpt = ({ caballo, onDelete, delIsLoading }) => {
    // Estados -----------------------------------------------------------------
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    // Manejadores de eventos
    const onConfirm = () => {
        onDelete(caballo.id);
        setShowDeleteForm(false);
    };

    const confimationDialog = (
        <Dialog open={showDeleteForm} onClose={() => setShowDeleteForm(false)}>
            <DialogTitle>{messages.FORM_DELETE_HORSE_TITLE}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={dialogContextTextStyles}>
                    {messages.FORM_DELETE_HORSE_QUESTION}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={() => setShowDeleteForm(false)}>
                    {messages.FORM_DELETE_HORSE_CANCEL}
                </Button>
                <Button onClick={onConfirm} autoFocus>
                    {messages.FORM_DELETE_HORSE_OK}
                </Button>
            </DialogActions>
        </Dialog>
    );

    // Renderizaciones ---------------------------------------------------------
    return (
        <>
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
                    {new Date(caballo.fechaNacimiento).toLocaleDateString(
                        "es-AR"
                    )}
                </TableCell>
                {/* Botones de accion */}
                <TableCell align="right" sx={listItemRightCellStyles}>
                    <IconButton
                        aria-label={messages.LISTA_CABALLOS_DELETE}
                        onClick={() => setShowDeleteForm(true)}
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
            {confimationDialog}
        </>
    );
};

export default CaballoExcerpt;

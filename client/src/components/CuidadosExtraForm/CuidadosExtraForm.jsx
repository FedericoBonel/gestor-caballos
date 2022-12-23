import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    IconButton,
    TextField,
    FormControl,
    ListItem,
} from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import { constants } from "../../utils/validation";
import { cuidadosExtraValidators } from "../../utils/validation";
import { messages } from "../../assets/messages";

const cuidadosExtraStyles = { gap: 2, py: 2 };

const cuidadoExtraInputStyles = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
};

const cuidadoExtraStyles = {
    borderTop: 1,
    borderBottom: 1,
    borderColor: "grey.600",
    p: 2,
    flex: 1,
    whiteSpace: "pre-wrap",
    maxWidth: "100%",
    wordBreak: "break-word",
};

/**
 * Componente del formulario de cuidados extra
 * @note onAddCuidado se ejecuta cuando un cuidado es agregado a la lista, al mismo se le pasa un objeto con el schema {descripcion:String}
 * @note onRemoveCuidado se ejecuta cuando un cuidado es removido de la lista, al mismo se le pasan los atributos del cuidado siendo removido y su índice
 * @note isAddLoading y isDeleteLoading son opcionales para marcar el estado de carga al ejecutar onAddCuidado y onRemoveCuidado
 * @note cuidados es la lista de cuidados a ser mostrados en el formulario, debe ser proveida desde el llamador
 */
const CuidadosExtraForm = ({
    openModal,
    onClose,
    onAddCuidado,
    onRemoveCuidado,
    cuidadosExtra,
    isAddLoading,
    isDeleteLoading,
}) => {
    const [cuidadoExtra, setCuidadoExtra] = useState("");
    const [cuidadoExtraTouched, setCuidadoExtraTouched] = useState(false);

    // Validacion --------------------------------------------------------------------
    const isCuidadoExtraValid =
        cuidadosExtraValidators.isDesc(cuidadoExtra) || !cuidadoExtra.length;

    const shouldShowWarning = !isCuidadoExtraValid && cuidadoExtraTouched;

    // Manejadores de eventos --------------------------------------------------------
    const onChangeCuidadoExtra = (e) => setCuidadoExtra(e.target.value);

    const onBlur = () => setCuidadoExtraTouched(true);

    const maxCuidadosAlcanzados =
        cuidadosExtra.length === constants.CABALLOS_MAX_NUMER_EXTRA_CARES;

    const onAddCuidadoExtra = () => {
        if (cuidadoExtra.length && !maxCuidadosAlcanzados) {
            setCuidadoExtra("");
            onAddCuidado({ descripcion: cuidadoExtra });
        }
    };

    // Renderizaciones ----------------------------------------------------------------
    return (
        <Dialog fullWidth maxWidth="lg" open={openModal} onClose={onClose}>
            <DialogTitle variant="h6">
                {messages.FORM_EXTRA_CARES_TITLE}
            </DialogTitle>
            <DialogContent>
                <Stack sx={cuidadosExtraStyles}>
                    <FormControl sx={cuidadoExtraInputStyles}>
                        <TextField
                            onChange={onChangeCuidadoExtra}
                            value={cuidadoExtra}
                            disabled={maxCuidadosAlcanzados}
                            fullWidth
                            multiline
                            maxRows={4}
                            label={messages.FORM_EDIT_CABALLO_EXTRA_CARE}
                            onBlur={onBlur}
                            name="cuidadoExtra"
                            error={shouldShowWarning}
                            helperText={
                                messages.FORM_EXTRA_CARES_DESCRIPTION_HINT
                            }
                        />
                        <IconButton
                            size="large"
                            aria-label={messages.FORM_EXTRA_CARES_ADD_CARE}
                            onClick={onAddCuidadoExtra}
                            disabled={
                                maxCuidadosAlcanzados ||
                                !cuidadoExtra.length ||
                                !isCuidadoExtraValid ||
                                isAddLoading ||
                                isDeleteLoading
                            }
                        >
                            <AddCircle />
                        </IconButton>
                    </FormControl>
                    {cuidadosExtra.map((item, index) => (
                        <FormControl sx={cuidadoExtraInputStyles} key={index}>
                            <ListItem sx={cuidadoExtraStyles}>
                                {item.descripcion}
                            </ListItem>
                            <IconButton
                                size="large"
                                disabled={isDeleteLoading || isAddLoading}
                                aria-label={
                                    messages.FORM_EXTRA_CARES_REMOVE_CARE
                                }
                                onClick={() => onRemoveCuidado(item, index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </FormControl>
                    ))}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>
                    {messages.FORM_EXTRA_CARES_CLOSE}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CuidadosExtraForm;

import { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import {
    Stack,
    TextField,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    FormControl,
    Button,
    Box,
    MenuItem,
    Divider,
    CircularProgress,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { CuidadosExtraForm } from "../";
import { messages } from "../../assets/messages";
import { constants, caballosValidators } from "../../utils/validation";
import { routes } from "../../routes";

const fieldsStyles = {
    pt: 4,
    flex: 1,
    overflowY: "auto",
    gap: 4,
    "&::-webkit-scrollbar": { display: "none" },
};

const actionButtonsStyles = { justifyContent: "flex-end", py: 2, gap: 4 };

const formRowStyles = { gap: 2 };

const formStyles = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
};

/**
 * Componente del formulario de edicion de caballos
 */
const EditCaballoForm = ({
    duenos,
    espacios,
    submitCaballo,
    isCaballoLoading,
    caballo,
    onCreateCuidado,
    onDeleteCuidado,
    isCuidadoLoading,
}) => {
    // Estados ----------------------------------------------------------------------------
    const [form, setForm] = useState({
        identificacion: caballo.identificacion,
        nombre: caballo.nombre,
        sexo: caballo.sexo,
        fechaNacimiento: dayjs(caballo.fechaNacimiento),
        alturaMetros: caballo.alturaMetros.toString(),
        colorPelo: caballo.colorPelo,
        duenoId: caballo.dueno.id,
        espacioId: caballo.espacio.id,
        cuidadosExtra: caballo.cuidadosExtra,
    });
    const [showCuidadosDialog, setShowCuidadosDialog] = useState(false);

    const [touched, setTouched] = useState({
        identificacion: false,
        nombre: false,
        sexo: false,
        fechaNacimiento: false,
        alturaMetros: false,
        colorPelo: false,
        duenoId: false,
        espacioId: false,
    });

    // Validaciones -----------------------------------------------------------------------------
    const validateForm = (form) => ({
        identificacion: caballosValidators.isId(form.identificacion),
        nombre: caballosValidators.isName(form.nombre),
        sexo: caballosValidators.isSex(form.sexo),
        fechaNacimiento: caballosValidators.isBirthdate(form.fechaNacimiento),
        alturaMetros: caballosValidators.isHeight(form.alturaMetros),
        colorPelo: caballosValidators.isFurColor(form.colorPelo),
        duenoId: caballosValidators.isOwnerId(form.duenoId),
        espacioId: caballosValidators.isSpaceId(form.espacioId),
    });

    const isFormFieldValid = validateForm(form);

    const canSubmit =
        Object.keys(isFormFieldValid).every((key) => {
            if (key !== "cuidadosExtra") {
                return isFormFieldValid[key];
            }
            return isFormFieldValid[key].every((cuidado) => cuidado);
        }) && !isCaballoLoading;

    const shouldShowWarning = (fieldName) =>
        !isFormFieldValid[fieldName] && touched[fieldName];

    // Manejadores de eventos -------------------------------------------------------------
    const onSubmit = (e) => {
        e.preventDefault();

        submitCaballo(form);
    };

    const onBlur = (e) =>
        setTouched((prevTouched) => ({
            ...prevTouched,
            [e.target.name]: true,
        }));

    const onChange = (e) =>
        setForm((prevForm) => ({
            ...prevForm,
            [e.target.name]: e.target.value,
        }));

    const onChangeDate = (value) =>
        setForm((prevForm) => ({
            ...prevForm,
            fechaNacimiento: value,
        }));

    // Renderizaciones ---------------------------------------------------------------------
    const idAndName = (
        <Stack direction="row" sx={formRowStyles}>
            {/* Identificacion */}
            <TextField
                id="identificacion"
                name="identificacion"
                value={form.identificacion}
                label={messages.FORM_EDIT_CABALLO_ID}
                fullWidth
                required
                helperText={messages.FORM_EDIT_CABALLO_ID_HELPER}
                onChange={onChange}
                onBlur={onBlur}
                error={shouldShowWarning("identificacion")}
            />
            {/* Nombre */}
            <TextField
                id="nombre"
                name="nombre"
                value={form.nombre}
                label={messages.FORM_EDIT_CABALLO_NAME}
                fullWidth
                required
                helperText={messages.FORM_EDIT_CABALLO_NAME_HELPER}
                onChange={onChange}
                onBlur={onBlur}
                error={shouldShowWarning("nombre")}
            />
        </Stack>
    );

    const birthDateHeightAndSex = (
        <Stack direction="row" sx={formRowStyles}>
            {/* Fecha de nacimiento */}
            <DesktopDatePicker
                label={messages.FORM_EDIT_CABALLO_BIRTHDATE}
                maxDate={new Date()}
                inputFormat="DD/MM/YYYY"
                value={form.fechaNacimiento}
                onChange={onChangeDate}
                disableMaskedInput
                renderInput={({ ...params }) => (
                    <TextField
                        {...params}
                        name="fechaNacimiento"
                        onBlur={onBlur}
                        error={shouldShowWarning("fechaNacimiento")}
                    />
                )}
            />
            {/* Altura */}
            <TextField
                id="alturaMetros"
                name="alturaMetros"
                value={form.alturaMetros}
                label={messages.FORM_EDIT_CABALLO_HEIGHT}
                required
                type="number"
                inputProps={{
                    inputMode: "decimal",
                    pattern: "[0-9]+([.,][0-9]+)?",
                    step: "0.1",
                    min: constants.CABALLOS_HEIGHT_METERS_MIN_NUMBER,
                }}
                helperText={messages.FORM_EDIT_CABALLO_HEIGHT_HELPER}
                onChange={onChange}
                onBlur={onBlur}
                error={shouldShowWarning("alturaMetros")}
            />
            {/* Sexo */}
            <FormControl>
                <FormLabel required>{messages.FORM_EDIT_CABALLO_SEX}</FormLabel>
                <RadioGroup
                    name="sexo"
                    value={form.sexo}
                    onChange={onChange}
                    row
                >
                    <FormControlLabel
                        value="f"
                        control={<Radio />}
                        label={messages.FORM_EDIT_CABALLO_SEX_F}
                    />
                    <FormControlLabel
                        value="m"
                        control={<Radio />}
                        label={messages.FORM_EDIT_CABALLO_SEX_M}
                    />
                </RadioGroup>
            </FormControl>
        </Stack>
    );

    const furColor = (
        // Color de pelo
        <TextField
            id="colorPelo"
            name="colorPelo"
            value={form.colorPelo}
            label={messages.FORM_EDIT_CABALLO_FUR_COLOR}
            required
            onChange={onChange}
            onBlur={onBlur}
            error={shouldShowWarning("colorPelo")}
            helperText={messages.FORM_EDIT_CABALLO_FUR_COLOR_HELPER}
        />
    );

    const ownerAndSpace = (
        <Stack direction="row" sx={formRowStyles}>
            {/* Dueno */}
            <TextField
                id="duenoId"
                name="duenoId"
                label={messages.FORM_EDIT_CABALLO_OWNER}
                select
                fullWidth
                required
                value={form.duenoId}
                onChange={onChange}
                onBlur={onBlur}
                error={shouldShowWarning("duenoId")}
            >
                {duenos.map((dueno) => (
                    <MenuItem key={dueno.id} value={dueno.id}>
                        {dueno.nombres} {dueno.apellidos}
                    </MenuItem>
                ))}
            </TextField>
            {/* Espacio */}
            <TextField
                id="espacioId"
                name="espacioId"
                label={messages.FORM_EDIT_CABALLO_SPACE}
                select
                fullWidth
                required
                value={form.espacioId}
                onChange={onChange}
                onBlur={onBlur}
                error={shouldShowWarning("espacioId")}
            >
                {espacios.map((espacio) => (
                    <MenuItem key={espacio.id} value={espacio.id}>
                        {espacio.nombre}
                    </MenuItem>
                ))}
            </TextField>
        </Stack>
    );

    const extraCares = (
        <>
            <Button onClick={() => setShowCuidadosDialog(true)}>
                {messages.FORM_EDIT_CABALLO_SHOW_CARE}
            </Button>
            <CuidadosExtraForm
                openModal={showCuidadosDialog}
                onClose={() => setShowCuidadosDialog(false)}
                onAddCuidado={onCreateCuidado}
                onRemoveCuidado={(cuidadoExtra) =>
                    onDeleteCuidado(cuidadoExtra.id)
                }
                cuidadosExtra={caballo.cuidadosExtra}
                isAddLoading={isCuidadoLoading}
                isDeleteLoading={isCuidadoLoading}
            />
        </>
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box component="form" sx={formStyles} onSubmit={onSubmit}>
                <Stack direction="column" sx={fieldsStyles}>
                    {idAndName}
                    {birthDateHeightAndSex}
                    {furColor}
                    {ownerAndSpace}
                    {extraCares}
                </Stack>
                {/* Botones */}
                <Divider />
                <Stack direction="row" sx={actionButtonsStyles}>
                    <Button
                        variant="contained"
                        color="error"
                        component={Link}
                        to={routes.PATH_CABALLOS}
                    >
                        {messages.FORM_EDIT_CABALLO_CANCEL}
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={!canSubmit}
                    >
                        {isCaballoLoading ? (
                            <CircularProgress size={24} />
                        ) : (
                            messages.FORM_EDIT_CABALLO_REGISTER
                        )}
                    </Button>
                </Stack>
            </Box>
        </LocalizationProvider>
    );
};

export default EditCaballoForm;

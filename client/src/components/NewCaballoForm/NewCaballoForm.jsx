import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Stack,
    IconButton,
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
    ListItem,
    CircularProgress,
} from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { messages } from "../../assets/messages";
import {
    constants,
    caballosValidators,
    cuidadosExtraValidators,
} from "../../utils/validation";
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

const cuidadosExtraStyles = { gap: 2, pb: 2 };

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
};

/**
 * Componente del formulario de creacion de caballos
 */
const NewCaballoForm = ({ duenos, espacios, submitCaballo, isLoading }) => {
    // Estados ----------------------------------------------------------------------------
    const [form, setForm] = useState({
        identificacion: "",
        nombre: "",
        sexo: "",
        fechaNacimiento: "",
        alturaMetros: "",
        colorPelo: "",
        duenoId: "",
        espacioId: "",
        cuidadosExtra: [],
    });
    const [cuidadoExtra, setCuidadoExtra] = useState("");

    const [touched, setTouched] = useState({
        identificacion: false,
        nombre: false,
        sexo: false,
        fechaNacimiento: false,
        alturaMetros: false,
        colorPelo: false,
        duenoId: false,
        espacioId: false,
        cuidadoExtra: false,
    });

    // Validaciones -----------------------------------------------------------------------------
    const validateForm = (form, cuidadoExtra) => ({
        identificacion: caballosValidators.isId(form.identificacion),
        nombre: caballosValidators.isName(form.nombre),
        sexo: caballosValidators.isSex(form.sexo),
        fechaNacimiento: caballosValidators.isBirthdate(form.fechaNacimiento),
        alturaMetros: caballosValidators.isHeight(form.alturaMetros),
        colorPelo: caballosValidators.isFurColor(form.colorPelo),
        duenoId: caballosValidators.isOwnerId(form.duenoId),
        espacioId: caballosValidators.isSpaceId(form.espacioId),
        cuidadoExtra:
            cuidadosExtraValidators.isDesc(cuidadoExtra) ||
            !cuidadoExtra.length,
    });

    const isFormFieldValid = validateForm(form, cuidadoExtra);

    const canSubmit =
        Object.keys(isFormFieldValid).every((key) => {
            if (key !== "cuidadosExtra") {
                return isFormFieldValid[key];
            }
            return isFormFieldValid[key].every((cuidado) => cuidado);
        }) && !isLoading;

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
            fechaNacimiento: value.toISOString(),
        }));

    const onChangeCuidadoExtra = (e) => setCuidadoExtra(e.target.value);

    const maxCuidadosAlcanzados =
        form.cuidadosExtra.length === constants.CABALLOS_MAX_NUMER_EXTRA_CARES;

    const onAddCuidadoExtra = () => {
        if (cuidadoExtra.length && !maxCuidadosAlcanzados) {
            setForm((prevForm) => ({
                ...prevForm,
                cuidadosExtra: [...prevForm.cuidadosExtra, cuidadoExtra],
            }));
            setCuidadoExtra("");
        }
    };

    const onRemoveCuidadoExtra = (indexCuidado) => {
        setForm((prevForm) => ({
            ...prevForm,
            cuidadosExtra: prevForm.cuidadosExtra.filter(
                (cuidado, index) => index !== indexCuidado
            ),
        }));
    };

    // Renderizaciones ---------------------------------------------------------------------
    const idAndName = (
        <Stack direction="row" sx={formRowStyles}>
            {/* Identificacion */}
            <TextField
                id="identificacion"
                name="identificacion"
                value={form.identificacion}
                label={messages.FORM_NEW_CABALLO_ID}
                fullWidth
                required
                helperText={messages.FORM_NEW_CABALLO_ID_HELPER}
                onChange={onChange}
                onBlur={onBlur}
                error={shouldShowWarning("identificacion")}
            />
            {/* Nombre */}
            <TextField
                id="nombre"
                name="nombre"
                label={messages.FORM_NEW_CABALLO_NAME}
                fullWidth
                required
                helperText={messages.FORM_NEW_CABALLO_NAME_HELPER}
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
                label={messages.FORM_NEW_CABALLO_BIRTHDATE}
                maxDate={new Date()}
                inputFormat="MM/DD/YYYY"
                value={form.fechaNacimiento}
                onChange={onChangeDate}
                renderInput={(params) => (
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
                label={messages.FORM_NEW_CABALLO_HEIGHT}
                required
                type="number"
                inputProps={{
                    inputMode: "decimal",
                    pattern: "[0-9]+([.,][0-9]+)?",
                    step: "0.1",
                    min: constants.CABALLOS_HEIGHT_METERS_MIN_NUMBER,
                }}
                helperText={messages.FORM_NEW_CABALLO_HEIGHT_HELPER}
                onChange={onChange}
                onBlur={onBlur}
                error={shouldShowWarning("alturaMetros")}
            />
            {/* Sexo */}
            <FormControl>
                <FormLabel required>{messages.FORM_NEW_CABALLO_SEX}</FormLabel>
                <RadioGroup
                    name="sexo"
                    value={form.sexo}
                    onChange={onChange}
                    row
                >
                    <FormControlLabel
                        value="f"
                        control={<Radio />}
                        label={messages.FORM_NEW_CABALLO_SEX_F}
                    />
                    <FormControlLabel
                        value="m"
                        control={<Radio />}
                        label={messages.FORM_NEW_CABALLO_SEX_M}
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
            label={messages.FORM_NEW_CABALLO_FUR_COLOR}
            required
            onChange={onChange}
            onBlur={onBlur}
            error={shouldShowWarning("colorPelo")}
            helperText={messages.FORM_NEW_CABALLO_FUR_COLOR_HELPER}
        />
    );

    const ownerAndSpace = (
        <Stack direction="row" sx={formRowStyles}>
            {/* Dueno */}
            <TextField
                id="duenoId"
                name="duenoId"
                label={messages.FORM_NEW_CABALLO_OWNER}
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
                label={messages.FORM_NEW_CABALLO_SPACE}
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
        <Stack sx={cuidadosExtraStyles}>
            <FormControl sx={cuidadoExtraInputStyles}>
                <TextField
                    id="cuidadoExtra"
                    name="cuidadoExtra"
                    multiline
                    maxRows={4}
                    label={messages.FORM_NEW_CABALLO_EXTRA_CARE}
                    fullWidth
                    value={cuidadoExtra}
                    disabled={maxCuidadosAlcanzados}
                    onChange={onChangeCuidadoExtra}
                    onBlur={onBlur}
                    error={shouldShowWarning("cuidadoExtra")}
                />
                <IconButton
                    size="large"
                    aria-label={messages.FORM_NEW_CABALLO_AGREGAR_CUIDADO}
                    onClick={onAddCuidadoExtra}
                    disabled={maxCuidadosAlcanzados || !cuidadoExtra.length}
                >
                    <AddCircle />
                </IconButton>
            </FormControl>
            {form.cuidadosExtra.map((cuidadoExtra, index) => (
                <FormControl sx={cuidadoExtraInputStyles} key={index}>
                    <ListItem sx={cuidadoExtraStyles}>{cuidadoExtra}</ListItem>
                    <IconButton
                        size="large"
                        aria-label={messages.FORM_NEW_CABALLO_AGREGAR_CUIDADO}
                        onClick={() => onRemoveCuidadoExtra(index)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </FormControl>
            ))}
        </Stack>
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
                        {messages.FORM_NEW_CABALLO_CANCELAR}
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={!canSubmit}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} />
                        ) : (
                            messages.FORM_NEW_CABALLO_REGISTRAR
                        )}
                    </Button>
                </Stack>
            </Box>
        </LocalizationProvider>
    );
};

export default NewCaballoForm;

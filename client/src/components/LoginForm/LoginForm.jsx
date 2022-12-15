import { useState } from "react";
import {
    Container,
    Card,
    Typography,
    TextField,
    Button,
    Alert,
    Box,
    CircularProgress,
} from "@mui/material";

import "./LoginForm.css";
import { messages } from "../../assets/messages";

// Estilos ------------------------------------------------------------

const containerStyles = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    bgcolor: "navbar.main",
    mx: 0,
    my: 0
};

const cardStyles = {
    width: 400,
    mx: "auto",
    p: 3,
    textAlign: "center",
};

const subtitleStyles = {
    fontWeight: 700,
};

const alertStyles = {
    my: 2,
};

const buttonStyles = {
    mt: 2,
};

const spinnerStyles = {
    mx: 2,
};

/**
 * Componente del formulario de autenticacion de la aplicacion
 */
const LoginForm = ({ submitCredentials, showWrongCredentials, isLoading }) => {
    // Estados ----------------------------------------------------------------
    const [loginForm, setLoginForm] = useState({ username: "", password: "" });

    // Event handlers ---------------------------------------------------------
    const handleChange = (event) => {
        setLoginForm((prevForm) => ({
            ...prevForm,
            [event.target.name]: event.target.value,
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();

        submitCredentials(loginForm);
    };

    // Renderizaciones ---------------------------------------------------------
    const canSubmit = !(
        loginForm.username === "" ||
        loginForm.password === "" ||
        isLoading
    );
    return (
        <Container component="main" disableGutters maxWidth="xl" sx={containerStyles}>
            <Card sx={cardStyles} variant="outlined">
                <form onSubmit={onSubmit}>
                    <Typography variant="h1" gutterBottom>
                        {messages.APP_NAME}
                    </Typography>
                    <Typography sx={subtitleStyles} variant="h2" gutterBottom>
                        {messages.MENU_INGRESAR_TITULO}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {messages.MENU_INGRESAR_INFO}
                    </Typography>
                    {/* Nombre de usuario */}
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label={messages.MENU_INGRESAR_USERNAME}
                        margin="normal"
                        value={loginForm.username}
                        onChange={handleChange}
                    />
                    {/* Clave */}
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        label={messages.MENU_INGRESAR_PASSWORD}
                        margin="normal"
                        value={loginForm.password}
                        onChange={handleChange}
                    />
                    {/* Boton de acceso */}
                    <Box>
                        <Button
                            sx={buttonStyles}
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={!canSubmit}
                            color="secondary"
                        >
                            {isLoading ? (
                                <CircularProgress
                                    size={24}
                                    sx={spinnerStyles}
                                />
                            ) : (
                                messages.MENU_INGRESAR_LOGIN
                            )}
                        </Button>
                    </Box>
                </form>
                {showWrongCredentials && (
                    <Alert severity="error" sx={alertStyles}>
                        {messages.MENU_INGRESAR_CREDENCIALES_INVALIDAS}
                    </Alert>
                )}
            </Card>
        </Container>
    );
};

export default LoginForm;

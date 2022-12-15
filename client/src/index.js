import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider, createTheme } from "@mui/material";

import "./index.css";
import App from "./App";
import { UsuarioProvider } from "./context";

// Configuracion de react query, incializa una nueva instancia y la provee a la aplicacion
const queryClient = new QueryClient();

// Configuracion del tema de estilos de material UI
const theme = createTheme({
    palette: {
        secondary: { main: "#FEAF00" },
    },
    typography: {
        h1: {
            fontSize: "3rem",
        },
        h2: {
            fontSize: "2rem",
        },
        subtitle2: {
            color: "#6C6C6C",
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <UsuarioProvider>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
                <ReactQueryDevtools />
            </UsuarioProvider>
        </QueryClientProvider>
    </React.StrictMode>
);

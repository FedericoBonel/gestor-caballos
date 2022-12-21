import { Link, useMatch } from "react-router-dom";
import {
    Stack,
    List,
    ListItem,
    Button,
    Typography,
    Container,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import "./Navbar.css";
import { useUsuarioUpdate, useUsuario } from "../../context";
import { routes } from "../../routes";
import { messages } from "../../assets/messages";

const navbarStyles = {
    position: "sticky",
    width: 250,
    left: "0",
    top: "0",
    bottom: "0",
    bgcolor: "navbar.main",
    justifyContent: "space-between",
    height: "100vh",
    py: 2,
    zIndex: 10
};

const listStyles = {
    width: "100%",
};

const iconStyle = {
    justifyContent: "center",
};

const userStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

/**
 * Componente de la barra de navegacion de la aplicacion
 */
const Navbar = () => {
    const usuario = useUsuario();
    const { invalidateUser } = useUsuarioUpdate();
    // Obten el menu seleccionado desde la URL
    const match = useMatch("/:menu/*");
    const selectedMenu = match?.params.menu;

    const links = [
        {
            route: routes.PATH_DASHBOARD,
            selected: selectedMenu === routes.DASHBOARD,
            text: messages.NAVBAR_HOME,
            icon: <HomeOutlinedIcon />,
        },
        {
            route: routes.PATH_CABALLOS,
            selected: selectedMenu === routes.CABALLOS,
            text: messages.NAVBAR_CABALLOS,
        },
    ];

    // Renderizaciones ------------------------------------------------------------------
    const renderedLinks = links.map((link, index) => (
        <ListItem key={index}>
            <Button
                variant={link.selected ? "contained" : "text"}
                component={Link}
                to={link.route}
                color={link.selected ? "secondary" : "primary"}
                startIcon={link.icon}
                fullWidth
            >
                {link.text}
            </Button>
        </ListItem>
    ));

    return (
        <Stack component="nav" sx={navbarStyles}>
            <List sx={listStyles}>
                <ListItem sx={iconStyle}>
                    <Typography variant="icon">{messages.APP_NAME}</Typography>
                </ListItem>
                {renderedLinks}
            </List>
            <Container sx={userStyle} maxWidth="xs">
                <Typography variant="h6">{usuario.username}</Typography>
                <Button
                    onClick={invalidateUser}
                    endIcon={<LogoutIcon />}
                >
                    {messages.NAVBAR_LOGOUT}
                </Button>
            </Container>
        </Stack>
    );
};

export default Navbar;

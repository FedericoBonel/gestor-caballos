import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Container,
    Stack,
    Typography,
    Divider,
    Link as MuiLink,
    Box,
} from "@mui/material";

import "./Error.css";
import { useUsuarioUpdate } from "../../context";
import { routes } from "../../routes";
import errorImg from "../../assets/images/error.png";
import { messages } from "../../assets/messages";

const containerStyles = {
    pt: 4,
    pb: 1,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    height: "100vh",
};

const dividerStyles = { my: 2 };

/**
 * Componente de la pagina de error
 */
const Error = () => {
    const { errorCode } = useParams();
    const { invalidateUser } = useUsuarioUpdate();

    useEffect(() => {
        if (errorCode === "401") {
            invalidateUser();
        }
    }, [errorCode, invalidateUser]);

    let errorMsg;

    switch (errorCode) {
        case "400":
            errorMsg = (
                <>
                    <Typography variant="body" whiteSpace="pre-wrap">
                        {messages.ERROR_400}
                        {"\n"}
                    </Typography>
                    <MuiLink to={routes.PATH_HOME} component={Link}>
                        {messages.HOME_LINK}
                    </MuiLink>
                </>
            );
            break;

        case "401":
            errorMsg = (
                <>
                    <Typography variant="body" whiteSpace="pre-wrap">
                        {messages.ERROR_401}{" "}
                        <MuiLink to={routes.PATH_HOME} component={Link}>
                            {messages.ERROR_LOGIN_LINK}
                        </MuiLink>
                    </Typography>
                </>
            );
            break;
        case "404":
            errorMsg = (
                <>
                    <Typography variant="body" whiteSpace="pre-wrap">
                        {messages.ERROR_404}
                        {"\n"}
                    </Typography>
                    <MuiLink to={routes.PATH_HOME} component={Link}>
                        {messages.HOME_LINK}
                    </MuiLink>
                </>
            );
            break;
        case "500":
            errorMsg = (
                <>
                    <Typography variant="body" whiteSpace="pre-wrap">
                        {messages.ERROR_500}
                        {"\n"}
                    </Typography>
                    <MuiLink to={routes.PATH_HOME} component={Link}>
                        {messages.HOME_LINK}
                    </MuiLink>
                </>
            );
            break;
        default:
            errorMsg = (
                <>
                    <Typography variant="body" whiteSpace="pre-wrap">
                        {messages.ERROR_UNKNOWN}
                        {"\n"}
                    </Typography>
                    <MuiLink to={routes.PATH_HOME} component={Link}>
                        {messages.HOME_LINK}
                    </MuiLink>
                </>
            );
            break;
    }

    const imgContainerStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 4,
    };

    return (
        <Container sx={containerStyles}>
            <Stack direction="column">
                <Box sx={imgContainerStyles}>
                    <img src={errorImg} alt={messages.ERROR} className={"error_img"} />
                </Box>
                <Typography variant="h2">{messages.ERROR_TITLE}</Typography>
                <Divider sx={dividerStyles} />
                {errorMsg}
            </Stack>
        </Container>
    );
};

export default Error;

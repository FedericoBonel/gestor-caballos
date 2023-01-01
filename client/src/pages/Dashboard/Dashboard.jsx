import { Link } from "react-router-dom";
import { Container, Card, CardContent, Typography } from "@mui/material";

import "./Dashboard.css";
import horseIcon from "../../assets/images/horse.png";
import { messages } from "../../assets/messages";
import { routes } from "../../routes";

const containerStyles = {
    pt: 4,
    pb: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    height: "100vh",
};

const cardStyles = {
    width: "300px",
    height: "fit-content",
    backgroundColor: "primary.light",
    textDecoration: "none",
};
/**
 * Componente de la pagina del dashboard
 */
const Dashboard = () => {
    return (
        <Container sx={containerStyles}>
            <Card
                variant="outlined"
                sx={cardStyles}
                component={Link}
                to={routes.PATH_CABALLOS}
            >
                <CardContent>
                    <img
                        className="card_horse_img"
                        src={horseIcon}
                        alt={messages.DASHBOARD_HORSE}
                    />
                    <Typography variant="h5">
                        {messages.MENU_CABALLOS_TITLE}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Dashboard;

import React from "react";
import { Typography, Button, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          backgroundColor: "#1e1e1e", // Fondo oscuro
          borderRadius: 2,
          p: 4,
          color: "#fff", // Texto blanco
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          404 - Página no encontrada
        </Typography>
        <Typography
          variant="h5"
          sx={{ mb: 4, textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Lo sentimos, la página que buscas no existe.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/"
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
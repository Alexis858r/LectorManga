import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const PageDash = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f0f2f5", // Fondo suave
        color: "#333", // Texto oscuro
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          mt: 4,
          mb: 2,
        }}
      >
        Panel de Control
      </Typography>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          color: "#555",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        Bienvenido al panel de control del Lector de Manga.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        to="/dash/1"
        sx={{
          borderRadius: 2,
          textTransform: "none",
          fontWeight: "bold",
          px: 4,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Ver detalles
      </Button>
    </Box>
  );
};

export default PageDash;
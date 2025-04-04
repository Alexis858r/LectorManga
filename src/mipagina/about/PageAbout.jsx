import React from "react";
import { Container, Typography, Avatar, Box, Divider, IconButton, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Email, GitHub } from "@mui/icons-material";

export default function PageAbout() {
  return (
    <Box sx={{ backgroundColor: "#f0f2f5", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "#fff", // Fondo claro
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Sección de perfil */}
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Avatar
                src="https://via.placeholder.com/150"
                alt="Lector de Manga Logo"
                sx={{
                  width: 150,
                  height: 150,
                  boxShadow: 5,
                  border: "4px solid #1976d2",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Sobre el Lector de Manga
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 2,
                  color: "#555",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Una aplicación moderna y fácil de usar para leer manga.
              </Typography>
              <Typography
                sx={{
                  color: "#555",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Este lector está diseñado para ofrecer una experiencia de usuario excepcional. Con una interfaz intuitiva y características avanzadas, puedes disfrutar de tus mangas favoritos en cualquier momento y lugar.
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, backgroundColor: "#ddd" }} />

          {/* Sección de contacto */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#333",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              mb: 4,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Contáctanos
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <IconButton href="mailto:soporte@lectordemanga.com" color="primary">
                <Email fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton href="https://github.com/lectordemanga" target="_blank" color="inherit">
                <GitHub fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
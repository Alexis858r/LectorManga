import React, { useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Estilos reutilizables
const textFieldStyles = {
  backgroundColor: "#fff",
  borderRadius: 2,
  fontFamily: "'Poppins', sans-serif",
};

const buttonStyles = {
  borderRadius: 2,
  textTransform: "none",
  fontWeight: "bold",
  px: 4,
  fontFamily: "'Poppins', sans-serif",
};

const PageContact = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado con éxito!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: "#fff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Título del formulario */}
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{
            fontWeight: "bold",
            color: "#333",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Contáctanos
        </Typography>

        {/* Formulario de contacto */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Campo de nombre */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldStyles}
              />
            </Grid>

            {/* Campo de correo electrónico */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldStyles}
              />
            </Grid>

            {/* Campo de mensaje */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Mensaje"
                name="message"
                value={formData.message}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldStyles}
              />
            </Grid>

            {/* Botón de envío */}
            <Grid item xs={12} align="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={buttonStyles}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PageContact;
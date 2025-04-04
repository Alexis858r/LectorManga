import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

const PageHome = () => {
  const [mangas, setMangas] = useState([]); // Estado para almacenar los mangas
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [popularMangas, setPopularMangas] = useState([]); // Estado para los mangas populares

  // Función para obtener la información de la portada de un manga
  const fetchCoverArt = async (mangaId) => {
    try {
      const response = await fetch(`https://api.mangadex.org/cover?manga[]=${mangaId}`);
      if (!response.ok) {
        throw new Error("Error al obtener la portada del manga");
      }
      const data = await response.json();
      return data.data[0]; // Retorna la primera portada encontrada
    } catch (error) {
      console.error("Error al obtener la portada del manga:", error);
      return null;
    }
  };

  // Función para buscar mangas en la API de MangaDex
  const searchMangas = async () => {
    try {
      const response = await fetch(
        `https://api.mangadex.org/manga?title=${searchTerm}&availableTranslatedLanguage[]=es&limit=10`
      );
      if (!response.ok) {
        throw new Error("Error al buscar mangas");
      }
      const data = await response.json();
      const mangasWithCovers = await Promise.all(
        data.data.map(async (manga) => {
          const coverArt = await fetchCoverArt(manga.id);
          return { ...manga, coverArt };
        })
      );
      setMangas(mangasWithCovers); // Actualiza el estado con los mangas y sus portadas
    } catch (error) {
      console.error("Error al buscar mangas:", error);
    }
  };

  // Función para obtener los mangas populares desde la API de MangaDex
  const fetchPopularMangas = async () => {
    try {
      const response = await fetch(
        "https://api.mangadex.org/manga?limit=10&order[rating]=desc&availableTranslatedLanguage[]=es"
      );
      if (!response.ok) {
        throw new Error("Error al obtener los mangas populares");
      }
      const data = await response.json();
      const mangasWithCovers = await Promise.all(
        data.data.map(async (manga) => {
          const coverArt = await fetchCoverArt(manga.id);
          return { ...manga, coverArt };
        })
      );
      setPopularMangas(mangasWithCovers); // Actualiza el estado con los mangas populares y sus portadas
    } catch (error) {
      console.error("Error al obtener los mangas populares:", error);
    }
  };

  // Llama a la función fetchPopularMangas cuando el componente se monta
  useEffect(() => {
    fetchPopularMangas();
  }, []);

  // Función para obtener la URL de la portada del manga
  function getCoverUrl(mangaId, coverArt) {
    if (!mangaId || !coverArt?.attributes?.fileName) {
      return "https://via.placeholder.com/300"; // Imagen de respaldo
    }
    return `https://uploads.mangadex.org/covers/${mangaId}/${coverArt.attributes.fileName}`;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        backgroundColor: "#f0f2f5", // Fondo suave
      }}
    >
      {/* Título principal */}
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
          mt: 4,
          mb: 2,
          fontFamily: "'Poppins', sans-serif",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        Bienvenido al Lector de Manga
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: "#555",
          textAlign: "center",
          mb: 4,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Explora nuestra colección de mangas.
      </Typography>

      {/* Barra de búsqueda con botón */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 6,
          maxWidth: 600,
          width: "100%",
        }}
      >
        <TextField
          fullWidth
          label="Buscar mangas"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            fontFamily: "'Poppins', sans-serif",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={searchMangas}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            px: 4,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Buscar
        </Button>
      </Box>

      {/* Lista de mangas filtrados */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
          mt: 6,
          mb: 4,
          fontFamily: "'Poppins', sans-serif",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        Resultados de búsqueda
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {mangas.map((manga) => {
          const coverArt = manga.coverArt;
          const title = manga.attributes.title.en || manga.attributes.title.es || "Manga sin título";
          const description = manga.attributes.description?.en || manga.attributes.description?.es || "Sin descripción";
          return (
            <Grid item key={manga.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={getCoverUrl(manga.id, coverArt)}
                  alt={title}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      color: "#333",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      flexGrow: 1,
                      color: "#555",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {description.length > 100
                      ? `${description.substring(0, 100)}...`
                      : description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/dash/${manga.id}`}
                    sx={{
                      width: "100%",
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: "bold",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Sección de mangas populares */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
          mt: 6,
          mb: 4,
          fontFamily: "'Poppins', sans-serif",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        Mangas Populares
      </Typography>
      <Grid container spacing={4}>
        {popularMangas.map((manga) => {
          const coverArt = manga.coverArt;
          const title = manga.attributes.title.en || manga.attributes.title.es || "Manga sin título";
          const description = manga.attributes.description?.en || manga.attributes.description?.es || "Sin descripción";
          return (
            <Grid item key={manga.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={getCoverUrl(manga.id, coverArt)}
                  alt={title}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      color: "#333",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      flexGrow: 1,
                      color: "#555",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {description.length > 100
                      ? `${description.substring(0, 100)}...`
                      : description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/dash/${manga.id}`}
                    sx={{
                      width: "100%",
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: "bold",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Ver detalles
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PageHome;
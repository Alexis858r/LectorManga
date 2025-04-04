import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";



const DetallesDash = () => {
  const { id } = useParams(); // Obtén el ID del manga desde la URL
  const [manga, setManga] = useState(null); // Estado para almacenar los detalles del manga
  const [chapters, setChapters] = useState([]); // Estado para almacenar los capítulos del manga
  const [selectedChapter, setSelectedChapter] = useState(""); // Estado para el capítulo seleccionado

  // Función para obtener la información de la portada de un manga
  const fetchCoverArt = async (mangaId) => {
    try {
      const response = await fetch(`/api/cover?manga[]=${mangaId}`);
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

  // Función para obtener los detalles del manga desde la API de MangaDex
  const fetchMangaDetails = async () => {
    try {
      const response = await fetch(`/api/manga/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los detalles del manga");
      }
      const data = await response.json();
      const coverArt = await fetchCoverArt(data.data.id);
      setManga({ ...data.data, coverArt }); // Actualiza el estado con los detalles del manga y su portada
    } catch (error) {
      console.error("Error al obtener los detalles del manga:", error);
    }
  };

  // Función para obtener los capítulos del manga desde la API de MangaDex
  const fetchChapters = async () => {
    try {
      const response = await fetch(
        `/api/manga/${id}/feed?order[chapter]=asc&translatedLanguage[]=es`
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener los capítulos del manga");
      }
      const data = await response.json();
      setChapters(data.data); // Actualiza el estado con los capítulos del manga
    } catch (error) {
      console.error("Error al obtener los capítulos del manga:", error);
    }
  };

  // Llama a las funciones fetchMangaDetails y fetchChapters cuando el componente se monta
  useEffect(() => {
    fetchMangaDetails();
    fetchChapters();
  }, [id]);

  // Función para obtener la URL de la portada del manga
  const getCoverUrl = (mangaId, coverArt) => {
    if (!mangaId || !coverArt?.attributes?.fileName) {
      return "https://via.placeholder.com/400"; // Imagen de respaldo
    }
    return `https://uploads.mangadex.org/covers/${mangaId}/${coverArt.attributes.fileName}`;
  };

  if (!manga) {
    return <Typography>Cargando...</Typography>;
  }

  // Obtener el título en español o en inglés
  const title = manga.attributes.title.en || manga.attributes.title.es || "Manga sin título";

  // Obtener la descripción en español o en inglés
  const description = manga.attributes.description?.en || manga.attributes.description?.es || "Sin descripción";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={getCoverUrl(manga.id, manga.coverArt)}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Autor:{" "}
            {manga.relationships.find((rel) => rel.type === "author")?.attributes
              ?.name || "Desconocido"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Género:{" "}
            {manga.attributes.tags
              .map((tag) => tag.attributes.name.en || tag.attributes.name.es)
              .join(", ")}
          </Typography>

          {/* Menú desplegable para seleccionar capítulos */}
          <FormControl fullWidth sx={{ mt: 4, mb: 2 }}>
            <InputLabel id="chapter-select-label">Seleccionar capítulo</InputLabel>
            <Select
              labelId="chapter-select-label"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              label="Seleccionar capítulo"
            >
              {chapters.map((chapter) => (
                <MenuItem key={chapter.id} value={chapter.id}>
                  Capítulo {chapter.attributes.chapter}: {chapter.attributes.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Botones para leer y descargar el capítulo seleccionado */}
          {selectedChapter && (
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                href={`https://mangadex.org/chapter/${selectedChapter}`}
                target="_blank"
              >
                Leer
              </Button>
              <Button
                variant="contained"
                color="secondary"
                href={`https://mangadex.org/chapter/${selectedChapter}/download`}
                target="_blank"
              >
                Descargar
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DetallesDash;
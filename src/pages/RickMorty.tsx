import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Grid, Card, CardContent, CardMedia, Typography, TextField, Box, Chip, CircularProgress, Stack } from "@mui/material";

interface Character {
  id: number;
  name: string;
  species: string;
  gender: string;
  status: string;
  type: string;
  image: string;
}

const fetchCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  return response.json();
};

export const RickMorty = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["rickmorty"],
    queryFn: fetchCharacters,
  });

  const [search, setSearch] = useState("");

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  if (isError) return <h2>Error fetching posts </h2>;

  const filteredChars: Character[] = (data?.results || []).filter((personaje: Character) =>
    personaje.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h4" gutterBottom>Rick and Morty API</Typography>
      
      <TextField 
        label="Search Characters..." 
        fullWidth 
        sx={{ mb: 4 }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />

      <Grid container spacing={4}>
        {filteredChars.map((pj) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={pj.id} sx={{ width: { xs: '100%', sm: '100%', md: '31%' }}}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: 400, boxShadow: 3 }}>
              <CardMedia
                component="img"
                sx={{ height: 250, width: '100%', objectFit: 'cover' }}
                image={pj.image}
                alt={pj.name}
              />

              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 500 }}>
                  {pj.name}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {pj.species} - {pj.gender}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip
                    label={pj.status}
                    color={
                      pj.status === 'Alive' ? 'success' : pj.status === 'Dead' ? 'error' : 'default'
                    }
                    size="small"
                  />
                  <Chip label={`Type: ${pj.type || 'Standard'}`} variant="outlined" size="small" />
                </Stack>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useQuery } from '@tanstack/react-query';
import { 
  TextField, Grid, Card, CardMedia, CardContent, Typography, 
  Box, Pagination, CircularProgress, Alert 
} from '@mui/material';

interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  image: string;
}

interface ApiResponse {
  info: { pages: number };
  results: Character[];
}

const fetchCharacters = async ({ queryKey }: any): Promise<ApiResponse> => {
  const [_, page, name] = queryKey; 
  const { data } = await axios.get(`https://rickandmortyapi.com/api/character`, {
    params: {
      page: page,
      name: name
    }
  });
  return data;
};

export const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const { data, isLoading, isError, error } = useQuery<ApiResponse, any>({
    queryKey: ['characters', page, search],
    queryFn: fetchCharacters,
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Buscador de Personajes</Typography>
      
      <TextField 
        label="Search Charcaters..." 
        variant="outlined" 
        fullWidth 
        sx={{ mb: 3 }}
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>
      ) : isError ? (
        <Alert severity="warning">
           {error?.response?.status === 404 ? "Not found charcaters" : "Error fetching data"}
        </Alert>
      ) : data ? (
        <>
          <Grid container spacing={2}>
            {data.results.map((pj) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={pj.id}>
                <Card>
                  <CardMedia component="img" height="200" image={pj.image} />
                  <CardContent>
                    <Typography variant="h6">{pj.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Specie: {pj.species} <br />
                      Status: {pj.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
            <Pagination 
              count={data.info.pages} 
              page={page} 
              onChange={(_, value) => setPage(value)} 
              color="primary" 
              size="large"
            />
          </Box>
        </>
      ) : null}
    </Box>
  );
};
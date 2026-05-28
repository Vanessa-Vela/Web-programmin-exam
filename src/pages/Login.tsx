import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography, Stack, Box } from '@mui/material';

export const Login = () => {
  const [creds, setCreds] = useState({ user: '', pass: '' });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (creds.user && creds.pass) {
      localStorage.setItem('admin', '123'); 
      navigate('/rickmorty'); 
    } else {
      alert("Write user and password")
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, width: 300 }} elevation={3}>
        <Typography variant="h5" align="center" gutterBottom>Iniciar Sesión</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField 
              label="User" 
              value={creds.user}
              onChange={(e) => setCreds({...creds, user: e.target.value})} 
            />
            <TextField 
              label="Password" 
              type="password"
              value={creds.pass}
              onChange={(e) => setCreds({...creds, pass: e.target.value})} 
            />
            <Button type="submit" variant="contained" fullWidth>Login</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};
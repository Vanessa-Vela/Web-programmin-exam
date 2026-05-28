import { useMemo, createContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Button, Container, IconButton, Box } from '@mui/material';
import type { PaletteMode } from '@mui/material';
import { Brightness4 as Brightness4Icon } from '@mui/icons-material';


import { useLocalStorage } from './hooks/useLocalStorage';
import { SearchPage } from './pages/SearchPage';
import { Login } from './pages/Login';

interface ColorModeContextType {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({ toggleColorMode: () => {} });

const Navbar = ({ toggleTheme }: { toggleTheme: () => void }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography> My Exam </Typography>

      <Box sx={{ flexGrow: 10, display: 'flex', justifyContent: 'center', gap: 3 }}>
        <Button color='inherit' component={Link} to="/login">
          Login
        </Button>
        <Button color='inherit' component={Link} to="/rickmorty">
          Rick and Morty
        </Button>
      </Box>

      <Box sx={{ flexGrow: 0.5 }} />

      <IconButton color="inherit" onClick={toggleTheme}>
        <Brightness4Icon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

function App() {
  const [mode, setMode] = useLocalStorage<PaletteMode>('themeMode', 'light');

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode((prev: PaletteMode) => (prev === 'light' ? 'dark' : 'light')),
  }), [setMode]);

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar toggleTheme={colorMode.toggleColorMode} />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/rickmorty' element={<SearchPage />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
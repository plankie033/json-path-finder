import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box, Link, Paper } from '@mui/material';
import JsonPathFinder from './components/JsonPathFinder';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#2D3748',
      dark: '#1A202C',
      light: '#4A5568',
    },
    secondary: {
      main: '#38B2AC',
      dark: '#2C7A7B',
      light: '#4FD1C5',
    },
    background: {
      default: '#F7FAFC',
      paper: '#EDF2F7',
    },
    text: {
      primary: '#1A202C',
      secondary: '#4A5568',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.8,
    },
    body2: {
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            JSON Path Finder
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Extract specific data from JSON objects using path expressions
          </Typography>
        </Box>
        
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <JsonPathFinder />
        </Paper>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Christian Lankman. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <Link href="https://github.com/plankie033" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
            {' • '}
            <Link href="https://christianlankman.com" target="_blank" rel="noopener noreferrer">
              Website
            </Link>
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

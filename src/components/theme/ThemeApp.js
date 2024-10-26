import React from 'react';
import App from '../../App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';
import CssBaseline from '@mui/material/CssBaseline';


const ThemedApp = () => {
  const themeMode = useSelector(selectTheme);
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

export default ThemedApp;
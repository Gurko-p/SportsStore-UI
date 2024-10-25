import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ProgressLoader({ loading }) {
  return (
    <Box
      sx={{
        display: loading ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 9999,
      }}
    >
      <CircularProgress size={ 100 } />
    </Box>
  );
}
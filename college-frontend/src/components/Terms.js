import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import Navbar from './Navbar';

const Terms = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
            Terms of Service
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            These are the Terms of Service for CollegePredictor.
          </Typography>
          <Typography variant="body1">
            [Add your full terms of service here]
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default Terms;
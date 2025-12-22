import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import Navbar from './Navbar';

const Privacy = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
            Privacy Policy
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This is the Privacy Policy for CollegePredictor. We are committed to protecting your privacy.
          </Typography>
          <Typography variant="body1">
            [Add your full privacy policy here]
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default Privacy;
import React from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
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

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            By using CollegePredictor, you agree to these Terms of Service. Please read them carefully before using the website.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            2. Use of Service
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            CollegePredictor provides an AI-powered college prediction tool for engineering aspirants. You may use the service for personal, non-commercial purposes only.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            3. Account Registration
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            If you create an account, you are responsible for providing accurate information and maintaining the security of your password.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            4. Content and Accuracy
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Predictions are provided for informational purposes only. CollegePredictor does not guarantee admission results or the accuracy of any outcome.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            5. Prohibited Conduct
          </Typography>
          <List sx={{ mb: 3 }}>
            <ListItem disableGutters>
              <ListItemText primary="• Do not misuse the platform or attempt to access restricted areas." />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText primary="• Do not use this service for fraudulent or illegal activities." />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText primary="• Respect other users and do not share inappropriate material." />
            </ListItem>
          </List>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            6. Termination
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            We reserve the right to suspend or terminate access to the service for users who violate these terms.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            7. Contact
          </Typography>
          <Typography variant="body1">
            For questions about these Terms of Service, please use the Contact page on CollegePredictor.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default Terms;
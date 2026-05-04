import React from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
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

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            1. Introduction
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            CollegePredictor is committed to protecting your personal information while using our website. This Privacy Policy explains how we collect, use, and secure your data.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            2. Information We Collect
          </Typography>
          <List sx={{ mb: 3 }}>
            <ListItem disableGutters>
              <ListItemText primary="• Personal information such as name, email, and phone number provided during registration." />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText primary="• Academic and exam data you enter for college predictions." />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText primary="• Usage data including pages visited and prediction actions performed." />
            </ListItem>
          </List>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            3. How We Use Your Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            We use collected information to provide and improve the prediction service, personalize your experience, and respond to your support inquiries.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            4. Data Security
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            We strive to protect your information with reasonable administrative and technical safeguards. However, no online system is entirely immune to security risks.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            5. Your Rights
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            You may request access to your information, correct inaccuracies, or ask for your account data to be deleted. Contact us via the Contact page to make such a request.
          </Typography>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            6. Contact Us
          </Typography>
          <Typography variant="body1">
            If you have questions about this Privacy Policy, please reach out through the Contact page on CollegePredictor.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default Privacy;
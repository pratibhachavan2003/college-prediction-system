import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import Navbar from './Navbar';
import InfoIcon from '@mui/icons-material/Info';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const About = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: 'calc(100vh - 64px)', py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 4,
              color: '#1a1a1a',
            }}
          >
            About CollegePredictor
          </Typography>

          <Paper elevation={2} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#667eea' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              CollegePredictor is dedicated to helping students make informed decisions about their engineering education.
              We combine advanced algorithms with comprehensive data to provide accurate college predictions based on
              exam scores, preferences, and historical trends.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Founded by engineering aspirants, we understand the challenges students face in choosing the right college.
              Our platform aims to simplify this process and ensure every student finds their dream engineering college.
            </Typography>
          </Paper>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 4,
              color: '#1a1a1a',
            }}
          >
            What Sets Us Apart
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <AnalyticsIcon sx={{ fontSize: 60, color: '#667eea', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Data-Driven Predictions
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Our predictions are based on years of historical cutoff data and advanced statistical models,
                    ensuring high accuracy rates.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <EngineeringIcon sx={{ fontSize: 60, color: '#764ba2', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Engineering Focus
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Specializing in engineering colleges across India, we provide detailed insights into
                    branches, placements, and career prospects.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <InfoIcon sx={{ fontSize: 60, color: '#f093fb', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Comprehensive Database
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Access information about 1000+ engineering colleges with updated cutoffs,
                    fees, placements, and infrastructure details.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Paper elevation={2} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#667eea' }}>
              Our Story
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Started by a group of JEE aspirants who faced the challenges of college selection,
              CollegePredictor was born out of the need for a reliable, data-driven approach to
              engineering college admissions. We believe that every student deserves access to
              accurate information and personalized guidance in their educational journey.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default About;
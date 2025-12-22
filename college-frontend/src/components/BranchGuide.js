import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import Navbar from './Navbar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ComputerIcon from '@mui/icons-material/Computer';
import BuildIcon from '@mui/icons-material/Build';
import ScienceIcon from '@mui/icons-material/Science';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import BiotechIcon from '@mui/icons-material/Biotech';

const BranchGuide = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const branches = [
    {
      name: 'Computer Science Engineering (CSE)',
      icon: ComputerIcon,
      color: '#667eea',
      description: 'Focuses on software development, algorithms, data structures, and computer systems.',
      career: 'Software Engineer, Data Scientist, System Analyst',
      salary: '₹6-15 LPA',
      future: 'High demand in AI, ML, cybersecurity, and software development.',
    },
    {
      name: 'Information Technology (IT)',
      icon: ComputerIcon,
      color: '#764ba2',
      description: 'Covers networking, databases, web development, and information systems.',
      career: 'IT Consultant, Network Administrator, Web Developer',
      salary: '₹5-12 LPA',
      future: 'Growing in cloud computing, IoT, and digital transformation.',
    },
    {
      name: 'Mechanical Engineering',
      icon: BuildIcon,
      color: '#f093fb',
      description: 'Deals with design, manufacturing, and maintenance of mechanical systems.',
      career: 'Mechanical Engineer, Design Engineer, Project Manager',
      salary: '₹4-10 LPA',
      future: 'Essential in automotive, aerospace, and manufacturing industries.',
    },
    {
      name: 'Civil Engineering',
      icon: EngineeringIcon,
      color: '#4facfe',
      description: 'Involves construction, infrastructure, and environmental engineering.',
      career: 'Civil Engineer, Structural Engineer, Project Manager',
      salary: '₹4-9 LPA',
      future: 'Critical for infrastructure development and smart cities.',
    },
    {
      name: 'Electrical Engineering',
      icon: ElectricBoltIcon,
      color: '#00f2fe',
      description: 'Covers power systems, electronics, and electrical machines.',
      career: 'Electrical Engineer, Power Engineer, Control Systems Engineer',
      salary: '₹4-11 LPA',
      future: 'Key in renewable energy, automation, and electronics.',
    },
    {
      name: 'Electronics & Communication Engineering (ECE)',
      icon: ElectricBoltIcon,
      color: '#43e97b',
      description: 'Focuses on electronic devices, communication systems, and signal processing.',
      career: 'Electronics Engineer, Communication Engineer, Embedded Systems Engineer',
      salary: '₹4-12 LPA',
      future: 'Growing in telecommunications, IoT, and semiconductor industry.',
    },
    {
      name: 'Chemical Engineering',
      icon: ScienceIcon,
      color: '#38f9d7',
      description: 'Involves chemical processes, materials, and industrial chemistry.',
      career: 'Chemical Engineer, Process Engineer, R&D Scientist',
      salary: '₹5-10 LPA',
      future: 'Important in pharmaceuticals, petrochemicals, and materials science.',
    },
    {
      name: 'Biotechnology',
      icon: BiotechIcon,
      color: '#fa709a',
      description: 'Combines biology and technology for medical and industrial applications.',
      career: 'Biotechnologist, Research Scientist, Pharma Engineer',
      salary: '₹4-8 LPA',
      future: 'Expanding in healthcare, agriculture, and bioengineering.',
    },
    {
      name: 'Aerospace Engineering',
      icon: EngineeringIcon,
      color: '#a8edea',
      description: 'Deals with aircraft, spacecraft, and atmospheric systems.',
      career: 'Aerospace Engineer, Aviation Engineer, Defense Engineer',
      salary: '₹6-14 LPA',
      future: 'Growing in space technology and defense sectors.',
    },
  ];

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
            Engineering Branch Guide
          </Typography>

          <Paper elevation={2} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#667eea' }}>
              Choose Your Engineering Path
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Engineering offers diverse career opportunities across various specializations.
              Each branch has its unique focus areas, career prospects, and future scope.
              Use this guide to understand different engineering branches and make an informed decision.
            </Typography>
          </Paper>

          <Grid container spacing={3}>
            {branches.map((branch, index) => {
              const IconComponent = branch.icon;
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <IconComponent sx={{ fontSize: 50, color: branch.color, mb: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {branch.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 60 }}>
                        {branch.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Chip label={`Avg Salary: ${branch.salary}`} size="small" sx={{ mb: 1 }} />
                      </Box>
                      <Accordion
                        expanded={expanded === `panel${index}`}
                        onChange={handleChange(`panel${index}`)}
                        sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            Learn More
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Career Options:</strong> {branch.career}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Future Scope:</strong> {branch.future}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Paper elevation={2} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#667eea' }}>
              Making the Right Choice
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
              When choosing an engineering branch, consider your interests, strengths, and career goals.
              Research job prospects, salary ranges, and industry trends. Many engineers also pursue
              higher studies or certifications to specialize further in their chosen field.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Remember, your branch choice doesn't limit your career options. Many engineers work
              across disciplines, and continuous learning is key to success in the engineering field.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default BranchGuide;
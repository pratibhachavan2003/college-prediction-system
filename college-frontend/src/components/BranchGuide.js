import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  LinearProgress,
  Rating,
} from '@mui/material';
import Navbar from './Navbar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ComputerIcon from '@mui/icons-material/Computer';
import BuildIcon from '@mui/icons-material/Build';
import ScienceIcon from '@mui/icons-material/Science';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';

const BranchGuide = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (branch) => {
    setSelectedBranch(branch);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const branches = [
    {
      name: 'Computer Science Engineering (CSE)',
      icon: ComputerIcon,
      color: '#667eea',
      lightColor: '#667eea20',
      description: 'Software development and digital innovation',
      salary: '₹6-15 LPA',
      demand: 95,
      rating: 5,
      careers: ['Software Engineer', 'Data Scientist', 'Full Stack Developer', 'AI/ML Engineer'],
      skills: ['Programming', 'Database Design', 'Web Development', 'Problem Solving'],
      future: 'High demand in AI, ML, cybersecurity, and software development. Fastest growing field with highest salaries.',
      overview: 'CSE focuses on software development, algorithms, data structures, artificial intelligence, and computer systems. It is the most sought-after branch with excellent growth prospects.',
    },
    {
      name: 'Mechanical Engineering',
      icon: BuildIcon,
      color: '#f093fb',
      lightColor: '#f09fb20',
      description: 'Design and manufacturing systems',
      salary: '₹4-10 LPA',
      demand: 75,
      rating: 4,
      careers: ['Mechanical Engineer', 'Design Engineer', 'Manufacturing Engineer', 'Project Manager'],
      skills: ['CAD Design', 'Thermodynamics', '3D Modeling', 'Manufacturing'],
      future: 'Essential in automotive, aerospace, and manufacturing industries with steady growth.',
      overview: 'Mechanical Engineering deals with design, manufacturing, and maintenance of mechanical systems. It provides diverse opportunities in various industrial sectors.',
    },
    {
      name: 'Civil Engineering',
      icon: EngineeringIcon,
      color: '#4facfe',
      lightColor: '#4facfe20',
      description: 'Infrastructure and construction',
      salary: '₹4-9 LPA',
      demand: 70,
      rating: 4,
      careers: ['Civil Engineer', 'Structural Engineer', 'Project Manager', 'Construction Manager'],
      skills: ['Structural Design', 'Project Management', 'CAD', 'Construction Techniques'],
      future: 'Critical for infrastructure development, smart cities, and sustainable construction.',
      overview: 'Civil Engineering involves construction, infrastructure planning, and environmental engineering. It plays a vital role in nation building and urban development.',
    },
    {
      name: 'Electrical Engineering',
      icon: ElectricBoltIcon,
      color: '#FF8C42',
      lightColor: '#FF8C4220',
      description: 'Power systems and electronics',
      salary: '₹4-11 LPA',
      demand: 80,
      rating: 4,
      careers: ['Electrical Engineer', 'Power Systems Engineer', 'Controls Engineer', 'IoT Developer'],
      skills: ['Circuit Design', 'Power Systems', 'Automation', 'IoT'],
      future: 'Key in renewable energy, automation, and electronics with growing renewable energy sector.',
      overview: 'Electrical Engineering covers power systems, electronics, and electrical machines. It is crucial for energy production and automation industry.',
    },
    {
      name: 'Chemical Engineering',
      icon: ScienceIcon,
      color: '#9B59B6',
      lightColor: '#9B59B620',
      description: 'Chemical processes and materials',
      salary: '₹5-10 LPA',
      demand: 72,
      rating: 4,
      careers: ['Chemical Engineer', 'Process Engineer', 'R&D Scientist', 'Quality Engineer'],
      skills: ['Process Design', 'Thermodynamics', 'Safety', 'Research'],
      future: 'Important in pharmaceuticals, petrochemicals, and materials science with good growth.',
      overview: 'Chemical Engineering involves chemical processes, materials, and industrial chemistry. Significant opportunities in pharma, petroleum, and energy sectors.',
    },
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: 'calc(100vh - 64px)', py: 8 }}>
        <Container maxWidth="lg">
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#1a1a1a',
                fontSize: { xs: '1.8rem', md: '2.5rem' },
              }}
            >
              🎓 Engineering Branch Guide
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#666',
                fontWeight: 400,
                mb: 4,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Explore different engineering branches and find the perfect career path that matches your interests and goals
            </Typography>
          </Box>

          {/* Info Cards */}
          <Grid container spacing={3} sx={{ mb: 8, display: 'flex', flexWrap: 'nowrap' }}>
            {[
              { icon: '📚', title: 'Diverse Paths', desc: 'Choose from 5+ engineering specializations' },
              { icon: '💼', title: 'Career Ready', desc: 'Direct pathway to industry opportunities' },
              { icon: '💰', title: 'Great Salaries', desc: '₹4-15 LPA average package' },
              { icon: '🚀', title: 'Future Ready', desc: 'Growing sectors with emerging technologies' },
            ].map((item, idx) => (
              <Grid item xs={3} sm={3} md={3} key={idx} sx={{ flex: '1 1 calc(25% - 6px)', minWidth: 0 }}>
                <Paper
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 2,
                    border: '2px solid #667eea30',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                      borderColor: '#667eea',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '2rem', mb: 1 }}>{item.icon}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#1a1a1a' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Branches Grid */}
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', mb: 4, color: '#1a1a1a', textAlign: 'center' }}
          >
            Choose Your Engineering Specialization
          </Typography>

          <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {branches.slice(0, 3).map((branch, index) => {
              const IconComponent = branch.icon;
              
              return (
                <Grid 
                  item 
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: `2px solid ${branch.lightColor}`,
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                        borderColor: branch.color,
                      },
                    }}
                  >
                    {/* Card Header */}
                    <Box
                      sx={{
                        background: `linear-gradient(135deg, ${branch.color} 0%, ${branch.color}dd 100%)`,
                        p: 3,
                        color: 'white',
                        textAlign: 'center',
                      }}
                    >
                      <IconComponent sx={{ fontSize: 48, mb: 1 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.1rem' }}
                      >
                        {branch.name}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.95 }}>
                        {branch.description}
                      </Typography>
                    </Box>

                    {/* Card Content */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Salary */}
                      <Box sx={{ mb: 2.5, pb: 2.5, borderBottom: '1px solid #f0f0f0' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <WorkIcon sx={{ fontSize: 20, color: branch.color }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#666' }}>
                            Average Salary
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: '1.4rem',
                            fontWeight: 'bold',
                            color: branch.color,
                          }}
                        >
                          {branch.salary}
                        </Typography>
                      </Box>

                      {/* Demand */}
                      <Box sx={{ mb: 2.5, pb: 2.5, borderBottom: '1px solid #f0f0f0' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TrendingUpIcon sx={{ fontSize: 20, color: branch.color }} />
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#666' }}>
                              Market Demand
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: branch.color }}>
                            {branch.demand}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={branch.demand}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: `${branch.color}20`,
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: branch.color,
                            },
                          }}
                        />
                      </Box>

                      {/* Rating */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <StarIcon sx={{ fontSize: 20, color: '#FFA500' }} />
                        <Rating
                          value={branch.rating}
                          readOnly
                          size="small"
                          sx={{
                            '& .MuiRating-iconFilled': {
                              color: '#FFA500',
                            },
                          }}
                        />
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {branch.rating}.0/5
                        </Typography>
                      </Box>

                      {/* Top Skills */}
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 'bold', color: '#666', mb: 1 }}
                        >
                          Key Skills:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {branch.skills.slice(0, 3).map((skill, idx) => (
                            <Chip
                              key={idx}
                              label={skill}
                              size="small"
                              sx={{
                                backgroundColor: `${branch.color}15`,
                                color: branch.color,
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </CardContent>

                    {/* Card Actions */}
                    <CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          background: `linear-gradient(135deg, ${branch.color} 0%, ${branch.color}dd 100%)`,
                          textTransform: 'none',
                          fontWeight: 'bold',
                          borderRadius: 2,
                          py: 1.2,
                          '&:hover': {
                            transform: 'scale(1.02)',
                          },
                        }}
                        onClick={() => handleOpenDialog(branch)}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Last two branches centered */}
          <Grid container spacing={3} sx={{ justifyContent: 'center', mt: 3 }}>
            {branches.slice(3).map((branch, index) => {
              const IconComponent = branch.icon;
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: `2px solid ${branch.lightColor}`,
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                        borderColor: branch.color,
                      },
                    }}
                  >
                    {/* Card Header */}
                    <Box
                      sx={{
                        background: `linear-gradient(135deg, ${branch.color} 0%, ${branch.color}dd 100%)`,
                        p: 3,
                        color: 'white',
                        textAlign: 'center',
                      }}
                    >
                      <IconComponent sx={{ fontSize: 48, mb: 1 }} />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.1rem' }}
                      >
                        {branch.name}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.95 }}>
                        {branch.description}
                      </Typography>
                    </Box>

                    {/* Card Content */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Salary */}
                      <Box sx={{ mb: 2.5, pb: 2.5, borderBottom: '1px solid #f0f0f0' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <WorkIcon sx={{ fontSize: 20, color: branch.color }} />
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#666' }}>
                            Average Salary
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: '1.4rem',
                            fontWeight: 'bold',
                            color: branch.color,
                          }}
                        >
                          {branch.salary}
                        </Typography>
                      </Box>

                      {/* Demand */}
                      <Box sx={{ mb: 2.5, pb: 2.5, borderBottom: '1px solid #f0f0f0' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TrendingUpIcon sx={{ fontSize: 20, color: branch.color }} />
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#666' }}>
                              Market Demand
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: branch.color }}>
                            {branch.demand}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={branch.demand}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: `${branch.color}20`,
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: branch.color,
                            },
                          }}
                        />
                      </Box>

                      {/* Rating */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <StarIcon sx={{ fontSize: 20, color: '#FFA500' }} />
                        <Rating
                          value={branch.rating}
                          readOnly
                          size="small"
                          sx={{
                            '& .MuiRating-iconFilled': {
                              color: '#FFA500',
                            },
                          }}
                        />
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {branch.rating}.0/5
                        </Typography>
                      </Box>

                      {/* Top Skills */}
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 'bold', color: '#666', mb: 1 }}
                        >
                          Key Skills:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {branch.skills.slice(0, 3).map((skill, idx) => (
                            <Chip
                              key={idx}
                              label={skill}
                              size="small"
                              sx={{
                                backgroundColor: `${branch.color}15`,
                                color: branch.color,
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </CardContent>

                    {/* Card Actions */}
                    <CardActions sx={{ pt: 0, pb: 2, px: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          background: `linear-gradient(135deg, ${branch.color} 0%, ${branch.color}dd 100%)`,
                          textTransform: 'none',
                          fontWeight: 'bold',
                          borderRadius: 2,
                          py: 1.2,
                          '&:hover': {
                            transform: 'scale(1.02)',
                          },
                        }}
                        onClick={() => handleOpenDialog(branch)}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Detailed Info Dialog */}
      {selectedBranch && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }
          }}
        >
          <DialogTitle
            sx={{
              background: `linear-gradient(135deg, ${selectedBranch.color} 0%, ${selectedBranch.color}dd 100%)`,
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.3rem',
              py: 3,
            }}
          >
            {selectedBranch.name}
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Typography variant="body2" sx={{ mb: 2, color: '#666', lineHeight: 1.6 }}>
              <strong>Overview:</strong> {selectedBranch.overview}
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'bold', mb: 1, color: selectedBranch.color }}
            >
              🎯 Career Opportunities:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {selectedBranch.careers.map((career, idx) => (
                <Chip
                  key={idx}
                  label={career}
                  icon={<WorkIcon />}
                  sx={{
                    backgroundColor: `${selectedBranch.color}15`,
                    color: selectedBranch.color,
                    fontWeight: 'bold',
                  }}
                />
              ))}
            </Box>

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'bold', mb: 1, color: selectedBranch.color }}
            >
              🚀 Future Prospects:
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: '#666', lineHeight: 1.6 }}>
              {selectedBranch.future}
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'bold', mb: 1, color: selectedBranch.color }}
            >
              💡 Essential Skills:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedBranch.skills.map((skill, idx) => (
                <Chip
                  key={idx}
                  label={skill}
                  sx={{
                    backgroundColor: `${selectedBranch.color}15`,
                    color: selectedBranch.color,
                    fontWeight: 'bold',
                  }}
                />
              ))}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, gap: 1 }}>
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default BranchGuide;

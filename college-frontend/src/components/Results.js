import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Pagination,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  // Dialog,
  // DialogTitle,
  // DialogContent,
  // DialogActions,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import SchoolIcon from '@mui/icons-material/School';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PredictionResult from './PredictionResult';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const storedPredictions = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('predictions') || '[]');
    } catch {
      return [];
    }
  }, []);
  const predictions = location.state && location.state.predictions !== undefined
    ? location.state.predictions
    : storedPredictions;

  // Get student percentile from the last prediction payload
  const lastPayload = JSON.parse(localStorage.getItem('lastPredictionPayload') || '{}');
  const studentPercentile = lastPayload.mhtCetPercentile || lastPayload.cetScore || 0;

  const [page, setPage] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [expandedRow, setExpandedRow] = useState(null);
  // AI counselling dialog state removed (no longer used)
  // const [aiDialogOpen, setAiDialogOpen] = useState(false);
  // const [selectedCollege, setSelectedCollege] = useState(null);
  const pageSize = 10;

  const [myList, setMyList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('myList') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const canonicalBranch = (branch) => {
    const normalized = (branch || '').trim().toLowerCase();
    if (normalized.includes('computer science') || normalized === 'cse') return 'cse';
    if (normalized.includes('mechanical')) return 'mechanical';
    if (normalized.includes('civil')) return 'civil';
    if (normalized.includes('electrical')) return 'electrical';
    if (normalized.includes('chemical')) return 'chemical';
    return normalized;
  };

  const uniquePredictions = React.useMemo(() => {
    const map = new Map();
    (predictions || []).forEach((college) => {
      const key = `${college.name?.trim().toLowerCase() || ''}|${canonicalBranch(college.branch)}|${college.city?.trim().toLowerCase() || ''}`;
      if (!map.has(key)) {
        map.set(key, college);
      }
    });
    return Array.from(map.values());
  }, [predictions]);
  const filtered = uniquePredictions;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const hasPredictions = uniquePredictions.length > 0;

  const getGreeting = () => {
    try {
      const payload = JSON.parse(localStorage.getItem('lastPredictionPayload') || '{}');
      return payload.name || 'Student';
    } catch {
      return 'Student';
    }
  };

  const addToMyList = (college) => {
    if (!myList.find(c => c.id === college.id)) {
      setMyList([...myList, college]);
    }
  };

  const removeFromMyList = (collegeId) => {
    setMyList(myList.filter(c => c.id !== collegeId));
  };

  // handlers for optional features (buttons removed)
  // const handleCompareColleges = (college) => {
  //   navigate('/compare', { state: { college } });
  // };

  // const handleAskAI = (college) => {
  //   setSelectedCollege(college);
  //   setAiDialogOpen(true);
  // };


  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1a365d', mb: 2 }}>
              Your Predictions
            </Typography>
            <Paper elevation={0} sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.95)', 
              p: { xs: 2, md: 3 }, 
              borderRadius: 3,
              border: '1px solid rgba(102, 126, 234, 0.2)',
              mb: 4,
              backdropFilter: 'blur(10px)',
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a365d', mb: 1.5 }}>
                Hey, {getGreeting()}! 👋
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
                Based on your exam scores, here are your predicted colleges. Click on any college row to see detailed admission analysis or "Save" to add to your list.
              </Typography>
            </Paper>
          </Box>

          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)} 
            sx={{ 
              mb: 3,
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '0.95rem',
                textTransform: 'none',
                color: '#64748b',
                '&.Mui-selected': {
                  color: '#667eea',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#667eea',
                height: 3,
              },
            }}
          >
            <Tab label={`Predictions (${uniquePredictions.length})`} />
            <Tab label={`My List (${myList.length})`} />
          </Tabs>


          {/* Predictions Tab */}
          {tabValue === 0 && hasPredictions ? (
            <Box>
              <TableContainer component={Paper} sx={{ boxShadow: 1, borderRadius: 2, mb: 3, overflow: 'auto' }}>
                <Table sx={{ minWidth: 800 }}>
                  <TableHead sx={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #667eea' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: '#1a365d', width: '5%' }}>Expand</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1a365d' }}>College Name</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1a365d' }} align="center">Branch</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1a365d', width: '12%' }} align="center">Admission %</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1a365d' }} align="center">Quick Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paged.map((college, index) => {
                      const globalIndex = (page - 1) * pageSize + index;
                      const mappedResult = {
                        collegeName: college.name,
                        branch: college.branch || college.department || 'N/A',
                        probability: college.probability ?? Math.min(100, Math.max(5, Math.round((studentPercentile - (college.cutoffScore ?? 0)) + 70))),
                        studentPercentile: studentPercentile,
                        lastYearCutoff: college.cutoffScore ?? 0,
                        category: college.category || 'GENERAL',
                      };

                      const isExpanded = expandedRow === globalIndex;
                      const isSaved = myList.find(c => c.id === college.id);

                      return (
                        <React.Fragment key={globalIndex}>
                          <TableRow
                            sx={{
                              backgroundColor: isExpanded ? '#f0f4ff' : 'white',
                              '&:hover': { backgroundColor: '#f8fafc' },
                              transition: 'background-color 0.2s',
                            }}
                          >
                            <TableCell align="center">
                              <IconButton
                                size="small"
                                onClick={() => setExpandedRow(isExpanded ? null : globalIndex)}
                                sx={{
                                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.3s',
                                  color: '#667eea',
                                }}
                              >
                                <ExpandMoreIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#1a365d' }}>
                              {college.name}
                            </TableCell>
                            <TableCell align="center">
                              <Chip 
                                label={college.branch || 'N/A'} 
                                size="small" 
                                variant="outlined" 
                                sx={{ borderColor: '#667eea', color: '#667eea' }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: '1.1rem',
                                  color: mappedResult.probability >= 70 ? '#4caf50' : mappedResult.probability >= 50 ? '#ff9800' : '#f44336',
                                }}
                              >
                                {mappedResult.probability}%
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                                
                                <Button
                                  size="small"
                                  variant={isSaved ? 'outlined' : 'text'}
                                  onClick={() => isSaved ? removeFromMyList(college.id) : addToMyList(college)}
                                  sx={{
                                    color: '#667eea',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: '0.75rem',
                                    py: 0.5,
                                    px: 1.5,
                                  }}
                                >
                                  {isSaved ? 'Remove' : 'Save'}
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>

                          {/* Expanded Row */}
                          {isExpanded && (
                            <TableRow sx={{ backgroundColor: '#f0f4ff' }}>
                              <TableCell colSpan={5} sx={{ p: 0, borderBottom: '1px solid #e2e8f0' }}>
                                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                  <Box sx={{ py: 2, px: 2 }}>
                                    <PredictionResult
                                      result={mappedResult}
                                    />
                                  </Box>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Pagination 
                  count={pageCount} 
                  page={page} 
                  onChange={(e, v) => { setPage(v); setExpandedRow(null); }} 
                  color="primary" 
                />
              </Box>
            </Box>
          ) : tabValue === 0 && !hasPredictions ? (
            <Paper
              elevation={3}
              sx={{
                p: { xs: 4, md: 6 },
                mt: 2,
                textAlign: 'center',
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                border: '1px solid rgba(102, 126, 234, 0.2)',
              }}
            >
              <SchoolIcon sx={{ fontSize: 80, color: '#667eea', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1a365d' }}>
                No predictions yet
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, color: '#475569' }}>
                Complete the prediction form to see your matched colleges and get admission probability insights.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Back to Home
              </Button>
            </Paper>
          ) : null}

          {/* My List Tab */}
          {tabValue === 1 ? (
            <Box>
              {myList.length > 0 ? (
                <Box>
                  {myList.map((college, index) => (
                    <Box
                      key={college.id || index}
                      sx={{
                        mb: 2,
                        p: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: 2,
                        border: '1px solid rgba(102, 126, 234, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.12)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a365d', mb: 1 }}>
                            {college.name}
                          </Typography>
                          <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip 
                              label={college.branch || 'N/A'} 
                              size="small" 
                              sx={{ 
                                backgroundColor: '#f0f4ff',
                                color: '#667eea',
                                fontWeight: 600,
                              }} 
                            />
                            <Chip 
                              label={college.city || 'N/A'} 
                              size="small"
                              variant="outlined"
                              sx={{ 
                                borderColor: '#667eea',
                                color: '#667eea',
                              }} 
                            />
                            <Chip 
                              label={college.collegeType || 'N/A'} 
                              size="small"
                              variant="outlined"
                              sx={{ 
                                borderColor: '#764ba2',
                                color: '#764ba2',
                              }} 
                            />
                          </Box>
                        </Box>
                        <Button
                          onClick={() => removeFromMyList(college.id)}
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<RemoveIcon />}
                          sx={{
                            ml: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 1.5,
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Paper
                  elevation={0}
                  sx={{
                    p: 6,
                    textAlign: 'center',
                    borderRadius: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 60, color: '#cbd5e1', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, color: '#64748b' }}>
                    Your list is empty
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1 }}>
                    Save colleges from the Predictions tab to build your list.
                  </Typography>
                </Paper>
              )}
            </Box>
          ) : null}
        </Container>
      </Box>
    </>
  );
};

export default Results;

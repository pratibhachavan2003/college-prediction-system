import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Chip,
  Divider,
  Fade,
} from '@mui/material';
import {
  TrendingUp,
  School,
  Calculate,
  FilterList,
  CheckCircle,
  BarChart,
  CalendarMonth,
  Engineering,
} from '@mui/icons-material';
import axios from 'axios';
import Navbar from './Navbar';
import API_BASE_URL from '../config';

const CutoffAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRound, setSelectedRound] = useState('1');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [cutoffData, setCutoffData] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [branches, setBranches] = useState(['All']);
  const [studentScore, setStudentScore] = useState('');
  const [eligibilityData, setEligibilityData] = useState([]);
  const [showAllEligibility, setShowAllEligibility] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusSeverity, setStatusSeverity] = useState('info');

  // Fetch available years and statistics on component mount
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        const yearsResponse = await axios.get(`${API_BASE_URL}/api/cutoff/years`);
        if (isMounted && yearsResponse.data && yearsResponse.data.years) {
          setAvailableYears(yearsResponse.data.years);
          if (yearsResponse.data.years.length > 0) {
            setSelectedYear(yearsResponse.data.years[yearsResponse.data.years.length - 1]);
          }
        }
      } catch (err) {
        console.error('Error fetching years:', err);
      }
      
      try {
        const statsResponse = await axios.get(`${API_BASE_URL}/api/cutoff/statistics`);
        if (isMounted && statsResponse.data && statsResponse.data.statistics) {
          const stats = statsResponse.data.statistics;
          setStatistics({
            totalColleges: stats.collegesCount || 0,
            averageCutoff: stats.averageCutoff || 0,
            highestCutoff: stats.highestCutoff || 0,
            branchesAvailable: []
          });
        }
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setStatistics({
          totalColleges: 0,
          averageCutoff: 0,
          highestCutoff: 0,
          branchesAvailable: []
        });
      }
    };
    
    loadData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchCutoffData();
    }
  }, [selectedYear, selectedRound, selectedBranch]);

  const fetchCutoffData = async () => {
    try {
      setLoading(true);
      setError('');
      
      let url = `${API_BASE_URL}/api/cutoff/year/${selectedYear}/round/${selectedRound}`;
      if (selectedBranch && selectedBranch !== 'All') {
        url += `?branch=${encodeURIComponent(selectedBranch)}`;
      }
      
      const response = await axios.get(url);
      if (response.data && response.data.data) {
        const data = response.data.data;
        setCutoffData(data);
        
        if (data.length === 0) {
          setStatusSeverity('info');
          setStatusMessage('No cutoff data available for the selected filters. Try another year or round.');
          setBranches((prev) => (prev.length > 1 ? prev : ['All']));
        } else {
          setStatusMessage('');
          const uniqueBranches = [...new Set(data.map(item => item.branch))].filter(Boolean);
          if (uniqueBranches.length > 0) {
            setBranches(['All', ...uniqueBranches]);
          }
        }
      } else if (Array.isArray(response.data)) {
        setCutoffData(response.data);
        if (response.data.length === 0) {
          setBranches(['All']);
          setStatusSeverity('info');
          setStatusMessage('No cutoff data available for the selected filters.');
        } else {
          setStatusMessage('');
        }
      }
    } catch (err) {
      console.error('Error fetching cutoff data:', err);
      setError('Failed to load cutoff data');
    } finally {
      setLoading(false);
    }
  };

  const handleScoreSubmit = async () => {
    if (!studentScore || isNaN(studentScore)) {
      setError('Please enter a valid score');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setStatusMessage('');
      
      const scoreNum = parseInt(studentScore);
      const eligible = cutoffData.filter(c => (c.closingRank || c.cutoffScore) <= scoreNum);
      
      if (eligible.length === 0) {
        setEligibilityData([]);
        setStatusSeverity('info');
        setStatusMessage(`No colleges found for ${selectedBranch === 'All' ? 'selected criteria' : selectedBranch + ' branch'} with score/rank ${scoreNum}. Try selecting a different branch or check a higher score.`);
      } else {
        setEligibilityData(eligible);
        setStatusMessage('');
      }
    } catch (err) {
      console.error('Error checking eligibility:', err);
      setError('Failed to check eligibility. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: 'white',
        py: 6,
        px: 3,
        mb: 4,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h3" sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                background: 'linear-gradient(90deg, #fff 0%, #a5b4fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                📊 Cutoff Analytics & Trends
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
                Analyze college cutoff trends and check your eligibility based on your score
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  icon={<CalendarMonth sx={{ color: '#a5b4fc !important' }} />}
                  label={`Data for ${selectedYear || '2024'}`}
                  sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
                />
                <Chip 
                  icon={<CalendarMonth sx={{ color: '#a5b4fc !important' }} />}
                  label={`Round ${selectedRound}`}
                  sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
                />
                <Chip 
                  icon={<Engineering sx={{ color: '#a5b4fc !important' }} />}
                  label={selectedBranch === 'All' ? 'All Branches' : selectedBranch}
                  sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <BarChart sx={{ fontSize: 120, color: 'rgba(255,255,255,0.15)' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {error && (
          <Fade in>
            <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
          </Fade>
        )}
        {!error && statusMessage && (
          <Fade in>
            <Alert severity={statusSeverity} sx={{ mb: 3 }}>{statusMessage}</Alert>
          </Fade>
        )}

        {/* Filters Section */}
        <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <FilterList sx={{ color: '#667eea', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a1a2e' }}>
                Select Filters
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ bgcolor: 'white', px: 1 }}>Select Year</InputLabel>
                  <Select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    label="Select Year"
                    sx={{ borderRadius: 1 }}
                  >
                    {availableYears.map((year) => (
                      <MenuItem key={year} value={year}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarMonth sx={{ mr: 1, color: '#667eea', fontSize: 20 }} />
                          {year}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel sx={{ bgcolor: 'white', px: 1 }}>Select Round</InputLabel>
                  <Select
                    value={selectedRound}
                    onChange={(e) => setSelectedRound(e.target.value)}
                    label="Select Round"
                    sx={{ borderRadius: 1 }}
                  >
                    {['1', '2', '3'].map((round) => (
                      <MenuItem key={round} value={round}>
                        Round {round}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel sx={{ bgcolor: 'white', px: 1 }}>Select Branch</InputLabel>
                  <Select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    label="Select Branch"
                    sx={{ borderRadius: 1 }}
                  >
                    <MenuItem value="All">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Engineering sx={{ mr: 1, color: '#667eea', fontSize: 20 }} />
                        All Branches
                      </Box>
                    </MenuItem>
                    {branches
                      .filter(b => b !== 'All')
                      .map((branch) => (
                        <MenuItem key={branch} value={branch}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Engineering sx={{ mr: 1, color: '#667eea', fontSize: 20 }} />
                            {branch}
                          </Box>
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Eligibility Checker */}
        <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <Box sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            p: 2,
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Calculate sx={{ mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Check Your Eligibility
              </Typography>
            </Box>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  type="number"
                  label="Enter Your Score / Rank"
                  value={studentScore}
                  onChange={(e) => setStudentScore(e.target.value)}
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your CET/JEE score or rank"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleScoreSubmit}
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    py: 1.5,
                    fontWeight: 'bold',
                    borderRadius: 1,
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Check Eligibility'}
                </Button>
              </Grid>
            </Grid>

            {eligibilityData.length > 0 && (
              <Fade in>
                <Box sx={{ mt: 3 }}>
                  <Alert 
                    severity="success" 
                    sx={{ 
                      mb: 2, 
                      bgcolor: '#e8f5e9',
                      border: '1px solid #4caf50',
                    }}
                  >
                    <Typography variant="body1">
                      <strong>🎉 Congratulations!</strong> Found <strong>{eligibilityData.length}</strong> colleges where you're eligible!
                    </Typography>
                  </Alert>
                  <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
                    <Table>
                      <TableHead sx={{ backgroundColor: '#4caf50' }}>
                        <TableRow>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Branch</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Seat Type</TableCell>
                          <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Closing Rank</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(showAllEligibility ? eligibilityData : eligibilityData.slice(0, 10)).map((college, index) => (
                          <TableRow 
                            key={index} 
                            hover
                            sx={{ '&:nth-of-type(even)': { bgcolor: '#f5f5f5' } }}
                          >
                            <TableCell sx={{ fontWeight: 500 }}>{college.branch}</TableCell>
                            <TableCell>
                              <Chip 
                                label={college.category} 
                                size="small"
                                sx={{ bgcolor: '#e8eaf6', color: '#3f51b5', fontWeight: 'bold' }}
                              />
                            </TableCell>
                            <TableCell>{college.seatType}</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                              {college.closingRank || college.cutoffScore}
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', color: '#4caf50', fontWeight: 'bold' }}>
                                <CheckCircle sx={{ mr: 0.5, fontSize: 18 }} />
                                Eligible
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {eligibilityData.length > 10 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <Button
                        variant="text"
                        onClick={() => setShowAllEligibility((prev) => !prev)}
                        sx={{ textTransform: 'none', color: '#667eea' }}
                      >
                        {showAllEligibility ? 'Show Less' : `Show All ${eligibilityData.length} Results`}
                      </Button>
                    </Box>
                  )}
                </Box>
              </Fade>
            )}
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        {statistics && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ bgcolor: '#e8eaf6', borderRadius: 2, p: 1, mr: 2 }}>
                      <School sx={{ color: '#667eea', fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Total Colleges</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a1a2e' }}>
                        {statistics.totalColleges || 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ bgcolor: '#fce4ec', borderRadius: 2, p: 1, mr: 2 }}>
                      <TrendingUp sx={{ color: '#e91e63', fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Average Cutoff</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a1a2e' }}>
                        {statistics.averageCutoff ? statistics.averageCutoff.toFixed(0) : 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ bgcolor: '#e0f2f1', borderRadius: 2, p: 1, mr: 2 }}>
                      <BarChart sx={{ color: '#009688', fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Highest Cutoff</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a1a2e' }}>
                        {statistics.highestCutoff ? statistics.highestCutoff.toFixed(0) : 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Cutoff Data Table */}
        <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <Box sx={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', p: 2, color: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              📋 Cutoff Data - {selectedYear} • Round {selectedRound} {selectedBranch ? `• ${selectedBranch}` : ''}
            </Typography>
          </Box>
          <CardContent sx={{ p: 0 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress />
              </Box>
            ) : cutoffData.length > 0 ? (
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: '#1a1a2e' }}>Branch</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#1a1a2e' }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#1a1a2e' }}>Seat Type</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold', color: '#1a1a2e' }}>Closing Rank</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cutoffData.slice(0, 15).map((row, index) => (
                      <TableRow key={index} hover sx={{ '&:nth-of-type(even)': { bgcolor: '#fafafa' } }}>
                        <TableCell sx={{ fontWeight: 500 }}>{row.branch}</TableCell>
                        <TableCell>
                          <Chip label={row.category} size="small" sx={{ bgcolor: '#e8eaf6', color: '#3f51b5', fontWeight: 'bold' }} />
                        </TableCell>
                        <TableCell>{row.seatType}</TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'inline-block', bgcolor: '#667eea', color: 'white', px: 2, py: 0.5, borderRadius: 2, fontWeight: 'bold' }}>
                            {row.cutoffScore || row.closingRank}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">No cutoff data available for selected filters</Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Info Box */}
        <Paper sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2, borderLeft: '4px solid #667eea' }}>
          <Typography variant="body2" color="text.secondary">
            <strong>💡 Note:</strong> Cutoff data is based on previous years' admission rounds. 
            Actual cutoffs may vary each year based on factors like number of applicants, seat availability, and difficulty level of the exam.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default CutoffAnalytics;

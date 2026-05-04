import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Divider,
  Button,
  Box,
  LinearProgress,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  School,
  Info,
  // SmartToy, // icons removed since buttons are gone
  // Compare,
} from '@mui/icons-material';

const PredictionResult = ({
  result = {
    collegeName: 'COEP Technological University',
    branch: 'Computer Science Engineering',
    probability: 85,
    studentPercentile: 92.5,
    lastYearCutoff: 88.3,
    category: 'GENERAL',
  }
}) => {
  // Determine color based on probability
  const getProbabilityColor = (prob) => {
    if (prob >= 80) return '#4caf50';
    if (prob >= 60) return '#ff9800';
    return '#f44336';
  };

  const getProbabilityLabel = (prob) => {
    if (prob >= 80) return 'Very Likely';
    if (prob >= 60) return 'Likely';
    return 'Moderate';
  };

  const probabilityColor = getProbabilityColor(result.probability);

  return (
    <Box sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
      <Grid container spacing={2}>
        {/* Main Result Card */}
        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Header Section */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <School sx={{ fontSize: 32, color: '#667eea' }} />
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: '#1a365d',
                      fontSize: { xs: '1.8rem', md: '2.2rem' },
                    }}
                  >
                    {result.collegeName}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                  <Chip
                    label={result.branch}
                    icon={<School />}
                    sx={{
                      backgroundColor: '#667eea',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      height: 36,
                      '& .MuiChip-icon': {
                        color: 'white',
                      },
                    }}
                  />
                  <Chip
                    label={result.category}
                    variant="outlined"
                    sx={{
                      borderColor: '#764ba2',
                      color: '#764ba2',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      height: 36,
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Probability Section */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TrendingUp sx={{ color: probabilityColor, fontSize: 28 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#1a365d',
                    }}
                  >
                    Admission Probability
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={result.probability}
                      sx={{
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 6,
                          background: `linear-gradient(90deg, ${probabilityColor} 0%, ${probabilityColor}dd 100%)`,
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 140 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: probabilityColor,
                        fontSize: '1.8rem',
                      }}
                    >
                      {result.probability}%
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#64748b',
                        fontWeight: 600,
                        display: 'block',
                      }}
                    >
                      {getProbabilityLabel(result.probability)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Stats Section */}
              <Grid container spacing={1.5} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      backgroundColor: '#f0f4ff',
                      border: '1px solid #e0e7ff',
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: '#667eea',
                        fontSize: '1.5rem',
                      }}
                    >
                      {result.studentPercentile}%
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#64748b',
                        fontWeight: 600,
                      }}
                    >
                      Your Percentile
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      backgroundColor: '#f0f4ff',
                      border: '1px solid #e0e7ff',
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: '#667eea',
                        fontSize: '1.5rem',
                      }}
                    >
                      {result.lastYearCutoff}%
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#64748b',
                        fontWeight: 600,
                      }}
                    >
                      Last Year Cutoff
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      backgroundColor: '#e8f5e9',
                      border: '1px solid #c8e6c9',
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: '#2e7d32',
                        fontSize: '1.5rem',
                      }}
                    >
                      +{(result.studentPercentile - result.lastYearCutoff).toFixed(1)}%
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#2e7d32',
                        fontWeight: 600,
                      }}
                    >
                      Margin
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Explanation Section */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Info sx={{ color: '#667eea', fontSize: 24 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#1a365d',
                    }}
                  >
                    Why This Result?
                  </Typography>
                </Box>

                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#475569',
                      lineHeight: 1.8,
                      fontSize: '0.95rem',
                    }}
                  >
                    Based on your <strong>{result.studentPercentile}% percentile</strong> and
                    comparing with historical cutoff data, <strong>{result.collegeName}</strong> has
                    shown an admission probability of <strong>{result.probability}%</strong>. Your
                    score is <strong>{(result.studentPercentile - result.lastYearCutoff).toFixed(1)}%
                    above</strong> the last year's cutoff, which indicates a strong likelihood of
                    admission in the <strong>{result.branch}</strong> branch under the{' '}
                    <strong>{result.category}</strong> category.
                  </Typography>

                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e2e8f0' }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#64748b',
                        fontStyle: 'italic',
                      }}
                    >
                      💡 Note: Cutoff predictions are based on historical data and may vary based on
                      applicant pool and seat availability.
                    </Typography>
                  </Box>
                </Paper>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: { xs: 'wrap', sm: 'nowrap' }, mt: 3 }}>
                  {/* action buttons removed per user request */}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar Stats - Hidden on Mobile */}
        <Grid item xs={12} sx={{ display: { xs: 'none', lg: 'block' } }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #e2e8f0',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.95rem',
                }}
              >
                <TrendingUp />
                Summary
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 0.8,
                  }}
                >
                  <Typography variant="caption">College Rank</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    Tier 1
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 2,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    borderRadius: 1,
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 0.8,
                  }}
                >
                  <Typography variant="caption">Competition</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    High
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 2,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    borderRadius: 1,
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 0.8,
                  }}
                >
                  <Typography variant="caption">Placement</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    95%+
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 2,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    borderRadius: 1,
                  }}
                />
              </Box>

              <Box sx={{ pt: 1.5, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <Typography variant="caption" sx={{ opacity: 0.9, fontSize: '0.75rem' }}>
                  ✓ NAAC Accredited
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PredictionResult;

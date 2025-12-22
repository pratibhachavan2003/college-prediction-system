import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Pagination,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import GetAppIcon from '@mui/icons-material/GetApp';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const predictions = location.state?.predictions || (() => {
    try {
      return JSON.parse(localStorage.getItem('predictions') || '[]');
    } catch {
      return [];
    }
  })();

  const [page, setPage] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const pageSize = 9;

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

  const filtered = predictions;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const hasPredictions = predictions.length > 0;

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
      setMyList([...myList, { ...college, order: myList.length }]);
    }
  };

  const removeFromMyList = (collegeId) => {
    setMyList(myList.filter(c => c.id !== collegeId));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(myList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMyList(items);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('My College List', 20, 30);

    myList.forEach((college, index) => {
      const y = 50 + index * 20;
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${college.name}`, 20, y);
      doc.text(`   Branch: ${college.branch || 'N/A'}`, 20, y + 5);
      doc.text(`   City: ${college.city || 'N/A'}`, 20, y + 10);
      doc.text(`   Type: ${college.collegeType || 'N/A'}`, 20, y + 15);
    });

    doc.save('my_college_list.pdf');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(myList.map((college, index) => ({
      'S.No': index + 1,
      'College Name': college.name,
      'Branch': college.branch || 'N/A',
      'City': college.city || 'N/A',
      'College Type': college.collegeType || 'N/A',
      'Cutoff Score': college.cutoffScore || 'N/A',
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'My List');
    XLSX.writeFile(workbook, 'my_college_list.xlsx');
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
            College Prediction Results
          </Typography>
          <Paper elevation={0} sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 2 }}>
              Hello, {getGreeting()}!
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', mb: 3 }}>
              Based on your exam scores and preferences, here are your predicted colleges.
            </Typography>
          </Paper>
        </Box>

        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label={`Predictions (${predictions.length})`} />
          <Tab label={`My List (${myList.length})`} />
        </Tabs>

        {tabValue === 0 && (
          <>
            {hasPredictions ? (
              <>
                <Grid container spacing={2}>
                  {paged.map((college, index) => {
                    const globalIndex = (page - 1) * pageSize + index;
                    const isInList = myList.find(c => c.id === college.id);
                    return (
                      <Grid item xs={12} sm={6} md={4} key={globalIndex}>
                        <Card sx={{ height: '100%', borderRadius: 2 }}>
                          <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                              {college.name}
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                              <Chip label={college.branch || 'N/A'} size="small" sx={{ mr: 1, mb: 1 }} />
                              <Chip label={college.city || 'N/A'} size="small" sx={{ mr: 1, mb: 1 }} />
                              <Chip label={college.collegeType || 'N/A'} size="small" sx={{ mb: 1 }} />
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              Cutoff Score: {college.cutoffScore?.toFixed(1) || 'N/A'}
                            </Typography>
                            <Button
                              variant={isInList ? "outlined" : "contained"}
                              size="small"
                              onClick={() => isInList ? removeFromMyList(college.id) : addToMyList(college)}
                              startIcon={isInList ? <RemoveIcon /> : <AddIcon />}
                              fullWidth
                            >
                              {isInList ? 'Remove from List' : 'Add to My List'}
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination count={pageCount} page={page} onChange={(e, v) => setPage(v)} color="primary" />
                </Box>
              </>
            ) : (
              <Paper
                elevation={3}
                sx={{
                  p: 6,
                  mt: 2,
                  textAlign: 'center',
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                }}
              >
                <SchoolIcon sx={{ fontSize: 80, color: '#667eea', mb: 2 }} />
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  No predictions available
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Submit a prediction request to see your matched colleges here.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => navigate('/predictor')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  Start Prediction
                </Button>
              </Paper>
            )}
          </>
        )}

        {tabValue === 1 && (
          <Box>
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<GetAppIcon />}
                onClick={exportToPDF}
                disabled={myList.length === 0}
              >
                Export PDF
              </Button>
              <Button
                variant="contained"
                startIcon={<GetAppIcon />}
                onClick={exportToExcel}
                disabled={myList.length === 0}
              >
                Export Excel
              </Button>
            </Box>

            {myList.length > 0 ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="my-list">
                  {(provided) => (
                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                      {myList.map((college, index) => (
                        <Draggable key={college.id} draggableId={college.id.toString()} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              sx={{ mb: 2, borderRadius: 2 }}
                            >
                              <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Box {...provided.dragHandleProps} sx={{ mr: 2 }}>
                                    <DragIndicatorIcon />
                                  </Box>
                                  <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                      {college.name}
                                    </Typography>
                                    <Box sx={{ mt: 1 }}>
                                      <Chip label={college.branch || 'N/A'} size="small" sx={{ mr: 1 }} />
                                      <Chip label={college.city || 'N/A'} size="small" sx={{ mr: 1 }} />
                                      <Chip label={college.collegeType || 'N/A'} size="small" />
                                    </Box>
                                  </Box>
                                  <IconButton
                                    onClick={() => removeFromMyList(college.id)}
                                    color="error"
                                  >
                                    <RemoveIcon />
                                  </IconButton>
                                </Box>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  textAlign: 'center',
                  borderRadius: 2,
                  bgcolor: '#f9f9f9',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Your list is empty. Add colleges from the Predictions tab.
                </Typography>
              </Paper>
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default Results;

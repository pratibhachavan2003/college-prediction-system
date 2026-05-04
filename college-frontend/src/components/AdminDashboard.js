import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tabs,
  Tab,
  Alert,
  IconButton,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import API_BASE_URL from '../config';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [studentsPage, setStudentsPage] = useState(0);
  const [collegesPage, setCollegesPage] = useState(0);
  const itemsPerPage = 10;
  const [newCollege, setNewCollege] = useState({ name: '', city: '', cutoffScore: 0, branch: '', collegeType: '', rankingScore: 0, cutoffYear: 2024, capRound: 1 });

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchStudents();
      fetchColleges();
      fetchStatistics();
    }
  }, [user]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/students`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        setStudentsPage(0); // Reset to first page when data is refreshed
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchColleges = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/colleges`);
      if (response.ok) {
        const data = await response.json();
        setColleges(data);
        setCollegesPage(0); // Reset to first page when data is refreshed
      }
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cutoff/statistics`);
      if (response.ok) {
        const data = await response.json();
        if (data.statistics) {
          setStatistics(data.statistics);
        }
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleEditCollege = (college) => {
    setNewCollege(college);
    setOpen(true);
  };

  const handleDeleteCollege = async (collegeId) => {
    if (window.confirm('Are you sure you want to delete this college?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/colleges/${collegeId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          fetchColleges();
          setSuccessMessage('College deleted successfully!');
          setErrorMessage('');
          setTimeout(() => setSuccessMessage(''), 5000);
        } else {
          setErrorMessage('Failed to delete college');
          setSuccessMessage('');
        }
      } catch (error) {
        console.error('Error deleting college:', error);
        setErrorMessage('Network error: Unable to delete college. Please try again.');
        setSuccessMessage('');
      }
    }
  };

  const handleAddCollege = async () => {
    try {
      const isUpdate = newCollege.id;
      const method = isUpdate ? 'PUT' : 'POST';
      const endpoint = isUpdate ? `${API_BASE_URL}/api/admin/colleges/${newCollege.id}` : `${API_BASE_URL}/api/admin/colleges`;
      
      const response = await fetch(endpoint, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCollege),
      });
      if (response.ok) {
        fetchColleges();
        setOpen(false);
        setNewCollege({ name: '', city: '', cutoffScore: 0, branch: '', collegeType: '', rankingScore: 0, cutoffYear: 2024, capRound: 1 });
        setSuccessMessage(isUpdate ? 'College updated successfully!' : 'College added successfully to the database!');
        setErrorMessage('');
        setTimeout(() => setSuccessMessage(''), 5000); // Clear message after 5 seconds
      } else {
        const errorData = await response.text();
        setErrorMessage(`Failed to save college: ${errorData || response.statusText}`);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error saving college:', error);
      setErrorMessage('Network error: Unable to save college. Please try again.');
      setSuccessMessage('');
    }
  };

  if (user?.role !== 'admin') {
    return <Typography>Access Denied</Typography>;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Admin Dashboard
          </Typography>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Logout
          </Button>
        </Box>

        {/* Statistics Cards */}
        {statistics && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Colleges
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                    {statistics.collegesCount || colleges.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Available Years
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                    {statistics.yearsAvailable?.length || 0}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    {statistics.yearsAvailable ? statistics.yearsAvailable.join(', ') : 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Records
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                    {statistics.totalRecords || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Branches
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                    {statistics.branchesAvailable?.length || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorMessage('')}>
            {errorMessage}
          </Alert>
        )}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Students" />
            <Tab label="Colleges" />
          </Tabs>
        </Box>
        {tabValue === 0 && (
          <Paper sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ p: 2 }}>Registered Students ({students.length} total)</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.slice(studentsPage * itemsPerPage, (studentsPage + 1) * itemsPerPage).map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{studentsPage * itemsPerPage + index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phoneNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {students.length > itemsPerPage && (
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Button 
                  disabled={studentsPage === 0} 
                  onClick={() => setStudentsPage(studentsPage - 1)}
                >
                  Previous
                </Button>
                <Typography sx={{ alignSelf: 'center' }}>
                  Page {studentsPage + 1} of {Math.ceil(students.length / itemsPerPage)}
                </Typography>
                <Button 
                  disabled={(studentsPage + 1) * itemsPerPage >= students.length} 
                  onClick={() => setStudentsPage(studentsPage + 1)}
                >
                  Next
                </Button>
              </Box>
            )}
          </Paper>
        )}
        {tabValue === 1 && (
          <Paper sx={{ mt: 2 }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Colleges ({colleges.length} total)</Typography>
              <Button variant="contained" onClick={() => { setOpen(true); setSuccessMessage(''); setErrorMessage(''); }}>Add College</Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Cutoff Score</TableCell>
                    <TableCell>Ranking</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>CAP Round</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {colleges.slice(collegesPage * itemsPerPage, (collegesPage + 1) * itemsPerPage).map((college, index) => (
                    <TableRow key={college.id}>
                      <TableCell>{collegesPage * itemsPerPage + index + 1}</TableCell>
                      <TableCell>{college.name}</TableCell>
                      <TableCell>{college.city}</TableCell>
                      <TableCell>{college.branch}</TableCell>
                      <TableCell>{college.collegeType}</TableCell>
                      <TableCell>{college.cutoffScore}</TableCell>
                      <TableCell>{college.rankingScore}</TableCell>
                      <TableCell>{college.cutoffYear}</TableCell>
                      <TableCell>{college.capRound || 1}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEditCollege(college)}
                          title="Edit"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteCollege(college.id)}
                          title="Delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {colleges.length > itemsPerPage && (
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                <Button 
                  disabled={collegesPage === 0} 
                  onClick={() => setCollegesPage(collegesPage - 1)}
                >
                  Previous
                </Button>
                <Typography sx={{ alignSelf: 'center' }}>
                  Page {collegesPage + 1} of {Math.ceil(colleges.length / itemsPerPage)}
                </Typography>
                <Button 
                  disabled={(collegesPage + 1) * itemsPerPage >= colleges.length} 
                  onClick={() => setCollegesPage(collegesPage + 1)}
                >
                  Next
                </Button>
              </Box>
            )}
          </Paper>
        )}
      </Container>
      <Dialog open={open} onClose={() => { setOpen(false); setNewCollege({ name: '', city: '', cutoffScore: 0, branch: '', collegeType: '', rankingScore: 0, cutoffYear: 2024, capRound: 1 }); }}>
        <DialogTitle>{newCollege.id ? 'Edit College' : 'Add New College'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newCollege.name}
            onChange={(e) => setNewCollege({ ...newCollege, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="City"
            fullWidth
            value={newCollege.city}
            onChange={(e) => setNewCollege({ ...newCollege, city: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Branch</InputLabel>
            <Select
              label="Branch"
              value={newCollege.branch}
              onChange={(e) => setNewCollege({ ...newCollege, branch: e.target.value })}
            >
              <MenuItem value="">-- Select Branch --</MenuItem>
              {statistics?.branchesAvailable?.map((branch) => (
                <MenuItem key={branch} value={branch}>
                  {branch}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="College Type"
            fullWidth
            value={newCollege.collegeType}
            onChange={(e) => setNewCollege({ ...newCollege, collegeType: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Cutoff Score"
            type="number"
            fullWidth
            value={newCollege.cutoffScore}
            onChange={(e) => setNewCollege({ ...newCollege, cutoffScore: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Ranking Score"
            type="number"
            fullWidth
            value={newCollege.rankingScore}
            onChange={(e) => setNewCollege({ ...newCollege, rankingScore: parseFloat(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Cutoff Year"
            type="number"
            fullWidth
            value={newCollege.cutoffYear}
            onChange={(e) => setNewCollege({ ...newCollege, cutoffYear: parseInt(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="CAP Round"
            type="number"
            fullWidth
            value={newCollege.capRound}
            onChange={(e) => setNewCollege({ ...newCollege, capRound: parseInt(e.target.value) })}
            inputProps={{ min: 1, max: 3 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false); setNewCollege({ name: '', city: '', cutoffScore: 0, branch: '', collegeType: '', rankingScore: 0, cutoffYear: 2024, capRound: 1 }); }}>Cancel</Button>
          <Button onClick={handleAddCollege}>{newCollege.id ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminDashboard;
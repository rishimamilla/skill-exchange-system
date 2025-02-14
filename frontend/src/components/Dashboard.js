import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Grid,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Snackbar,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { Logout, Edit, Add, Search, Delete, PhotoCamera } from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [editSkill, setEditSkill] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        toast.error('Error fetching user data');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/notifications', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setNotifications(response.data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        toast.error('Error fetching notifications');
      }
    };

    fetchNotifications();
  }, []);

  const handleFindMatches = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/matches', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const matchedUsers = response.data.filter(match => {
        const hasMatchingSkillsOffered = match.skillsNeeded.some(skill => user.skillsOffered.includes(skill));
        const hasMatchingSkillsNeeded = match.skillsOffered.some(skill => user.skillsNeeded.includes(skill));
        return hasMatchingSkillsOffered || hasMatchingSkillsNeeded;
      });

      setMatches(matchedUsers);
    } catch (err) {
      console.error('Error finding matches:', err);
      setSnackbarMessage('Error finding matches');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddSkill = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/users/me/skills', {
        skillsOffered: [...user.skillsOffered, newSkill],
        skillsNeeded: user.skillsNeeded,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(response.data);
      setNewSkill('');
      setSnackbarMessage('Skill added successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error adding skill:', err);
      setSnackbarMessage('Error adding skill');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleEditSkill = (skill) => {
    setSkillToEdit(skill);
    setEditSkill(skill);
    setOpenEditDialog(true);
  };

  const handleSaveEditSkill = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedSkillsOffered = user.skillsOffered.map(skill => skill === skillToEdit ? editSkill : skill);
      const response = await axios.put(`http://localhost:5000/api/users/me/skills`, {
        skillsOffered: updatedSkillsOffered,
        skillsNeeded: user.skillsNeeded,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(response.data);
      setOpenEditDialog(false);
      setSnackbarMessage('Skill updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error updating skill:', err);
      setSnackbarMessage('Error updating skill');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteSkill = async (skill) => {
    try {
      const token = localStorage.getItem('token');
      const updatedSkillsOffered = user.skillsOffered.filter(s => s !== skill);
      const response = await axios.put(`http://localhost:5000/api/users/me/skills`, {
        skillsOffered: updatedSkillsOffered,
        skillsNeeded: user.skillsNeeded,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(response.data);
      setSnackbarMessage('Skill deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Error deleting skill:', err);
      setSnackbarMessage('Error deleting skill');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box textAlign="center" mb={4}>
          <Avatar
            alt="Profile"
            src={user.profilePic || '/path/to/default-profile-pic.jpg'}
            sx={{ width: 96, height: 96, mx: 'auto', mb: 2 }}
          />
          <Typography variant="h4">{user.username}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{user.email}</Typography>
          <IconButton color="primary" component="label">
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Skills Offered</Typography>
            <List>
              {user.skillsOffered ? user.skillsOffered.map((skill, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="body1">{skill}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditSkill(skill)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSkill(skill)}>
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              )) : 'None'}
            </List>
            <Typography variant="h6" gutterBottom mt={4}>Skills Needed</Typography>
            <List>
              {user.skillsNeeded ? user.skillsNeeded.map((skill, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="body1">{skill}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditSkill(skill)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSkill(skill)}>
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              )) : 'None'}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Add a new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAddSkill}
              sx={{ mt: 2 }}
            >
              Add Skill
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<Search />}
              onClick={handleFindMatches}
              sx={{ mt: 2 }}
            >
              Find Matches
            </Button>
            {matches.length > 0 ? (
              <List>
                {matches.map((match) => (
                  <ListItem key={match._id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Match Profile" src="/path/to/match-profile-pic.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={match.username}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="textPrimary">
                            Skills Offered: {match.skillsOffered.join(', ')}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="textPrimary">
                            Skills Needed: {match.skillsNeeded.join(', ')}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="textSecondary" mt={2}>No matches found</Typography>
            )}
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" gutterBottom>Notifications</Typography>
        {notifications.length > 0 ? (
          <List>
            {notifications.map((notification, index) => (
              <ListItem key={index}>
                <ListItemText primary={notification.message} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="textSecondary">No notifications</Typography>
        )}

        <Divider sx={{ my: 4 }} />

        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            onClick={() => navigate('/profile')}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Paper>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Skill</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the skill and save your changes.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Skill"
            type="text"
            fullWidth
            variant="outlined"
            value={editSkill}
            onChange={(e) => setEditSkill(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEditSkill} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Container>
  );
};

export default Dashboard;
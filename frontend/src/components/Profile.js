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
  Paper,
} from '@mui/material';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);

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
        setUsername(response.data.username);
        setEmail(response.data.email);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        toast.error('Error fetching user data');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      if (profilePic) {
        formData.append('profilePic', profilePic);
      }

      const response = await axios.put('http://localhost:5000/api/users/me', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setUser(response.data);
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Error updating profile');
    }
  };

  if (loading) {
    return <Typography variant="h6" align="center" mt={10}>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box textAlign="center" mb={4}>
          <Avatar
            alt="Profile"
            src={user.profilePic || '/path/to/default-profile-pic.jpg'}
            sx={{ width: 96, height: 96, mx: 'auto', mb: 2 }}
          />
          <Typography variant="h4">{user.username}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{user.email}</Typography>
        </Box>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mt: 2 }}
        >
          Upload Profile Picture
          <input
            type="file"
            hidden
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleUpdateProfile}
          sx={{ mt: 2 }}
        >
          Update Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
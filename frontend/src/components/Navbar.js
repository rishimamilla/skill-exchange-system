import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Skill Barter System
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
          <Button color="inherit" component={Link} to="/skills">Skills</Button>
          <Button color="inherit" component={Link} to="/locations">Locations</Button>
          <Button color="inherit" component={Link} to="/aboutus">About Us</Button>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
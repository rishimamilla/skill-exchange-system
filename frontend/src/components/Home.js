import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box textAlign="center" mt={4}>
        <Typography variant="h3" gutterBottom>
          Welcome to Skill Barter System
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Exchange skills and knowledge with others in your community.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
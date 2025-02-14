// src/components/Locations.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';

// Sample locations data
const locationsData = [
  { id: 1, name: 'New York', description: 'Offering and requesting skills in New York' },
  { id: 2, name: 'Los Angeles', description: 'Skills exchange in Los Angeles area' },
  { id: 3, name: 'San Francisco', description: 'Offering and requesting skills in San Francisco' },
  { id: 4, name: 'Chicago', description: 'Skills exchange in Chicago' },
  { id: 5, name: 'Austin', description: 'Offering and requesting skills in Austin' },
];

function Locations() {
  const [search, setSearch] = useState('');

  // Filter locations based on search query
  const filteredLocations = locationsData.filter(location =>
    location.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Locations for Skill Exchange
      </Typography>
      <TextField
        fullWidth
        label="Search for locations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        margin="normal"
      />
      <Paper elevation={3}>
        <List>
          {filteredLocations.map(location => (
            <ListItem key={location.id}>
              <ListItemText
                primary={location.name}
                secondary={location.description}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default Locations;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
} from '@mui/material';

function SkillList() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('/api/skills');
        setSkills(response.data);
      } catch (err) {
        console.error("Error fetching skills", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Available Skills
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper elevation={3}>
          <List>
            {skills.map(skill => (
              <ListItem key={skill._id}>
                <ListItemText
                  primary={skill.skillName}
                  secondary={skill.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
}

export default SkillList;

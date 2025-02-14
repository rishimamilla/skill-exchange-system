import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
} from "@mui/material";

const SkillMatches = ({ userId }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/matches/find-matches/${userId}`);
        setMatches(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [userId]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Skill Matches
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : matches.length > 0 ? (
        <Paper elevation={3}>
          <List>
            {matches.map((match) => (
              <ListItem key={match._id}>
                <ListItemText
                  primary={match.username}
                  secondary={`Offers: ${match.skillsOffered.join(", ")} | Needs: ${match.skillsNeeded.join(", ")}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography>No matches found yet.</Typography>
      )}
    </Container>
  );
};

export default SkillMatches;

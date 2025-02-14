import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ManageSkills.css';

const ManageSkills = () => {
  const navigate = useNavigate();
  const [skillsOffered, setSkillsOffered] = useState('');
  const [skillsNeeded, setSkillsNeeded] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleAddSkills = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/users/me/skills', {
        skillsOffered,
        skillsNeeded
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(response.data);
      setSkillsOffered('');
      setSkillsNeeded('');
    } catch (err) {
      console.error('Error adding skills:', err);
    }
  };

  const handleRemoveSkill = async (skillType, skill) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/users/me/skills/remove`, {
        skillType,
        skill
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(response.data);
    } catch (err) {
      console.error('Error removing skill:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manage-skills-container">
      <h2>Manage Skills</h2>
      <div className="add-skills">
        <input
          type="text"
          value={skillsOffered}
          onChange={(e) => setSkillsOffered(e.target.value)}
          placeholder="Add a skill you offer"
        />
        <input
          type="text"
          value={skillsNeeded}
          onChange={(e) => setSkillsNeeded(e.target.value)}
          placeholder="Add a skill you need"
        />
        <button onClick={handleAddSkills}>Add Skills</button>
      </div>
      <div className="skills-list">
        <h3>Skills Offered</h3>
        <ul>
          {user.skillsOffered.map((skill, index) => (
            <li key={index}>
              {skill}
              <button onClick={() => handleRemoveSkill('skillsOffered', skill)}>Remove</button>
            </li>
          ))}
        </ul>
        <h3>Skills Needed</h3>
        <ul>
          {user.skillsNeeded.map((skill, index) => (
            <li key={index}>
              {skill}
              <button onClick={() => handleRemoveSkill('skillsNeeded', skill)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageSkills;
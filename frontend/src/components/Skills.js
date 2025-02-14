// src/components/Skills.js
import React, { useState } from 'react';

// Sample skills data
const skillsData = [
  { id: 1, name: 'Web Development', description: 'Building websites and web applications' },
  { id: 2, name: 'Graphic Design', description: 'Creating logos, illustrations, and designs' },
  { id: 3, name: 'Digital Marketing', description: 'Social media marketing, SEO, SEM' },
  { id: 4, name: 'Content Writing', description: 'Writing articles, blogs, and other content' },
  { id: 5, name: 'Data Analysis', description: 'Analyzing data and generating insights' },
];

function Skills() {
  const [search, setSearch] = useState('');

  // Filter skills based on search query
  const filteredSkills = skillsData.filter(skill =>
    skill.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="skills-container">
      <h2>Skills Available for Barter</h2>
      
      <input
        type="text"
        placeholder="Search for skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      
      <ul className="skills-list">
        {filteredSkills.map(skill => (
          <li key={skill.id} className="skill-item">
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Skills;

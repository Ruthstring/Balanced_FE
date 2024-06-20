import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchHousehold = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [households, setHouseholds] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/households?search=${searchTerm}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        const data = await response.json();
        setHouseholds(data);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error searching households:', error);
    }
  };

  const handleJoinHousehold = async (householdId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/households/${householdId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        // Update user profile or redirect to home after successful join
        navigate('/home');
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error joining household:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Search Household</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Household Name"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {households.map((household) => (
          <div key={household.id}>
            <span>{household.name}</span>
            <button onClick={() => handleJoinHousehold(household.id)}>Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHousehold;
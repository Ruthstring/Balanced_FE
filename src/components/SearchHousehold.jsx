import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchHousehold = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [households, setHouseholds] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/households?search=${searchTerm}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.ok) {
        const data = await response.json();
        setHouseholds(data);
      } else {
        console.error('Failed to fetch households');
      }
    } catch (error) {
      console.error('Error searching households:', error);
    }
  };

  const handleJoinHousehold = async (householdId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/households/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name: householdId }) // Assuming you are passing household name to join
      });

      if (response.ok) {
        navigate('/home');
      } else {
        console.error('Failed to join household');
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
          <div key={household._id}>
            <span>{household.name}</span>
            <button onClick={() => handleJoinHousehold(household.name)}>Join</button> {/* Pass name instead of id */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHousehold;
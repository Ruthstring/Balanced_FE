import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddHousehold = () => {
  const [householdName, setHouseholdName] = useState('');
  const navigate = useNavigate();

  const handleCreateHousehold = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/households/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name: householdName })
      });

      if (response.ok) {
        const data = await response.json();
        // Update user profile or redirect to home after successful creation
        navigate('/home');
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error creating household:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Create Household</h2>
      <input
        type="text"
        value={householdName}
        onChange={(e) => setHouseholdName(e.target.value)}
        placeholder="Household Name"
      />
      <button onClick={handleCreateHousehold}>Create</button>
    </div>
  );
};

export default AddHousehold;
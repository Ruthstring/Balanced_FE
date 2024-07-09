import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddHousehold = ({ token, setHousehold }) => {
  const [householdName, setHouseholdName] = useState('');
  const navigate = useNavigate();

  const handleCreateHousehold = async (token) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/households/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: householdName }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHousehold(data);
        // Update user profile or redirect to home after successful creation
        navigate('/auth/home');
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error creating household:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <h2 className='text-2xl font-bold text-white'>Create Household</h2>
      <input
      className='text-center border-2 border-black rounded-3xl p-1 w-48'
        type='text'
        value={householdName}
        onChange={(e) => setHouseholdName(e.target.value)}
        placeholder='Household Name'
      />
      <button className='black-div text-xl px-4' onClick={() => handleCreateHousehold(token)}>Create</button>
    </div>
  );
};

export default AddHousehold;

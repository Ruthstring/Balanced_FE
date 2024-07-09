import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchHousehold = ({ token, setHousehold }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [households, setHouseholds] = useState([]);
  const navigate = useNavigate();

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    handleSearch(token);
  }, [searchTerm]);

  const handleSearch = async (token) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/households?search=${searchTerm}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        searchTerm.length > 0 && setHouseholds(data);
      } else {
        console.error('Failed to fetch households');
      }
    } catch (error) {
      console.error('Error searching households:', error);
    }
  };

  const handleJoinHousehold = async (householdId, token) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/households/join`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: householdId }), // Assuming you are passing household name to join
        }
      );

      if (response.ok) {
        navigate('/auth/home');
      } else {
        console.error('Failed to join household');
      }
    } catch (error) {
      console.error('Error joining household:', error);
    }
  };

  return (
    <div className='flex flex-col items-center gap-3'>
      <h2 className='text-2xl text-white font-bold'>Search Household</h2>
      <input
        className='text-center border-2 border-black rounded-3xl p-1 w-48'
        type='text'
        value={searchTerm}
        onChange={handleSearchInput}
        placeholder='Household Name'
      />

      <div className='w-screen flex flex-col items-center justify-center mt-4 gap-2'>
        {households.slice(0, 10).map((household) => (
          <div
            className='flex items-center justify-center w-screen  gap-4'
            key={household._id}
          >
            <span className='flex w-52 green-box p-2 rounded-md text-xl'>
              {household.name}
            </span>
            <button
              className='flex black-div text-xl px-4'
              onClick={() => handleJoinHousehold(household.name, token)}
            >
              Join
            </button>{' '}
            {/* Pass name instead of id */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHousehold;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeProfile = ({ token, user }) => {
  const navigate = useNavigate();
  //for household search and addition
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState([]);
  const [householdName, setHouseholdName] = useState('');
  // Checking if user belongs to a household:
  useEffect(() => {
    const fetchHouseholdProfile = async (token) => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/auth/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.household) {
          setMessage(` ${response.data.household.name}`);
        } else {
          setMessage('No house added yet');
          setOptions(['Search for a house', 'Create a house']);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response && error.response.status === 401) {
          setMessage('Unauthorized. Please log in again.');
        } else {
          setMessage('Error fetching profile.');
        }
      }
    };

    token && fetchHouseholdProfile(token);
  }, [navigate, token]);

  const handleCreateHousehold = async (token) => {
    try {
      // const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/households/create',
        { name: householdName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(` ${response.data.household.name}`);
      setOptions([]); // User is now in a household
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoinHousehold = async (token) => {
    try {
      // const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/households/join',
        { name: householdName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setMessage(`Household: ${response.data.household.name}`);
      setMessage(` ${response.data.household.name}`);
      setOptions([]); // User is now in a household
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <div className="welcome-container grid-cols-2 gap-4 "> */}
      <div className='imgPlaceholder ml-10 col-span-1 size-28'></div>
      <div className='col-span-1 '>
        <h1>Welcome back</h1> <div className='black-div'> {user.username} </div>
        <div className='black-div'>{message}</div>
      </div>
      {options.length > 0 && (
        <div className='options-container'>
          <input
            type='text'
            value={householdName}
            onChange={(e) => setHouseholdName(e.target.value)}
            placeholder='Enter household name'
          />
          <ul>
            {options.includes('Search for a house') && (
              <li>
                <button onClick={() => handleJoinHousehold(token)}>
                  Search for a house
                </button>
              </li>
            )}
            {options.includes('Create a house') && (
              <li>
                <button onClick={() => handleCreateHousehold(token)}>
                  Create a house
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default HomeProfile;

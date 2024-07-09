import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePictureUpload from '../components/ProfilePictureUpload';

const HomeProfile = ({ user, token, household, setHousehold }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState([]);
  const [householdName, setHouseholdName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const fetchHouseholdProfile = async (token) => {
      try {
        // Fetch household information
        const householdResponse = await axios.get(
          'http://localhost:5000/api/auth/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await householdResponse.data.household;
        setHousehold(data);
        if (!data) {
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
      const response = await axios.post(
        'http://localhost:5000/api/auth/households/create',
        { name: householdName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data.household;
      setHousehold(data);
      setOptions([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoinHousehold = async (token) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/households/join',
        { name: householdName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data.household;
      setHousehold(data);
      setOptions([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='imgPlaceholder imgml-10 col-span-1 size-40'>
        <img
          src={profilePicture}
          alt='Profile'
          onClick={() =>
            document.getElementById('profile-picture-upload').click()
          }
          style={{ cursor: 'pointer' }}
          className='profile-image'
        />

        <ProfilePictureUpload setProfilePicture={setProfilePicture} />
      </div>

      <div className='col-span-1'>
        <h1 className='text-xl'>Welcome back</h1>
        <div className='black-div mt-6'>
          {' '}
          <h1 className='text-xl'>{user.username} </h1>
        </div>
        <div className='black-div mt-8'>
          <h1 className='text-xl'>{message}</h1>
        </div>
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

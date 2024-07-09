import axios from 'axios';
import { useEffect, useState } from 'react';
import ProfilePictureUpload from '../components/ProfilePictureUpload';

const HomeProfile = ({ user, token, household, setHousehold }) => {
  const [message, setMessage] = useState('');

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
        if(data) setHousehold(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response && error.response.status === 401) {
          setMessage('Unauthorized. Please log in again.');
        } else {
          setMessage('Error fetching profile.');
        }
      }
    };
    token && user.household_id && fetchHouseholdProfile(token);
  }, [token, user]);


  return ( 
      <>
        {household?.name && (
          <div className='black-div mt-8'>
            <h1 className='text-xl'>
              {household.name ? household.name : 'No household'}
            </h1>
          </div>
        )}
      </>
  );
};

export default HomeProfile;

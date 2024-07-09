import { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import Household from './Household';
import HomeBalance from './HomeBalance';
import HomeProfile from './HomeProfile';
import HomeShopping from './HomeShopping';

const Home = ({ user, setUser, token, household, setHousehold }) => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchProfile = async (token) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log('Fetched profile:', data);
        data?.message ? setMessage(data.message) : setProfile(data);
      } catch (error) {
        setMessage('Error fetching profile.');
      }
    };

    const fetchBalances = async (token) => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/auth/balances',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched balances:', data);
      } catch (error) {
        console.error('Error fetching balances:', error);
        setMessage('Error fetching balances.');
      }
    };

    token && fetchProfile(token);
    token && user?.household_id && fetchBalances(token);
  }, []);

  return (
    <div className='grid-container mt-5 ml-10 mr-10 p-5 grid grid-cols-1 md:grid-cols-2 gap-4 grid-rows-3 gap-8'>
      <div className='firstCol row-span-3 md:row-span-3 h-full'>
        <div className='container purple-box mb-5 rounded-xl overflow-hidden shadow-lg row-span-1 flex-grow grid grid-cols-1 md:grid-cols-2'>
          <div className='imgPlaceholder imgml-10 col-span-1 size-40'>
            <UserProfile />
          </div>
          <div className='col-span-1'>
            <h1 className='text-xl'>Welcome back</h1>
            <div className='black-div mt-6'>
              {' '}
              <h1 className='text-xl'>{user.username} </h1>
            </div>

            {message ? (
              <Household message={message} />
            ) : (
              <HomeProfile
                user={user}
                token={token}
                setHousehold={setHousehold}
                household={household}
                setUser={setUser}
              />
            )}
          </div>
        </div>

        <div className='container homeBalance green-box mb-5 rounded-xl overflow-hidden shadow-lg flex-grow row-span-1 md:row-span-1'>
          <HomeBalance user={user} token={token} />
        </div>

        <div className='container green-box rounded-xl overflow-hidden shadow-lg row-span-1 md:row-span-1 flex-grow'>
          Notifications Component
        </div>
      </div>

      <div className='container purple-box rounded-xl overflow-hidden shadow-lg row-span-3 md:row-span-3'>
        <HomeShopping user={user} token={token} />
      </div>
    </div>
  );
};

export default Home;

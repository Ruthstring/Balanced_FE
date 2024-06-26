import React from "react";
import{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";

import HomeBalance from "./HomeBalance";
import HomeProfile from "./HomeProfile";
import HomeShopping from "./HomeShopping";

const Home=()=>{
    // const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState('');
    const [userBalance, setUserBalance] = useState(null);   

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/auth/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          setProfile(data);
          if (!data.household) {
            setMessage('You are not assigned to a household. Please create or join a household.');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
          setMessage('Error fetching profile.');
        }
      };
      console.log(profile)
      const fetchBalances = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/auth/balances', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          console.log('Fetched balances:', data);
          
          // Find the balance of the current user
          const currentUserBalance = data.find(user => user.username === localStorage.getItem('username'));
          if (currentUserBalance) {
            setUserBalance(currentUserBalance.balance);
          } else {
            console.error('User balance not found for username:', localStorage.getItem('username'));
          }
        } catch (error) {
          console.error('Error fetching balances:', error);
          setMessage('Error fetching balances.');
        }
      };
  
  
      fetchProfile();
      fetchBalances();
    }, []);

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //       try {
    //         const response = await fetch('http://localhost:5000/api/auth/profile', {
    //           method: 'GET',
    //           headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //           }
    //         });
    //         if (!response.ok) {
    //           throw new Error(`Error: ${response.status} ${response.statusText}`);
    //         }
    //         const data = await response.json();
    //         setProfile(data);
    //         if (!data.household) {
    //           setMessage('You are not assigned to a household. Please create or join a household.');
    //         }
    //       } catch (error) {
    //         console.error('Error fetching profile:', error);
    //         setMessage('Error fetching profile.');
    //       }
    //     };
    
    //     fetchProfile();
    //   }, []);
    
      const handleAddHousehold = () => {
        navigate('/add-household');
      };
    
      const handleSearchHousehold = () => {
        navigate('/search-household');
      };
    
      if (message) {
        return (
          <div className="flex flex-col items-center">
            <p>{message}</p>
            <button onClick={handleAddHousehold}>Create Household</button>
            <button onClick={handleSearchHousehold}>Join Household</button>
          </div>
        );
      }
    
      return (
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 grid-rows-3">
      <div className="rounded overflow-hidden shadow-lg row-span-1">
        <HomeProfile username={localStorage.getItem('username')} />
      </div>
      <div className="rounded overflow-hidden shadow-lg row-span-1">
      <HomeBalance userBalance={userBalance} />
      </div>
      <div className="rounded overflow-hidden shadow-lg row-span-1">
        {/* Placeholder for notifications component */}
        <div className="flex items-center justify-center h-full">
          Notifications Component
        </div>
      </div>
      <div className="rounded overflow-hidden shadow-lg row-span-3 md:row-span-3">
        <HomeShopping />
      </div>
    </div>
    //     <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 grid-rows-3">
    //   <div className="rounded overflow-hidden shadow-lg row-span-1">
    //     <HomeProfile username={localStorage.getItem('username')} />
    //   </div>
    //   <div className="rounded overflow-hidden shadow-lg row-span-1">
    //     <HomeBalance />
    //   </div>
    //   <div className="rounded overflow-hidden shadow-lg row-span-1">
    //     {/* Placeholder for notifications component */}
    //     <div className="flex items-center justify-center h-full">
    //       Notifications Component
    //     </div>
    //   </div>
    //   <div className="rounded overflow-hidden shadow-lg row-span-3 md:row-span-3">
    //     <HomeShopping />
    //   </div>
    // </div>
  );
};

    //     <div>
    //       <div className="flex mb-5">
    //         <div className="max-w-sm rounded overflow-hidden shadow-lg w-3/5 h-12">
    //           <HomeProfile username={localStorage.getItem('username')} /> {/* Display username from localStorage */}
    //         </div>
    //         <div className="max-w-sm rounded overflow-hidden shadow-lg w-3/5 h-1/3">
    //           <HomeShopping />
    //         </div>
    //       </div>
    
    //       <div className="max-w-sm rounded overflow-hidden shadow-lg">
    //         <HomeBalance />
    //       </div>
    //     </div>
    //   );
    // };
    
    export default Home;
    
    


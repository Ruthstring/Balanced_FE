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
        <div className="grid-container mt-5 ml-10 mr-10 p-5 grid grid-cols-1 md:grid-cols-2 gap-4 grid-rows-3 gap-8">
          
          <div className="firstCol row-span-3 md:row-span-3 h-full">
            <div className="container purple-box mb-5 rounded-xl overflow-hidden shadow-lg row-span-1 flex-grow grid grid-cols-1 md:grid-cols-2">
              <HomeProfile username={localStorage.getItem('username')} />
            </div>

            <div className="container homeBalance green-box mb-5 rounded-xl overflow-hidden shadow-lg flex-grow row-span-1 md:row-span-1">
              <HomeBalance userBalance={userBalance} />
            </div>

            <div className="container green-box rounded-xl overflow-hidden shadow-lg row-span-1 md:row-span-1 flex-grow">
              Notifications Component
            </div>

          </div>

          <div className="container purple-box rounded-xl overflow-hidden shadow-lg row-span-3 md:row-span-3">
             <HomeShopping />
          </div>
        </div>
    
  );
    
  //     return (
  //       <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 grid-rows-3">
  //     <div className="rounded overflow-hidden shadow-lg row-span-1 md:row-span-2">
  //       <HomeProfile username={localStorage.getItem('username')} />
  //     </div>
  //     <div className="rounded overflow-hidden shadow-lg  row-span-1 md:row-span-1">
  //     <HomeBalance userBalance={userBalance} />
  //     </div>
  //     <div className="rounded overflow-hidden shadow-lg row-span-1 md:row-span-1">
  //       {/* Placeholder for notifications component */}
  //       <div className="flex items-center justify-center h-full">
  //         Notifications Component
  //       </div>
  //     </div>
  //     <div className="rounded overflow-hidden shadow-lg row-span-3 md:row-span-3">
  //       <HomeShopping />
  //     </div>
  //   </div>
    
  // );
};

   
    
    export default Home;
    
    


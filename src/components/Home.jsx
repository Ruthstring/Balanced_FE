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


    //  useEffect(()=>{
    //     const fetchUser = async () => {
    //             try {
    //               const storedUsername = localStorage.getItem('username');
    //               if (storedUsername) {
    //                 setUsername(storedUsername);
    //               }
    //             } catch (error) {
    //               console.log(error);
    //             }
    //           };
          
    
    //           fetchUser();
    //         }, []);

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
    
        fetchProfile();
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
        <div>
          <div className="flex mb-5">
            <div className="max-w-sm rounded overflow-hidden shadow-lg w-3/5 h-12">
              <HomeProfile username={localStorage.getItem('username')} /> {/* Display username from localStorage */}
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg w-3/5 h-12">
              <HomeShopping />
            </div>
          </div>
    
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <HomeBalance />
          </div>
        </div>
      );
    };
    
    export default Home;
    //PART WHERE IS WORKING
//     useEffect(() => {
//         const fetchProfile = async () => {
//           try {
//             const response = await fetch('http://localhost:5000/api/auth/profile', {
//               method: 'GET',
//               headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//             });
//             if (!response.ok) {
//               throw new Error(`Error: ${response.status} ${response.statusText}`);
//             }
//             const data = await response.json();
//             setProfile(data);
//             if (!data.household) {
//               setMessage('You are not assigned to a household. Please create or join a household.');
//             }
//           } catch (error) {
//             console.error('Error fetching profile:', error);
//             setMessage('Error fetching profile.');
//           }
//         };
    
//         fetchProfile();
//       }, []);
    
//       const handleAddHousehold = () => {
//         navigate('/add-household');
//       };
    
//       const handleSearchHousehold = () => {
//         navigate('/search-household');
//       };
//       if (message) {
//         return (
//           <div className="flex flex-col items-center">
//             <p>{message}</p>
//             <button onClick={handleAddHousehold}>Create Household</button>
//             <button onClick={handleSearchHousehold}>Join Household</button>
//           </div>
//         );
//       }
//             return(
//                <div>
//                     <div className="flex mb-5">
//                         <div className="max-w-sm rounded overflow-hidden shadow-lg w-3/5 h-12">
//                         <HomeProfile username={profile ? profile.username : ''} />
//                         </div>
//                         <div className="max-w-sm rounded overflow-hidden shadow-lg w-3/5 h-12">
//                         <HomeShopping />
//                         </div>
//                     </div>
                
//                 <div className="max-w-sm rounded overflow-hidden shadow-lg">
//                  <HomeBalance /> 
//                 </div>
//             </div>
               
//             )
//      }
    


// export default Home;
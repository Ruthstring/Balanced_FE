import axios from 'axios'; 
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePictureUpload from "../components/ProfilePictureUpload"



const HomeProfile = ({ username }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState([]);
  const [householdName, setHouseholdName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('No token found');
          return;
        }

        // Fetch household information
        const householdResponse = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (householdResponse.data.household) {
          setMessage(` ${householdResponse.data.household.name}`);
        } else {
          setMessage('No house added yet');
          setOptions(['Search for a house', 'Create a house']);
        }

        // Fetch profile picture
        const profileResponse = await axios.get('http://localhost:5000/api/auth/profile-picture', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfilePicture(profileResponse.data.profilePicture || '../assets/default_userImage.png');
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response && error.response.status === 401) {
          setMessage('Unauthorized. Please log in again.');
        } else {
          setMessage('Error fetching profile.');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleCreateHousehold = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/auth/households/create',
        { name: householdName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(` ${response.data.household.name}`);
      setOptions([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleJoinHousehold = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/auth/households/join',
        { name: householdName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(` ${response.data.household.name}`);
      setOptions([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="imgPlaceholder imgml-10 col-span-1 size-28">
        <img
          src={profilePicture}
          alt="Profile"
          onClick={() => document.getElementById('profile-picture-upload').click()}
          style={{ cursor: 'pointer' }}
          className='profile-image'
        />
        <ProfilePictureUpload setProfilePicture={setProfilePicture} />
      </div>
      <div className="col-span-1">
        <h1>Welcome back</h1>
        <div className="black-div"> {username} </div>
        <div className="black-div">{message}</div>
      </div>
      {options.length > 0 && (
        <div className="options-container">
          <input
            type="text"
            value={householdName}
            onChange={(e) => setHouseholdName(e.target.value)}
            placeholder="Enter household name"
          />
          <ul>
            {options.includes('Search for a house') && (
              <li>
                <button onClick={handleJoinHousehold}>Search for a house</button>
              </li>
            )}
            {options.includes('Create a house') && (
              <li>
                <button onClick={handleCreateHousehold}>Create a house</button>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default HomeProfile;

//old-new version: 

// const HomeProfile = ({ username }) => {
//   const navigate = useNavigate();
//   const [message, setMessage] = useState('');
//   const [options, setOptions] = useState([]);
//   const [householdName, setHouseholdName] = useState('');
//   const [profilePicture, setProfilePicture] = useState('');

//   console.log(profilePicture)
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setMessage('No token found');
//           return;
//         }

//         const response = await axios.get('http://localhost:5000/api/auth/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//  console.log(response)
//         if (response.data.household) {
//           setMessage(` ${response.data.household.name}`);
//           navigate('/home');
//         } else {
//           setMessage('No house added yet');
//           setOptions(['Search for a house', 'Create a house']);
//         }

//         // Set profile picture
//         setProfilePicture(response.data.profilePicture || '../assets/default_userImage.png');
//         console.log(response.data)
//         console.log(response.data.profilePicture)
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         if (error.response && error.response.status === 401) {
//           setMessage('Unauthorized. Please log in again.');
//         } else {
//           setMessage('Error fetching profile.');
//         }
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleCreateHousehold = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:5000/api/households/create',
//         { name: householdName },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMessage(` ${response.data.household.name}`);
//       setOptions([]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleJoinHousehold = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         'http://localhost:5000/api/households/join',
//         { name: householdName },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMessage(` ${response.data.household.name}`);
//       setOptions([]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const triggerFileInput = () => {
//     document.getElementById('profile-picture-upload').click();
//   };

//   return (
//     <>
//       <div className="imgPlaceholder imgml-10 col-span-1 size-28">
//         <img
//           src={profilePicture}
//           alt="Profile"
//           onClick={triggerFileInput}
//           style={{ cursor: 'pointer' }}
//         />
//         <ProfilePictureUpload setProfilePicture={setProfilePicture} />
//       </div>
//       <div className="col-span-1">
//         <h1>Welcome back</h1>
//         <div className="black-div"> {username} </div>
//         <div className="black-div">{message}</div>
//       </div>
//       {options.length > 0 && (
//         <div className="options-container">
//           <input
//             type="text"
//             value={householdName}
//             onChange={(e) => setHouseholdName(e.target.value)}
//             placeholder="Enter household name"
//           />
//           <ul>
//             {options.includes('Search for a house') && (
//               <li>
//                 <button onClick={handleJoinHousehold}>Search for a house</button>
//               </li>
//             )}
//             {options.includes('Create a house') && (
//               <li>
//                 <button onClick={handleCreateHousehold}>Create a house</button>
//               </li>
//             )}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// };

// export default HomeProfile;



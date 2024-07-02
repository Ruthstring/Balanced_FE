import React, { useState,useEffect } from 'react';
import axios from 'axios';



const ProfilePictureUpload = ({ setProfilePicture }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/auth/profile-picture/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setProfilePicture(response.data.profilePicture);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div>
      <input
        id="profile-picture-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the file input element
      />
    </div>
  );
};

export default ProfilePictureUpload;

// const ProfilePictureUpload = ({ setProfilePicture }) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [showFileInput, setShowFileInput] = useState(false);


//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);

//     const formData = new FormData();
//     formData.append('profilePicture', file);

//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('http://localhost:5000/api/auth/profile-picture/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setProfilePicture(response.data.profilePicture);
//     } catch (error) {
//       console.error('Error uploading profile picture:', error);
//     }
//   };

//   const handleImageClick = () => {
//     setShowFileInput(true); // Show the file input when the image is clicked
//   }

//   return (
//   //   <div>
//   //   <div style={{ position: 'relative', display: 'inline-block' }}>
//   //     <img
//   //       src={profilePictureUrl} // Display the profile picture dynamically
//   //       alt="Profile"
//   //       onClick={handleImageClick}
//   //       style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', cursor: 'pointer' }}
//   //     />

//   //     {showFileInput && (
//   //       <input type="file" accept="image/*" onChange={handleFileChange} style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100px', height: '100px', cursor: 'pointer' }} />
//   //     )}
//   //   </div>
//   // </div>
//     <div>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//     </div>
//   );
// };

// export default ProfilePictureUpload;
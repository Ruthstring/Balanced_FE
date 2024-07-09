import ProfilePictureUpload from './ProfilePictureUpload';
import { useState } from 'react';

function UserProfile() {
  const [profilePicture, setProfilePicture] = useState("");
  return (
    <>
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
    </>
  );
}

export default UserProfile;

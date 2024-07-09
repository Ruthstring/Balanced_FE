import { useNavigate } from 'react-router-dom';

function Household({ message }) {
  const navigate = useNavigate();
  const handleAddHousehold = () => {
    navigate('/auth/add-household');
  };

  const handleSearchHousehold = () => {
    navigate('/auth/search-household');
  };
  return (
    <div className='flex flex-col items-center'>
      <p className='text-white font-bold text-lg py-4'>{message}</p>
      <div className='black-div mt-3 px-4'>
        <button onClick={handleAddHousehold}>Create Household</button>
      </div>
      <div className='black-div mt-4 px-4'>
        <button onClick={handleSearchHousehold}>Join Household</button>
      </div>
    </div>
  );
}

export default Household;

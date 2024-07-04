import BalancePage from './ShoppingPage';
import { Link } from 'react-router-dom';

const HomeBalance = ({ user }) => {
  // Determine the color based on the balance
  const balanceColorClass =
    user.balance >= 0 ? 'text-green-500' : 'text-red-500';

  // Determine the image based on the balance
  const balanceImage =
    user.balance >= 0
      ? '../src/assets/PositiveBalance.svg'
      : '../src/assets/NegativeBalance.svg';
  return (
    <>
      {/* // <div className="rounded overflow-hidden shadow-lg"> */}
      {/* <h1>User Balance Overview</h1> */}
      <div className='container '>
        {user.balance ? (
          <div className='flex col cols-2'>
            <p className={`text-3xl font-bold mt-12 ${balanceColorClass}`}>
              Balance: ${user.balance.toFixed(2)}
            </p>

            <img
              className='w-48 h-48'
              src={balanceImage}
              alt='Balance status'
            ></img>
          </div>
        ) : (
          <p>Loading balance...</p>
        )}
      </div>
      <Link to='/auth/balancepage'>
        <button className='btn-see'>See more</button>
      </Link>
    </>
  );
};

export default HomeBalance;

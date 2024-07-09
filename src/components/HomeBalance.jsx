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
      <div className='container balance-container'>
        {user.balance !== null && user.balance !== undefined ? (
          <div className='flex col cols-2'>
            <div>
              <p
                className={`text-4xl text-left font-bold mt-6 ml-12 ${balanceColorClass}`}
              >
                Balance{' '}
              </p>
              <p
                className={`text-5xl font-bold mt-4 mb-8 ml-12 ${balanceColorClass}`}
              >
                ${user.balance.toFixed(2)}
              </p>
              <Link to='/auth/balancepage'>
                <button className='btn-see mb-6 mt-8'>See more</button>
              </Link>
            </div>

            <img
              className='balance-image hidden lg:block ml-16'
              src={balanceImage}
              alt='Balance status'
            ></img>
          </div>
        ) : (
          <p>Loading balance...</p>
        )}
      </div>
    </>
  );
};

export default HomeBalance;

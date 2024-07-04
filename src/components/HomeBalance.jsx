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
    
      <div className="container balance-container">
      {userBalance !== null && userBalance !== undefined ? (
        <div className="flex col cols-2">
          <div>
            <p className={`text-4xl text-left font-bold mt-6 ml-12 ${balanceColorClass}`}>Balance </p>
            <p className={`text-5xl font-bold mt-4 mb-8 ml-12 ${balanceColorClass}`}>${userBalance.toFixed(2)}</p>
            <Link to="/balancepage">
            <button className="btn-see mb-6 mt-8">See more</button>
            </Link>
         </div>
        
          <img  className="balance-image ml-24" src={balanceImage} alt="Balance status"></img>
      
        </div>
       
      ) : (
        <p>Loading balance...</p>
      )}
      </div>
      
      </>

    // <>
    // {/* // <div className="rounded overflow-hidden shadow-lg"> */}
    //   {/* <h1>User Balance Overview</h1> */}
    //   <div className="container balance-container">
    //   {userBalance !== null && userBalance !== undefined ? (
    //     <div className="flex col cols-2">
    //       <p className={`text-4xl font-bold mt-12 ml-10 ${balanceColorClass}`}>Balance: ${userBalance.toFixed(2)}</p>
        
    //       <img  className="balance-image w-48 h-48 ml-12" src={balanceImage} alt="Balance status"></img>
    //     </div>
       
    //   ) : (
    //     <p>Loading balance...</p>
    //   )}
    //   </div>
    //   <Link to="/balancepage">
    //     <button className="btn-see">See more</button>
    //   </Link>
    //   </>
    
  );
};

export default HomeBalance;

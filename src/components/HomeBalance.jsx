import BalancePage from "./ShoppingPage";
import { Link } from "react-router-dom"; 


const HomeBalance = ({ userBalance }) => {
  
   // Determine the color based on the balance
   const balanceColorClass = userBalance >= 0 ? "text-green-500" : "text-red-500";
  

   // Determine the image based on the balance
  const balanceImage = userBalance >= 0 ? "../src/assets/PositiveBalance.svg" : "../src/assets/NegativeBalance.svg";

  return (
    <>
    {/* // <div className="rounded overflow-hidden shadow-lg"> */}
      {/* <h1>User Balance Overview</h1> */}
      <div className="container ">
      {userBalance !== null && userBalance !== undefined ? (
        <div className="flex col cols-2">
          <p className={`text-3xl font-bold mt-12 ${balanceColorClass}`}>Balance: ${userBalance.toFixed(2)}</p>
        
          <img  className="w-48 h-48" src={balanceImage} alt="Balance status"></img>
        </div>
       
      ) : (
        <p>Loading balance...</p>
      )}
      </div>
      <Link to="/balancepage">
        <button className="btn-see">See more</button>
      </Link>
      </>
    
  );
};

export default HomeBalance;


import BalancePage from "./ShoppingPage";
import { Link } from "react-router-dom"; 


const HomeBalance = ({ userBalance }) => {
  
   // Determine the color based on the balance
   const balanceColorClass = userBalance >= 0 ? "text-green-500" : "text-red-500";
  
  return (
    <>
    {/* // <div className="rounded overflow-hidden shadow-lg"> */}
      {/* <h1>User Balance Overview</h1> */}
      <div className="container">
      {userBalance !== null && userBalance !== undefined ? (
        <p className={`text-3xl ${balanceColorClass}`}>Balance: ${userBalance.toFixed(2)}</p>
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

// const HomeBalance = ({ balances }) => {
//   // Find the user's balance from balances array
//   const username = localStorage.getItem("username");
//   const userBalance = balances.find((balance) => balance.username === username);

//   return (
//     <div className="rounded overflow-hidden shadow-lg">
//       <h1>User Balance Overview</h1>
//       {userBalance ? (
//         <p>
//           Balance for {username}: ${userBalance.balance.toFixed(2)}
//         </p>
//       ) : (
//         <p>Loading balance...</p>
//       )}
//       <Link to="/balancepage">
//         <button>Go to Balance Page</button>
//       </Link>
//     </div>
//   );
// };

// export default HomeBalance;
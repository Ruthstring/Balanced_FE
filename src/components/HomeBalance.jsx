import BalancePage from "./ShoppingPage";
import { Link } from "react-router-dom"; 


const HomeBalance=()=>{
    const balanceNumber=1000; //THIS IS A PLACEHOLDER
    return(
        <>
        <h1>Positive or negative balance to display</h1>
        <p>Balance: ${balanceNumber}</p>
      <Link to="/balancepage">
        <button>Go to Balance Page</button>
      </Link>
        </>
    )
}

export default HomeBalance;
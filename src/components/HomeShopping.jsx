import ShoppingPage from "./ShoppingPage";
import { Link } from "react-router-dom";



const HomeShopping=()=>{
    return(
        <>
        <h1> Preview of shoping list</h1>
        {/* Summary content */}
      <Link to="/shoppingpage">
        <button>Go to Shopping Page</button>
      </Link>

        </>
    )
}

export default HomeShopping;
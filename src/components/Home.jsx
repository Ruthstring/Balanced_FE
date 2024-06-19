import React from "react";
import{useEffect} from "react"

import HomeBalance from "./HomeBalance";
import HomeProfile from "./HomeProfile";
import HomeShopping from "./HomeShopping";

const Home=()=>{

     useEffect(()=>{
        const fetchUser = async () => {
                try {
                  const token = localStorage.getItem('token');
                  const decodedToken = jwt_decode(token);
                  setUsername(decodedToken.user.username);
                  console.log(username);
                } catch (error) {
                  console.log(error);
                }
              };
    
              fetchUser();
            }, []);

            return(
                <>
                <h1>Here we will see the summary componets with links to the specific sections</h1>
                <HomeProfile />
                <HomeBalance />
                <HomeShopping />
                </>
            )
     }
    


export default Home;
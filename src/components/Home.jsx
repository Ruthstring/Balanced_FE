import React from "react";
import{useEffect,useState} from "react"

import HomeBalance from "./HomeBalance";
import HomeProfile from "./HomeProfile";
import HomeShopping from "./HomeShopping";

const Home=()=>{
    const [username, setUsername] = useState("");
    

     useEffect(()=>{
        const fetchUser = async () => {
                try {
                  const storedUsername = localStorage.getItem('username');
                  if (storedUsername) {
                    setUsername(storedUsername);
                  }
                } catch (error) {
                  console.log(error);
                }
              };
          
    
              fetchUser();
            }, []);

            return(
               <div>
                    <div className="flex mb-5">
                        <div className="max-w-sm rounded overflow-hidden shadow-lg w-3/5 h-12">
                        <HomeProfile username={username} />
                        </div>
                        <div className="max-w-sm rounded overflow-hidden shadow-lg w-3/5 h-12">
                        <HomeShopping />
                        </div>
                    </div>
                
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                 <HomeBalance /> 
                </div>
            </div>
               
            )
     }
    


export default Home;
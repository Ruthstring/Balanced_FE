import React from "react";

import HomeBalance from "./HomeBalance";
import HomeProfile from "./HomeProfile";
import HomeShopping from "./HomeShopping";

const Home=()=>{
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
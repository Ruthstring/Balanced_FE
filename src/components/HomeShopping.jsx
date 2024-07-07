import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import emptyListImage from "../assets/empty-list.png"


const HomeShopping = ({user, token}) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchItems = async (token) => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/auth/shopping/items',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          console.error('Failed to fetch items');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    token && fetchItems(token);
  }, [token]);

  return (

    <div className="shopping-container green-box border-8 border-black rounded-xl mt-20 mr-8 p-4 h-full flex flex-col relative">
    <div>
      <h1 className="text-xl text-left ml-5 font-bold mb-2 mt-8">Shopping List</h1>
      {items.length === 0 ? (
        <div className="text-center mt-8">
          <img src={emptyListImage} alt="Empty Shopping List" className="w-48 h-48 mx-auto" />
          <p className="text-sm mt-4">Your shopping list is currently empty</p>
        </div>
      ) : (
        <ul className="text-left ml-5 list-disc list-inside mb-4">
          {items.map(item => (
            <li key={item._id} className="text-sm">{item.name}</li>
          ))}
        </ul>
      )}
    </div>
    <div className="btn-shopping text-left absolute bottom-4 left-4 ml-6 mb-6">
      <Link to="/auth/shoppingpage">
        <button className="btn-see">See more</button>
      </Link>
    </div>
  </div>
  //   <div className="green-box border-8 border-black rounded-xl mt-20 mr-8 p-4 h-full flex flex-col">
  //   <div>
  //     <h1 className="text-xl text-left ml-5 font-bold mb-2 mt-8"> Shopping List</h1>
  //     <ul className="text-left ml-5 list-disc list-inside mb-4">
  //       {items.map(item => (
  //         <li key={item._id} className="text-sm">{item.name}</li>
  //       ))}
  //     </ul>
  //   </div>
  //   <div className="text-left mt-72 ml-5">
  //     <Link to="/shoppingpage">
  //       <button className="btn-see">See more</button>
  //     </Link>
  //   </div>
  // </div>

    
  );
};

export default HomeShopping;

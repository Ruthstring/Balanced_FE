import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomeShopping = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/shopping/items', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
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

    fetchItems();
  }, []);

  return (
    <div className="green-box border-8 border-black rounded-xl mt-20 mr-8 p-4 h-full flex flex-col">
    <div>
      <h1 className="text-xl text-left ml-5 font-bold mb-2 mt-8">Preview of Shopping List</h1>
      <ul className="text-left ml-5 list-disc list-inside mb-4">
        {items.map(item => (
          <li key={item._id} className="text-sm">{item.name}</li>
        ))}
      </ul>
    </div>
    <div className="text-left mt-72 ml-5">
      <Link to="/shoppingpage">
        <button className="btn-see">See more</button>
      </Link>
    </div>
  </div>

    // <>
    //   <h1>Preview of Shopping List</h1>
    //   <ul>
    //     {items.slice(0, 5).map(item => ( // Displaying the first 5 items as a preview
    //       <li key={item._id}>{item.name}</li>
    //     ))}
    //   </ul>
    //   <Link to="/shoppingpage">
    //     <button>Go to Shopping Page</button>
    //   </Link>
    // </>
  );
}

export default HomeShopping;
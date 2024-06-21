

import React, { useState, useEffect } from 'react';

const ShoppingPage = () => {
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [cost, setCost] = useState('');
  const [itemIdToBuy, setItemIdToBuy] = useState(null); // To track the item being bought
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
    fetchBoughtItems();
  }, []);

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

  const fetchBoughtItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/shopping/bought-items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBoughtItems(data);
      } else {
        console.error('Failed to fetch bought items');
      }
    } catch (error) {
      console.error('Error fetching bought items:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      const existingItem = items.find(item => item.name.toLowerCase() === itemName.toLowerCase());
      if (existingItem) {
        setError('Item already exists in the shopping list');
        return;
      }
      const response = await fetch('http://localhost:5000/api/auth/shopping/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name: itemName }),
      });
      if (response.ok) {
        const newItem = await response.json();
        setItems([...items, newItem]);
        setItemName('');
      } else {
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleBuyItem = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/shopping/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ itemId: itemIdToBuy, cost }),
      });
      if (response.ok) {
        const boughtItem = await response.json();
        console.log(boughtItem);
        setBoughtItems([...boughtItems, boughtItem]);

        // After buying the item, delete it from the shopping list
        await handleDeleteItem(itemIdToBuy);

        //new line
         // Remove the item from the shopping list
      setItems(items.filter(item => item._id !== itemIdToBuy));
      
        // Reset fields
        setItemIdToBuy(null);
        setCost('');
      } else {
        console.error('Failed to buy item');
      }
    } catch (error) {
      console.error('Error buying item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const deleteResponse = await fetch(`http://localhost:5000/api/auth/shopping/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (deleteResponse.ok) {
        setItems(items.filter(item => item._id !== itemId));
      } else {
        throw new Error('Failed to delete item from shopping list');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

// const ShoppingPage = () => {
//   const [itemName, setItemName] = useState('');
//   const [items, setItems] = useState([]);
//   const [boughtItems, setBoughtItems] = useState([]);
//   const [cost, setCost] = useState('');
//   const [itemIdToBuy, setItemIdToBuy] = useState(null); // To track the item being bought
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchItems();
//     fetchBoughtItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/shopping/items', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setItems(data);
//       } else {
//         console.error('Failed to fetch items');
//       }
//     } catch (error) {
//       console.error('Error fetching items:', error);
//     }
//   };

//   const fetchBoughtItems = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/shopping/bought-items', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setBoughtItems(data);
//       } else {
//         console.error('Failed to fetch bought items');
//       }
//     } catch (error) {
//       console.error('Error fetching bought items:', error);
//     }
//   };

//   const handleAddItem = async () => {
//     try {
//           // Check if item already exists in the shopping list
//       const existingItem = items.find(item => item.name.toLowerCase() === itemName.toLowerCase());
//       if (existingItem) {
//         setError('Item already exists in the shopping list');
//         return;
//       }
//       const response = await fetch('http://localhost:5000/api/auth/shopping/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ name: itemName }),
//       });
//       if (response.ok) {
//         const newItem = await response.json();
//         setItems([...items, newItem]);
//         setItemName('');
//       } else {
//         console.error('Failed to add item');
//       }
//     } catch (error) {
//       console.error('Error adding item:', error);
//     }
//   };

//   const handleBuyItem = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/shopping/buy', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ itemId: itemIdToBuy, cost }),
//       });
//       if (response.ok) {
        
     
//         // Buy the item and add to bought items
//         const boughtItem = await response.json();
//         setBoughtItems([...boughtItems, boughtItem]);
  
//          // Delete the item from the shopping list
//          const deleteResponse = await fetch(`http://localhost:5000/api/auth/shopping/${itemIdToBuy}`, {
//           method: 'DELETE',
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         if (!deleteResponse.ok) {
//           throw new Error('Failed to delete item from shopping list');
//         }

//         // Update the local state to remove the item from items
//         setItems(items.filter(item => item._id !== itemIdToBuy));

//         // Reset fields
//         setItemIdToBuy(null);
//         setCost('');
//       } else {
//         console.error('Failed to buy item');
//       }
//     } catch (error) {
//       console.error('Error buying item:', error);
//     }
//   };
  


  return (
    <div className="shopping-page flex">
      <div className="w-1/2 p-4">
        <h1>Shopping List</h1>
        <div className="input-group mb-4">
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
            className="border p-2 mr-2"
          />
          <button onClick={handleAddItem}>Add Item</button>
        </div>
        <ul>
          {items.map((item) => (
            <li key={item._id} className="mb-2" >
              {item.name}
              <button onClick={() =>setItemIdToBuy(item._id)}
                className="bg-green-500 text-white p-2 ml-2"
                >Buy</button>
            </li>
          ))}
        </ul>
        {itemIdToBuy !== null && (
          <div className="cost-inputmt-4">
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="Enter cost"
              className="border p-2 mr-2"
            />
            <button onClick={handleBuyItem}
            className="bg-green-500 text-white p-2"
            >Confirm Purchase</button>
          </div>
        )}
      </div>
      <div className="w-1/2 p-4">
        <h2>Bought Items</h2>
        <ul>
          {boughtItems.map((item) => (
            <li key={item._id}>
              {item.name} - ${item.cost} by {item.buyer ? item.buyer.username : 'Unknown'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default ShoppingPage;
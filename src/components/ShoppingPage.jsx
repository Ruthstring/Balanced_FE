import { useState, useEffect } from 'react';

const ShoppingPage = ({ user, token }) => {
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [cost, setCost] = useState('');
  const [itemIdToBuy, setItemIdToBuy] = useState(null); // To track the item being bought
  const [error, setError] = useState(null);

  console.log(user);
  useEffect(() => {
    token && fetchItems(token);
    token && fetchBoughtItems(token);
  }, [token]);
 console.log(token);
  const fetchItems = async (token) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/shopping/items',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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

  const fetchBoughtItems = async (token) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/shopping/bought-items',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  const handleAddItem = async (token) => {
    try {
      const existingItem = items.find(
        (item) => item.name.toLowerCase() === itemName.toLowerCase()
      );
      if (existingItem) {
        setError('Item already exists in the shopping list');
        return;
      }
      const response = await fetch(
        'http://localhost:5000/api/auth/shopping/add',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: itemName }),
        }
      );
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

  const handleBuyItem = async (token) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/shopping/buy',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ itemId: itemIdToBuy, cost }),
        }
      );
      if (response.ok) {
        const boughtItem = await response.json();
        setBoughtItems(boughtItem);

        // After buying the item, delete it from the shopping list
        await handleDeleteItem(itemIdToBuy);

        //new line
        // Remove the item from the shopping list
        setItems(items.filter((item) => item._id !== itemIdToBuy));

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

  const handleDeleteItem = async (itemId, token) => {
    try {
      const deleteResponse = await fetch(
        `http://localhost:5000/api/auth/shopping/${itemId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (deleteResponse.ok) {
        setItems(items.filter((item) => item._id !== itemId));
      } else {
        throw new Error('Failed to delete item from shopping list');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  //delete bought item button
  const handleDeleteBoughtItem = async (itemId, token) => {
    try {
      const deleteResponse = await fetch(
        `http://localhost:5000/api/auth/shopping/bought/${itemId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (deleteResponse.ok) {
        setBoughtItems(boughtItems.filter((item) => item._id !== itemId));
      } else {
        throw new Error('Failed to delete bought item');
      }
    } catch (error) {
      console.error('Error deleting bought item:', error);
    }
  };

  return (
    <div className='shopping-page gap-12 flex mt-5'>
      <div className=' purple-box rounded-xl w-1/2 p-4 flex'>
        <div className='green-box mt-10 rounded-xl flex-grow ml-8 mr-8 overflow-y-auto h-100 '>
          <h1 className='text-xl font-bold mb-4 mt-4'>Shopping List</h1>
          <div className='input-group mb-4 mt-4'>
            <input
              type='text'
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder='Enter item name'
              className='border p-2 mr-2'
            />
            <button className='btn-see' onClick={() => handleAddItem(token)}>
              Add Item
            </button>
          </div>
          <ul className='text-left ml-8'>
            {items.length > 0 && items.map((item) => (
              // <div className="itemBox">
              <li key={item._id} className='mb-2'>
                {item.name}
                <button
                  onClick={() => setItemIdToBuy(item._id, token)}
                  className='btn-buy ml-4'
                >
                  Buy
                </button>
              </li>
            ))}
            {itemIdToBuy && (
              <div className='cost-inputmt-4'>
                <input
                  type='number'
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder='Enter cost'
                  className='border p-2 mr-2'
                />
                <button
                  onClick={() => handleBuyItem(token)}
                  className='bg-green-500 text-white p-2'
                >
                  Confirm Purchase
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>

      <div className='purple-box rounded-xl w-1/2 p-4 flex'>
        <div className='green-box mt-10 rounded-xl flex-grow ml-8 mr-8 overflow-y-auto h-100'>
          <h2 className='text-xl text-left font-bold mb-4 mt-4 ml-10'>
            Bought Items
          </h2>
          <ul className='text-left ml-10'>
            {boughtItems.map((item) => (
              <li className='mt-4' key={item._id}>
                {item.name} - ${item.cost} by{' '}
                {item.buyer ? item.buyer.username : 'Unknown'}
                <button
                  onClick={() => handleDeleteBoughtItem(item._id)}
                  className='bg-red-500 text-white p-2 ml-2'
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;

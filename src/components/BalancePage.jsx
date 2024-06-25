
import React, { useState, useEffect } from 'react';

const BalancePage = () => {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    fetchBalances();
  }, []);

  const fetchBalances = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/balances', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBalances(data);
      } else {
        console.error('Failed to fetch balances');
      }
    } catch (error) {
      console.error('Error fetching balances:', error);
    }
  };

  return (
    <div className="balances-page">
      <h1>Balances</h1>
      <ul>
        {balances.map(balance => (
          <li key={balance._id}>
            {balance.username}: ${balance.balance.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BalancePage;


// import React, { useState, useEffect } from 'react';

// const BalancePage = () => {
//   const [balances, setBalances] = useState([]);

//   useEffect(() => {
//     fetchBalances();
//   }, []);

//   const fetchBalances = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/balances', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setBalances(data);
//       } else {
//         console.error('Failed to fetch balances');
//       }
//     } catch (error) {
//       console.error('Error fetching balances:', error);
//     }
//   };

//   return (
//     <div className="balances-page">
//       <h1>Balances</h1>
//       <ul>
//         {balances.map(balance => (
//           <li key={balance._id}>
//             {balance.username}: ${balance.balance}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BalancePage;

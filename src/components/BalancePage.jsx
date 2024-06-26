import PersonalBalance from './PersonalBalance';
import React, { useState, useEffect } from 'react';

const BalancePage = () => {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    console.log('Stored username:', localStorage.getItem('username'));
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
        console.log('Fetched balances:', data);
        setBalances(data);
      } else {
        console.error('Failed to fetch balances');
      }
    } catch (error) {
      console.error('Error fetching balances:', error);
    }
  };
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
//         console.log(data);
//         setBalances(data);

//       } else {
//         console.error('Failed to fetch balances');
//       }
//     } catch (error) {
//       console.error('Error fetching balances:', error);
//     }
//   };

  return (
    <div className="balances-page">
      <h1>Balances</h1>
      <div className="global-balances">
        <ul>
          {balances.map(balance => (
            <li key={balance._id}>
              {balance.username}: ${balance.balance.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
       <PersonalBalance balances={balances} />
    </div>
  );
};

export default BalancePage;



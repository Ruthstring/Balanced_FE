import PersonalBalance from './PersonalBalance';
import React, { useState, useEffect } from 'react';
import Chart from './Chart';

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

  return (
    <div className="balances-page">

      <div className="global-balances purple-box rounded-xl shadow-lg mt-10 mb-8 pb-10">
        <h1 className="text-left text-xl font-bold ml-10 mt-10">Global Balance</h1>
        <ul>
          {balances.map(balance => (
            <li key={balance._id}>
              {balance.username}: ${balance.balance.toFixed(2)}
            </li>
          ))}
        </ul>

        <div className="chart-container mt-2">
          <Chart balances={balances} />
        </div>

      </div>
      <div className="green-box rounded-xl shadow-lg">
       <PersonalBalance balances={balances} />
       </div>
    </div>
  );
};

export default BalancePage;



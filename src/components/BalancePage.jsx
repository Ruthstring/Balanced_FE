import PersonalBalance from './PersonalBalance';
import React, { useState, useEffect } from 'react';
import Chart from './Chart';

const BalancePage = ({ user, token, debts }) => {
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
      <h1 className="text-left text-white text-xl font-bold ml-16 ">Global Balance</h1>
      <div className="global-balances purple-box rounded-xl shadow-lg ml-14 mr-14 pb-2">
        {/* Display list on small screens */}
        <ul className="block mt-8 md:hidden">
          {balances.map(balance => (
            <div className="green-box p-3 font-semibold grid grid-cols-1">
            <li key={balance._id}
                className={balance.balance < 0 ? 'text-red-500' : 'text-green-500'}
            >
              {balance.username}: ${balance.balance.toFixed(2)}
            </li>
            </div>
          ))}
        </ul>

        {/* Display chart on medium and larger screens */}
        <div className="hidden md:block mt-8">
          <Chart balances={balances} />
        </div>
      </div>
      <h1 className="text-left text-xl font-bold text-white ml-16">Personal Balance</h1>
      <div className="green-box ml-14 mr-14 rounded-xl shadow-lg">
        <PersonalBalance balances={balances} user={user} debts={debts} />
      </div>
    </div>
    
  );
};

export default BalancePage;

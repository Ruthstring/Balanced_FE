import { useState, useEffect } from 'react';

const PersonalBalance = ({ user, balances }) => {
  const [personalStatus, setPersonalStatus] = useState([]);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    setUserName(localStorage.getItem('username'));
  }, []);

 

  useEffect(() => {
    const calculatePersonalStatus = async (balances, username) => {
      const user = balances.find((user) => user.username === username);

      const owedInfo = [];

      const usersOwing = balances.filter((user) => user.balance < 0);
      const usersOwed = balances.filter((user) => user.balance > 0);

      usersOwing.forEach((userOwing) => {
        usersOwed.forEach((userOwed) => {
          if (userOwing.balance < 0 && userOwed.balance > 0) {
            const owed = {
              userOwed: {
                username: userOwed.username,
                _id: userOwed._id,
              },
              moneyOwed: Math.min(-userOwing.balance, userOwed.balance),
              user: {
                username: userOwing.username,
                _id: userOwing._id,
              },
            };

            userOwed.balance -= owed.moneyOwed;
            userOwing.balance += owed.moneyOwed;

            owedInfo.push(owed);
          }
        });
      });
      try {
        const response = await fetch(`http://localhost:5000/api/auth/debts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          // body: JSON.stringify({ debts: owedInfo }),
        });
        // const data = await response.json();
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
      setPersonalStatus(owedInfo);
    };
    calculatePersonalStatus(balances, userName);
  }, [balances, userName]);
  console.log(personalStatus);

 

  return (
    <>
    
    <div className="personal-balance-section grid grid-cols-2 mt-10 mb-10 rounded-xl">
      
      <div>
        <h3 className="text-l font-bold">You Owe</h3>
        <ul>
          {personalStatus
            .filter((owed) => owed.user.username == userName)
            .map((debt, index) => (
              <li key={index}>
                You owe {debt.userOwed.username}: ${debt.moneyOwed.toFixed(2)}
                {/* {console.log(credit.debtor_id)} */}
                <button
                // onClick={() => settleDebt(debt.user._id, debt.moneyOwed)}
                >
                  Mark as Paid
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h3 className="text-l font-bold">Owed To You</h3>
        <ul>
          {personalStatus
            .filter((owed) => owed.userOwed.username == userName)
            .map((credit, index) => (
              <li key={index}>
                {credit.user.username} owes you: ${credit.moneyOwed.toFixed(2)}
                <button
                // onClick={() => settleDebt(credit.user._id, credit.moneyOwed)}
                >
                  Settle
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default PersonalBalance;

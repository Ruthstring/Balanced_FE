import { useState, useEffect } from 'react';

const PersonalBalance = ({ balances }) => {
  const [personalStatus, setPersonalStatus] = useState([]);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    setUserName(localStorage.getItem('username'));
  }, []);

  useEffect(() => {
    const calculatePersonalStatus = async (balances, username) => {
      const user = balances.find((user) => user.username === username);
      console.log('User:', user);

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
          body: JSON.stringify({ debts: owedInfo }),
        });
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      setPersonalStatus(owedInfo);
    };
    calculatePersonalStatus(balances, userName);
  }, [balances, userName]);
  console.log(personalStatus);

  // useEffect(() => {
  //   const addDebtsInfo = async (debtsInfo) => {
  //     const userId = debtsInfo[0]?.userOwed?._id;
  //     if (!userId) {
  //       console.error('User ID not found');
  //       return;
  //     }
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5000/api/auth/users/${userId}`,
  //         {
  //           method: 'PUT',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${localStorage.getItem('token')}`,
  //           },
  //           body: JSON.stringify({ debts: [...debtsInfo] }),
  //         }
  //       );

  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error creating household:', error);
  //     }
  //   };
  //   addDebtsInfo(debtsInfo);
  // }, [personalStatus]);

  // const settleDebt = async (userId, amount) => {
  //   try {
  //     const token = localStorage.getItem('token');

  //     if (!token) {
  //       console.error('Token not found in local storage.');
  //       return;
  //     }

  //     const newDebtsInfo = debtsInfo.map((debt) => {
  //       if (userId === debt.userOwed._id) {
  //         debt.moneyOwed = 0;
  //         debt.payedConfirmation = true;
  //       }
  //       if (userId === debt.user._id) {
  //         debt.payed = true;
  //       }
  //     });

  //     console.log(newDebtsInfo);

  //   } catch (error) {
  //     console.error('Error settling debt:', error);
  //   }
  // };

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

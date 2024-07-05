import { useState, useEffect } from 'react';

const PersonalBalance = ({ user, balances }) => {
  const [personalStatus, setPersonalStatus] = useState([]);
  const [userName, setUserName] = useState(null);
  const [creditors, setCreditors] = useState([]);
  const [debts, setDebts] = useState(null);

  useEffect(() => {
    setUserName(localStorage.getItem('username'));
    user && setDebts(user.household_id.debts);
  }, []);
  console.log(debts);
  console.log(user);
  useEffect(() => {
    const calculatePersonalStatus = async (balances, user) => {
      const owedInfo = [];
      const debtsInfo = [];
      const usersOwing = balances.filter((user) => user.balance < 0);
      const debtors = balances.filter((user) => user.balance < 0);
      const usersOwed = balances.filter((user) => user.balance > 0);
      const creditors = balances.filter((user) => user.balance > 0);

      user && debtors.forEach((debtor) => {
        creditors.forEach((creditor) => {
          if (debtor.balance < 0 && creditor.balance > 0) {
            const debt = {
             debtor: {
                username: creditor.username,
                _id: creditor._id,
              },
              moneyToPay: Math.min(-debtor.balance, creditor.balance),
              user: {
                username: debtor.username,
                _id: debtor._id,
              },
            };

            creditor.balance -= debt.moneyOwed;
            debtor.balance += debt.moneyOwed;

            owedInfo.push(debt);
          }
        });
      });
      console.log(debtsInfo);
      // try {
      //   const response = await fetch(
      //     `http://localhost:5000/api/auth/household/${user.household_id._id}`,
      //     {
      //       method: 'PUT',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         Authorization: `Bearer ${localStorage.getItem('token')}`,
      //       },
      //       // body: JSON.stringify({ debts: owedInfo }),
      //     }
      //   );
      //   // const data = await response.json();
      //   // console.log(data);
      // } catch (err) {
      //   console.log(err);
      // }
      setPersonalStatus(owedInfo);
    };
    user && calculatePersonalStatus(balances, user);
  }, [balances, user]);
  console.log(personalStatus);

  return (
    <div className='personal-balance-section mt-10 mb-10 rounded-xl'>
      <h2 className='text-left text-xl font-bold ml-10 mt-10'>
        Personal Balance
      </h2>
      <div>
        <h3>You Owe</h3>
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
        <h3>Owed To You</h3>
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
  );
};

export default PersonalBalance;

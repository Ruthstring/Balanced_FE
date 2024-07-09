import { data } from 'autoprefixer';
import { useState, useEffect } from 'react';

const PersonalBalance = ({
  token,
  user,
  setUser,
  balances,
  debts,
  setDebts,
  notifications,
  setNotifications,
}) => {
  const [personalStatus, setPersonalStatus] = useState([]);
  const [debtsToPay, setDebtsToPay] = useState([]);
  const [debtsToReceive, setDebtsToReceive] = useState([]);
  const [debtor, setDebtor] = useState(null);
  const [creditor, setCreditor] = useState(null);

  useEffect(() => {
    debts &&
      setPersonalStatus(
        debts.filter(
          (debt) =>
            debt.householdMember1 === user._id ||
            debt.householdMember2 === user._id
        )
      );
  }, [debts]);

  useEffect(() => {
    debts &&
      setDebtsToPay(
        personalStatus.filter((debt) => {
          if (user._id === debt.householdMember1) {
            return debt.moneyToPay > 0;
          } else if (user._id === debt.householdMember2) {
            return debt.moneyToReceive > 0;
          }
        })
      );
    debts &&
      setDebtsToReceive(
        personalStatus.filter((debt) => {
          if (user._id === debt.householdMember1) {
            return debt.moneyToReceive > 0;
          } else if (user._id === debt.householdMember2) {
            return debt.moneyToPay > 0;
          }
        })
      );
  }, [personalStatus, debts]);

  useEffect(() => {
    debts &&
      balances.length > 0 &&
      setDebtor(
        balances.find((debt) => {
          if (debtsToPay.length > 0) {
            return personalStatus[0].householdMember1 === user._id
              ? debt._id === personalStatus[0].householdMember1
              : debt._id === personalStatus[0].householdMember2;
          } else if (debtsToReceive.length > 0) {
            return personalStatus[0].householdMember1 === user._id
              ? debt._id === personalStatus[0].householdMember2
              : debt._id === personalStatus[0].householdMember1;
          }
        })
      );
    debts &&
      balances.length > 0 &&
      setCreditor(
        balances.find((debt) => {
          if (debtsToPay.length > 0) {
            return personalStatus[0].householdMember1 === user._id
              ? debt._id === personalStatus[0].householdMember2
              : debt._id === personalStatus[0].householdMember1;
          } else if (debtsToReceive.length > 0) {
            return personalStatus[0].householdMember1 === user._id
              ? debt._id === personalStatus[0].householdMember1
              : debt._id === personalStatus[0].householdMember2;
          }
        })
      );
  }, [balances, debts, personalStatus, debtsToPay, debtsToReceive]);

  const markAsPaid = (debt, isDebtToPay, isDebtToRecieve, user) => {
    if (isDebtToPay) {
      debt.payed = true;
    } else if (isDebtToRecieve) {
      debt.payedConfirmation = true;
    }
    const newDebts = debts.filter((debt) => debt._id !== debt._id);
    setDebts([...newDebts, debt]);
    user && updateDebts(token, user, newDebts, debt);
  };

  const updateDebts = async (token, user, newDebts, debt) => {
    try {
      console.log(newDebts);
      const response = await fetch(
        `http://localhost:5000/api/auth/household/${user.household_id._id}/one-debt`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newDebts: newDebts, debt: debt }),
        }
      );
      const data = await response.json();
      console.log(data);
      setUser(data);
      if (response.ok) {
        console.log('Debts updated');
      } else {
        console.error('Failed to update debts');
      }
    } catch (error) {
      console.error('Error updating debts:', error);
    }
  };
  const deleteDebt = async (debt) => {
    
  }

  return (
    <div className='personal-balance-section mt-10 mb-10 rounded-xl  grid grid-cols-2 '>
      <h2 className='text-left text-xl font-bold ml-10 mt-10'>
        Personal Balance
      </h2>
      <div>
        <h3 className='text-l font-bold'>You Owe</h3>
        <ul>
          {debtsToPay.length > 0 ? (
            debtsToPay.map((debt, index) => (
              <li key={index}>
                {!debt.payed
                  ? `You owe ${
                      creditor && creditor.username
                    } : $ ${debt.moneyToPay.toFixed(2)}`
                  : `Your payment of ${debt.moneyToPay.toFixed(2)} to ${
                      creditor && creditor.username
                    } is still pending confirmation!`}
                {!debt.payed && !debt.confirmPayed && (
                  <button onClick={() => markAsPaid(debt, true, false, user)}>
                    Mark as Paid
                  </button>
                )}
                {debt.payed && debt.confirmPayed && (
                  <button onClick={() => deleteDebt()}>Mark as Paid</button>
                )}
              </li>
            ))
          ) : (
            <li>You don't owe anyone money</li>
          )}
        </ul>
      </div>
      <div>
        <h3>Owed To You</h3>
        <ul>
          {debtsToReceive.length > 0 ? (
            debtsToReceive.map((debt, index) => (
              <li key={index}>
                {debtor && !debt.payedConfirmation
                  ? `${debtor.username} owes you : $ ${debt.moneyToPay.toFixed(
                      2
                    )}`
                  : `This debt has been settled!`}
                {debt.payed && !debt.payedConfirmation && (
                  <button onClick={() => markAsPaid(debt, false, true, user)}>
                    Settle Debt
                  </button>
                )}
                {debt.payedConfirmation && (
                  <button onClick={() => deleteDebt(debt)}></button>
                )}
              </li>
            ))
          ) : (
            <li>No one owes you money</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PersonalBalance;

//thursday version
// const PersonalBalance = ({ user, balances }) => {
//   const [personalStatus, setPersonalStatus] = useState([]);
//   const [userName, setUserName] = useState(null);

//   useEffect(() => {
//     console.log(user)
//     setUserName(localStorage.getItem('username'));
//   }, []);

//   useEffect(() => {
//     const calculatePersonalStatus = async (balances, username) => {
//       const user = balances.find((user) => user.username === username);

//       const owedInfo = [];

//       const usersOwing = balances.filter((user) => user.balance < 0);
//       const usersOwed = balances.filter((user) => user.balance > 0);

//       usersOwing.forEach((userOwing) => {
//         usersOwed.forEach((userOwed) => {
//           if (userOwing.balance < 0 && userOwed.balance > 0) {
//             const owed = {
//               userOwed: {
//                 username: userOwed.username,
//                 _id: userOwed._id,
//               },
//               moneyOwed: Math.min(-userOwing.balance, userOwed.balance),
//               user: {
//                 username: userOwing.username,
//                 _id: userOwing._id,
//               },
//             };

//             userOwed.balance -= owed.moneyOwed;
//             userOwing.balance += owed.moneyOwed;

//             owedInfo.push(owed);
//           }
//         });
//       });
//       try {
//         const response = await fetch(`http://localhost:5000/api/auth/debts`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//           // body: JSON.stringify({ debts: owedInfo }),
//         });
//         // const data = await response.json();
//         // console.log(data);
//       } catch (err) {
//         console.log(err);
//       }
//       setPersonalStatus(owedInfo);
//     };
//     calculatePersonalStatus(balances, userName);
//   }, [balances, userName]);
//   console.log(personalStatus);

//   const markAsPaid = async (debtorId, creditorId) => {
//     try {
//       await fetch('http://localhost:5000/api/auth/markdebtpaid', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ householdId: user.household_id, debtorId, creditorId }),
//       });

//     } catch (error) {
//       console.error('Error marking debt as paid:', error);
//     }
//   };

//   const confirmPayment = async (debtorId, creditorId) => {
//     try {
//       await fetch('http://localhost:5000/api/auth/confirmdebtpayment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ householdId: user.household_id, debtorId, creditorId }),
//       });
//     } catch (error) {
//       console.error('Error confirming debt payment:', error);
//     }
//   };

//   return (
//     <>

//     <div className="personal-balance-section grid grid-cols-2 mt-10 mb-10 rounded-xl">

//       <div>
//         <h3 className="text-l font-bold">You Owe</h3>
//         <ul>
//           {personalStatus
//             .filter((owed) => owed.user.username == userName)
//             .map((debt, index) => (
//               <li key={index}>
//                 You owe {debt.userOwed.username}: ${debt.moneyOwed.toFixed(2)}
//                 {/* {console.log(credit.debtor_id)} */}
//                 <button onClick={() => markAsPaid(debt.user._id, debt.userOwed._id)}>
//                   Mark as Paid
//                 </button>
//               </li>
//             ))}
//         </ul>
//       </div>
//       <div>
//         <h3 className="text-l font-bold">Owed To You</h3>
//         <ul>
//           {personalStatus
//             .filter((owed) => owed.userOwed.username == userName)
//             .map((credit, index) => (
//               <li key={index}>
//                 {credit.user.username} owes you: ${credit.moneyOwed.toFixed(2)}
//                 <button onClick={() => confirmPayment(credit.user._id, credit.userOwed._id)}>
//                   Settle
//                 </button>
//               </li>
//             ))}
//         </ul>
//       </div>
//     </div>
//     </>
//   );
// };

// export default PersonalBalance;

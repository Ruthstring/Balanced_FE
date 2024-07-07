import { data } from 'autoprefixer';
import { useState, useEffect } from 'react';

//FRIDAY VERSION


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

      setPersonalStatus(owedInfo);
    };

    if (userName) {
      calculatePersonalStatus(balances, userName);
    }
  }, [balances, userName]);

  const markAsPaid = async (debtorId, creditorId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/debts/${user.household_id}/${debtorId}/${creditorId}/pay`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const updatedStatus = personalStatus.map((debt) => {
          if (debt.user._id === debtorId && debt.userOwed._id === creditorId) {
            debt.payed = true;
          }
          return debt;
        });
        setPersonalStatus(updatedStatus);
      } else {
        console.error('Failed to mark debt as paid:', response.statusText);
      }
    } catch (error) {
      console.error('Error marking debt as paid:', error);
    }
  };

  const confirmPayment = async (debtorId, creditorId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/debts/${user.household_id}/${debtorId}/${creditorId}/confirm`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const updatedStatus = personalStatus.map((debt) => {
          if (debt.user._id === debtorId && debt.userOwed._id === creditorId) {
            debt.payedConfirmation = true;
          }
          return debt;
        });
        setPersonalStatus(updatedStatus);
      } else {
        console.error('Failed to confirm debt payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error confirming debt payment:', error);
    }
  };

  return (
    <>
      <div className="personal-balance-section grid grid-cols-2 mt-10 mb-10 rounded-xl">
        <div>
          <h3 className="text-l font-bold">You Owe</h3>
          <ul>
            {personalStatus
              .filter((owed) => owed.user.username === userName && !owed.payed)
              .map((debt, index) => (
                <li key={index}>
                  You owe {debt.userOwed.username}: ${debt.moneyOwed.toFixed(2)}
                  <button onClick={() => markAsPaid(debt.user._id, debt.userOwed._id)}>
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
              .filter((owed) => owed.userOwed.username === userName && !owed.payedConfirmation)
              .map((credit, index) => (
                <li key={index}>
                  {credit.user.username} owes you: ${credit.moneyOwed.toFixed(2)}
                  <button onClick={() => confirmPayment(credit.user._id, credit.userOwed._id)}>
                    Confirm Payment
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

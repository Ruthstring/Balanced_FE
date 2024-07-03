import React, { useState, useEffect } from 'react';
const PersonalBalance = ({ balances }) => {
  const [personalStatus, setPersonalStatus] = useState([]);
  const[userName,setUserName]=useState(null)

 useEffect(()=>{
  setUserName(localStorage.getItem('username'))
 },[])

  useEffect(() => {
    
    calculatePersonalStatus(balances,userName);
  }, [balances,userName]);
  
  const calculatePersonalStatus = (balances,username) => {
   
   const user = balances.find(user => user.username === username);
    
    if (!user) {
      console.error('User balance not found for username:', username);
      return;
    }

    const owedInfo = [];

    // Find users who owe money (negative balance)
    const usersOwing = balances.filter(user => user.balance < 0);

    // Find users who are owed money (positive balance)
    const usersOwed = balances.filter(user => user.balance > 0);

    // Calculate debts and owed amounts
    usersOwing.forEach(userOwing => {
      usersOwed.forEach(userOwed => {
        if (userOwing.balance < 0 && userOwed.balance > 0) {
          const owed = {
           
            userOwed: {username:userOwed.username,
              _id:userOwed._id
            },
            moneyOwed: Math.min(-userOwing.balance, userOwed.balance),
            user: {username:userOwing.username,
              _id:userOwing._id
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
console.log(personalStatus)
  return (
    <>
    <h2 className="text-left text-xl font-bold ml-10 mt-10">Personal Balance</h2>
    <div className="personal-balance-section grid grid-cols-2 mt-10 mb-10 rounded-xl">
      
      <div>
        <h3 className="text-l font-bold">You Owe</h3>
        <ul>
          {personalStatus.filter(owed=>owed.user.username==userName).map((debt, index) => (
            <li key={index}>
              You owe {debt.userOwed.username}: ${debt.moneyOwed.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-l font-bold">Owed To You</h3>
        <ul>
          {personalStatus.filter(owed=>owed.userOwed.username==userName).map((credit, index) => (
            <li key={index}>
              {credit.user.username} owes you: ${credit.moneyOwed.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default PersonalBalance;

// const PersonalBalance = ({ balances }) => {
//   const [personalStatus, setPersonalStatus] = useState({ owes: [], owed: [] });

//   useEffect(() => {
//     calculatePersonalStatus(balances);
//   }, [balances]);

//   const calculatePersonalStatus = (balances) => {
//     const username = localStorage.getItem('username'); // Assuming username is stored in localStorage
//     console.log('Stored username:', username);
//     console.log('Fetched balances:', balances);

//     // Find user balance by username
//     const userBalance = balances.find(user => user.username === username);
//     if (!userBalance) {
//       console.error('User balance not found for username:', username);
//       console.log('Available usernames:', balances.map(user => user.username));
//       return;
//     }

//     console.log('User balance found:', userBalance);
//     const debts = { owes: [], owed: [] };
//     const userDebts = userBalance.debts;
//     console.log('User debts:', userDebts);

//     Object.keys(userDebts).forEach(debtorId => {
//       const debtAmount = userDebts[debtorId];
//       const debtor = balances.find(user => user._id === debtorId);

//       if (debtor) {
//         if (debtAmount > 0) {
//           debts.owed.push({ from: debtor.username, to: username, amount: debtAmount });
//         } else if (debtAmount < 0) {
//           debts.owes.push({ from: username, to: debtor.username, amount: -debtAmount });
//         }
//       }
//     });

//     console.log('Calculated personal status:', debts);
//     setPersonalStatus(debts);
//   };



//   return (
//     <div className="personal-balance-section">
//       <h2>Personal Balance</h2>
//       <div>
//         <h3>You Owe</h3>
//         <ul>
//           {personalStatus.owes.map((debt, index) => (
//             <li key={index}>
//               You owe {debt.to}: ${debt.amount.toFixed(2)}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h3>Owed To You</h3>
//         <ul>
//           {personalStatus.owed.map((credit, index) => (
//             <li key={index}>
//               {credit.from} owes you: ${credit.amount.toFixed(2)}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default PersonalBalance;


import React, { useState, useEffect } from 'react';

const PersonalBalance = ({ balances }) => {
  const [personalStatus, setPersonalStatus] = useState({ owes: [], owed: [] });

  useEffect(() => {
    calculatePersonalStatus(balances);
  }, [balances]);

  const calculatePersonalStatus = (balances) => {
    const username = localStorage.getItem('username'); // Assuming username is stored in localStorage
    console.log('Stored username:', username);
    console.log('Fetched balances:', balances);

    // Find user balance by username
    const userBalance = balances.find(user => user.username === username);
    if (!userBalance) {
      console.error('User balance not found for username:', username);
      console.log('Available usernames:', balances.map(user => user.username));
      return;
    }

    console.log('User balance found:', userBalance);
    const debts = { owes: [], owed: [] };
    const userDebts = userBalance.debts;
    console.log('User debts:', userDebts);

    Object.keys(userDebts).forEach(debtorId => {
      const debtAmount = userDebts[debtorId];
      const debtor = balances.find(user => user._id === debtorId);

      if (debtor) {
        if (debtAmount > 0) {
          debts.owed.push({ from: debtor.username, to: username, amount: debtAmount });
        } else if (debtAmount < 0) {
          debts.owes.push({ from: username, to: debtor.username, amount: -debtAmount });
        }
      }
    });

    console.log('Calculated personal status:', debts);
    setPersonalStatus(debts);
  };

// const PersonalBalance = ({ balances }) => {
//   const [personalStatus, setPersonalStatus] = useState({ owes: [], owed: [] });

//   useEffect(() => {
//     calculatePersonalStatus(balances);
//   }, [balances]);

//   const calculatePersonalStatus = (balances) => {
//     const username = localStorage.getItem('username');
//     const userBalance = balances.find(user => user.username === username);
//     if (!userBalance) {
//       console.error('User balance not found for username:', username);
//       return;
//     }
   
//     const debts = { owes: [], owed: [] };
//     const userDebts = userBalance.debts;

//     Object.keys(userDebts).forEach(debtorId => {
//       const debtAmount = userDebts[debtorId];
//       const debtor = balances.find(user => user._id === debtorId);

//       if (debtAmount > 0) {
//         console.log(debtAmount);
//         debts.owed.push({ from: debtor.username, to: username, amount: debtAmount });
//       } else if (debtAmount < 0) {
//         debts.owes.push({ from: username, to: debtor.username, amount: -debtAmount });
//       }
//     });
//      console.log(debts);
//     setPersonalStatus(debts);
//   };

  return (
    <div className="personal-balance-section">
      <h2>Personal Balance</h2>
      <div>
        <h3>You Owe</h3>
        <ul>
          {personalStatus.owes.map((debt, index) => (
            <li key={index}>
              You owe {debt.to}: ${debt.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Owed To You</h3>
        <ul>
          {personalStatus.owed.map((credit, index) => (
            <li key={index}>
              {credit.from} owes you: ${credit.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
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
//       return;
//     }

//     console.log('User balance found:', userBalance);

//     // Placeholder for actual debt calculation logic
//     const debts = { owes: [], owed: [] };
//     const members = balances.map(user => ({ _id: user._id, username: user.username })); // Placeholder for members data
//     const memberCount = members.length; // Placeholder for member count

//     // Example calculation placeholder
//     members.forEach(member => {
//       members.forEach(otherMember => {
//         if (member._id !== otherMember._id) {
//           const sharePerMember = 100; // Placeholder for share calculation
//           const payments = {}; // Placeholder for payments data
//           const debt = sharePerMember / memberCount - payments[otherMember._id] / memberCount;

//           if (debt > 0) {
//             // Member owes money to otherMember
//             debts.owes.push({ from: member.username, to: otherMember.username, amount: debt });
//           } else if (debt < 0) {
//             // Member is owed money by otherMember
//             debts.owed.push({ from: otherMember.username, to: member.username, amount: -debt });
//           }
//         }
//       });
//     });

//     console.log('Calculated personal status:', debts);
//     setPersonalStatus(debts); // Update component state with calculated debts
//   };

//   return (
//     <div className="personal-balance-section">
//       <h2>Personal Balance</h2>
//       <div>
//         <h3>You Owe</h3>
//         <ul>
//           {personalStatus.owes && personalStatus.owes.map((debt, index) => (
//             <li key={index}>
//               You owe {debt.to}: ${debt.amount.toFixed(2)}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h3>Owed To You</h3>
//         <ul>
//           {personalStatus.owed && personalStatus.owed.map((credit, index) => (
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
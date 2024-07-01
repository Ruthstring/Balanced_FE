import React, { useState, useEffect } from 'react';

const PersonalBalance = ({ balances }) => {
  const [personalStatus, setPersonalStatus] = useState([]);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    setUserName(localStorage.getItem('username'));
  }, []);

  useEffect(() => {
    calculatePersonalStatus(balances, userName);
  }, [balances, userName]);

  const calculatePersonalStatus = (balances, username) => {
    const user = balances.find(user => user.username === username);

    if (!user) {
      console.error('User balance not found for username:', username);
      return;
    }

    const owedInfo = [];

    const usersOwing = balances.filter(user => user.balance < 0);
    const usersOwed = balances.filter(user => user.balance > 0);

    usersOwing.forEach(userOwing => {
      usersOwed.forEach(userOwed => {
        if (userOwing.balance < 0 && userOwed.balance > 0) {
          const owed = {
            userOwed: {
              username: userOwed.username,
              _id: userOwed._id
            },
            moneyOwed: Math.min(-userOwing.balance, userOwed.balance),
            user: {
              username: userOwing.username,
              _id: userOwing._id
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

  const settleDebt = async (userId, amount) => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token not found in local storage.');
        return;
      }
  
      const response = await fetch('http://localhost:5000/api/auth/settle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ payeeId: userId, amount })
      });
  
      if (!response.ok) {
        throw new Error('Error settling debt');
      }
  
  // const settleDebt = async (userId, amount) => {
  //   try {
  //     console.log('Payer ID:', localStorage.getItem('userId'));
  //     console.log('Payee ID:', userId);
  
  //     const response = await fetch('http://localhost:5000/api/auth/settle', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       },
  //       body: JSON.stringify({ payerId: localStorage.getItem('userId'), payeeId: userId, amount })
  //     });

  //     if (!response.ok) {
  //       throw new Error('Error settling debt');
  //     }

      // Remove settled debt from UI immediately
      setPersonalStatus(prevStatus => prevStatus.filter(debt => debt.userOwed._id !== userId));

      // Send notification to the person owed
      await sendNotification(userId, amount);

      alert('Debt settled successfully!');
    } catch (error) {
      console.error('Error settling debt:', error);
    }
  };

  const sendNotification = async (userId, amount) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          senderId: localStorage.getItem('userId'),
          receiverId: userId,
          message: `You received a payment of ${amount} euros`
        })
      });

      if (!response.ok) {
        throw new Error('Error sending notification');
      }

      alert('Notification sent!');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };



// const PersonalBalance = ({ balances }) => {
//   const [personalStatus, setPersonalStatus] = useState([]);
//   const[userName,setUserName]=useState(null)


//  useEffect(()=>{
//   setUserName(localStorage.getItem('username'))
//  },[])

//   useEffect(() => {
    
//     calculatePersonalStatus(balances,userName);
//   }, [balances,userName]);
  
//   useEffect(()=>{
//   const addDebtsInfo=async(personalStatus)=>{
//     const userDebt= personalStatus.filter(owed=>owed.user.username==userName);
//     const userCredit=personalStatus.filter(owed=>owed.userOwed.username==userName);
//     const userId = personalStatus[0]?.userOwed?._id;

//     if (!userId) {
//       console.error('User ID not found');
//       return;
//     }
//     try {
//       const response = await fetch(`http://localhost:5000/api/auth/users/${userId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
//         body: JSON.stringify({debts:[...userDebt,...userCredit]})
//       });

//       const data = await response.json();
//       console.log(data);

//     } catch (error) {
//       console.error('Error creating household:', error);
//     }
//   }
//   addDebtsInfo(personalStatus);
//   },[personalStatus])
  

  
//   const calculatePersonalStatus = (balances,username) => {
   
//    const user = balances.find(user => user.username === username);
    
//     if (!user) {
//       console.error('User balance not found for username:', username);
//       return;
//     }

//     const owedInfo = [];

//     // Find users who owe money (negative balance)
//     const usersOwing = balances.filter(user => user.balance < 0);

//     // Find users who are owed money (positive balance)
//     const usersOwed = balances.filter(user => user.balance > 0);

//     // Calculate debts and owed amounts
//     usersOwing.forEach(userOwing => {
//       usersOwed.forEach(userOwed => {
//         if (userOwing.balance < 0 && userOwed.balance > 0) {
//           const owed = {
           
//             userOwed: {username:userOwed.username,
//               _id:userOwed._id
//             },
//             moneyOwed: Math.min(-userOwing.balance, userOwed.balance),
//             user: {username:userOwing.username,
//               _id:userOwing._id
//             },
//           };

//           userOwed.balance -= owed.moneyOwed;
//           userOwing.balance += owed.moneyOwed;

//           owedInfo.push(owed);
//         }

//       });
    
//     });

   
  
//     setPersonalStatus(owedInfo);
//   };
// console.log(personalStatus)

// //notification buttons:

// const sendReminder = async (userId, amount) => {
//   try {
//     const response = await fetch('http://localhost:5000/api/auth/notifications/send', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       },
//       body: JSON.stringify({ senderId: localStorage.getItem('userId'), receiverId: userId, message: `You owe ${amount} euros` })
//     });
//     if (!response.ok) {
//       throw new Error('Error sending reminder');
//     }
//     alert('Reminder sent!');
//   } catch (error) {
//     console.error('Error sending reminder:', error);
//   }
// };

// const settleDebt = async (userId, amount) => {
//   try {
//     const response = await fetch('http://localhost:5000/api/auth/settle', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`
//       },
//       body: JSON.stringify({ payerId: localStorage.getItem('userId'), payeeId: userId, amount })
//     });
//     if (!response.ok) {
//       throw new Error('Error settling debt');
//     }
//     alert('Debt settled!');
//     // Update balances after settling the debt
//     // You can refetch balances or update the state directly
//   } catch (error) {
//     console.error('Error settling debt:', error);
//   }
// };



  return (
    <div className="personal-balance-section mt-10 mb-10 rounded-xl">
      <h2 className="text-left text-xl font-bold ml-10 mt-10">Personal Balance</h2>
      <div>
        <h3>You Owe</h3>
        <ul>
          {personalStatus.filter(owed=>owed.user.username==userName).map((debt, index) => (
            <li key={index}>
              

              You owe {debt.userOwed.username}: ${debt.moneyOwed.toFixed(2)}

          
              {/* {console.log(credit.debtor_id)} */}
              <button onClick={() => settleDebt(debt.userOwed._id, debt.moneyOwed)}>Settle</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Owed To You</h3>
        <ul>
          {personalStatus.filter(owed=>owed.userOwed.username==userName).map((credit, index) => (
            <li key={index}>
              {credit.user.username} owes you: ${credit.moneyOwed.toFixed(2)}
              {/* <button onClick={() => sendReminder(credit.user._id, credit.moneyOwed)}>Send Reminder</button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PersonalBalance;


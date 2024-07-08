import { useState, useEffect } from 'react';

const PersonalBalance = ({ token, user, balances, debts, setDebts }) => {
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
    // const newPersonalStatus = personalStatus.filter(
    //   (debt) => debt._id !== debt._id
    // );
    // setPersonalStatus([...newPersonalStatus, debt]);
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
      
      if (response.ok) {
        console.log('Debts updated');
      } else {
        console.error('Failed to update debts');
      }
    } catch (error) {
      console.error('Error updating debts:', error);
    }
  };

  const deleteDebt = (debt) => {
    const newDebts = debts.filter((debt) => debt._id !== debt._id);
    debt.moneyToPay = 0;
    debt.moneyToReceive = 0;
    debt.payed = false;
    debt.payedConfirmation = false;
    newDebts.push(debt);
  };

  return (
    <div className='personal-balance-section mt-10 mb-10 rounded-xl'>
      <h2 className='text-left text-xl font-bold ml-10 mt-10'>
        Personal Balance
      </h2>
      <div>
        <h3>You Owe</h3>
        <ul>
          {debtsToPay.length > 0 ? (
            debtsToPay.map((debt, index) => (
              <li key={index}>
                {!debt.payed ? `You owe ${creditor && creditor.username} : $ ${debt.moneyToPay.toFixed(2)}` : `Your payment of ${debt.moneyToPay.toFixed(2)} to ${creditor && creditor.username} is still pending confirmation!`}
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
                {debt.payed && !debt.payedConfirmation &&  (
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

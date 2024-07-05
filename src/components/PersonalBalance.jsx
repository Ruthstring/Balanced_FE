import { useState, useEffect } from 'react';

const PersonalBalance = ({ user, balances, debts }) => {
  debts && console.log(debts);
  const [personalStatus, setPersonalStatus] = useState([]);
  const [debtsToPay, setDebtsToPay] = useState([]);
  const [debtsToReceive, setDebtsToReceive] = useState([]);
  const [debtor, setDebtor] = useState(null);
  const [creditor, setCreditor] = useState(null);

  useEffect(() => {
    setPersonalStatus(
      debts.filter(
        (debt) =>
          debt.householdMember1 === user._id ||
          debt.householdMember2 === user._id
      )
    );
  }, [debts]);

  useEffect(() => {
    setDebtsToPay(
      personalStatus.filter((debt) => {
        if (user._id === debt.householdMember1) {
          return debt.moneyToPay > 0;
        } else if (user._id === debt.householdMember2) {
          return debt.moneyToReceive > 0;
        }
      })
    );
    setDebtsToReceive(
      personalStatus.filter((debt) => {
        if (user._id === debt.householdMember1) {
          return debt.moneyToReceive > 0;
        } else if (user._id === debt.householdMember2) {
          return debt.moneyToPay > 0;
        }
      })
    );
  }, [personalStatus]);

  useEffect(() => {
    debts &&
      balances.length > 0 &&
      setDebtor(
        balances.find((debt) =>
          personalStatus[0].householdMember1 === user._id
            ? debt._id === personalStatus[0].householdMember2
            : debt._id === personalStatus[0].householdMember1
        )
      );
    debts &&
      balances.length > 0 &&
      setCreditor(
        balances.find((debt) =>
          personalStatus[0].householdMember1 === user._id
            ? debt._id === personalStatus[0].householdMember1
            : debt._id === personalStatus[0].householdMember2
        )
      );
  }, [balances]);

  // console.log(debtor);
  console.log(debtsToPay);
  console.log(debtsToReceive);
  console.log(creditor);
  console.log(debtor);

  const markAsPaid = (debt, debtToPay, debtToRecieve, user) => {
    if (debtToPay) {
      debt.payed = `${user.username} has payed you ${debt.moneyToPay}`;
      console.log(debt);
    } else if (debtToRecieve) {
      debt.payedConfirmation = `${user.username} confirmed that you have payed ${debt.moneyToPay}`;
      console.log(debt);
    }
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
                You owe {creditor && creditor.username}: $
                {debt.moneyToPay.toFixed(2)}
                <button
                // onClick={() => settleDebt(debt)}
                >
                  Mark as Paid
                </button>
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
                {debtor && debtor.username} owes you : $
                {debt.moneyToPay.toFixed(2)}
                <button
                // onClick={() => settleDebt(debt.user._id, debt.moneyOwed)}
                >
                  Mark as Paid
                </button>
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

import React from 'react';
import ATMDeposit from './ATMDeposit';

const Account = () => {
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [selectedMode, setSelectedMode] = React.useState('');

  let status = `Account Balance $ ${totalState}`;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    const enteredAmount = Number(event.target.value);

    if (enteredAmount <= 0 || isNaN(enteredAmount)) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }

    setDeposit(enteredAmount);
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    const selectedMode = event.target.value;
    setValidTransaction(false);
    setSelectedMode(selectedMode);
    setIsDeposit(selectedMode === 'Deposit');
  };

  return (
    <form onSubmit={handleSubmit}>
      <>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option id="Withdrawal-selection" value="Withdrawal">
            Withdrawal
          </option>
        </select>
        {selectedMode && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}
          ></ATMDeposit>
        )}
      </>
    </form>
  );
};

export default Account;

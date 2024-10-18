import { useState } from "react";

const AccountOverviewWidget = () => {
  // Sample data for accounts, deposits, and loans
  const [accounts, setAccounts] = useState([
    { name: "Current Account", balance: "5000 PLN" },
    { name: "Savings Account", balance: "15000 PLN" },
  ]);

  const [deposits, setDeposits] = useState([
    { name: "3-month Deposit", amount: "10000 PLN", interest: "1.5%" },
    { name: "6-month Deposit", amount: "15000 PLN", interest: "2.0%" },
  ]);

  const [loans, setLoans] = useState([
    { name: "Mortgage Loan", amount: "200000 PLN", interest: "3.5%" },
    { name: "Personal Loan", amount: "10000 PLN", interest: "7.0%" },
  ]);

  return (
    <div className="p-8 bg-[#d1f1e5] text-commerzBlue max-w-md mx-auto rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Account Overview</h2>

      {/* Accounts */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Accounts</h3>
        <ul>
          {accounts.map((account, index) => (
            <li key={index} className="mb-2 flex justify-between">
              <span>{account.name}</span>
              <span>{account.balance}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Term Deposits */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Term Deposits</h3>
        <ul>
          {deposits.map((deposit, index) => (
            <li key={index} className="mb-2 flex justify-between">
              <span>{deposit.name}</span>
              <span>{deposit.amount} ({deposit.interest} interest)</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Loans */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Loans</h3>
        <ul>
          {loans.map((loan, index) => (
            <li key={index} className="mb-2 flex justify-between">
              <span>{loan.name}</span>
              <span>{loan.amount} ({loan.interest} interest)</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountOverviewWidget;

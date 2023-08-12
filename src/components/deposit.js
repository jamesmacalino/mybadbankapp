import { useState } from "react";
import Card from "./context";
import { UserContext } from "./context";
import { useContext } from "react";

function Deposit() {
  const [show, setShow] = useState(true);
  const [deposit, setDeposit] = useState("");
  const [status, setStatus] = useState("");
  const ctx = useContext(UserContext);
  const james = ctx.users.find(x => x.name === 'james');

  function validate(field, label) {
    if (!field || isNaN(field) || field < 0) {
      setStatus("Oops! Can't " + label + "!");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleDeposit() {
    console.log(deposit);
    if (!validate(deposit, "deposit")) return;
    ctx.users = [{...james, balance: james.balance + deposit*1}];
    ctx.submissions.push({type: 'New Deposit', data: {amount: deposit*1}});
    setShow(false);
  }

  function clearForm() {
    setDeposit("");
    setShow(true);
  }

  function isDisabled() {
    if (!deposit) return true;
    return false;
  }

  return (
    <Card
      bgcolor="success"
      header="Cash Deposit"
      status={status}
      body={
        show ? (
          <>
            Balance: ${james.balance}
            <br />
            Deposit
            <br />
            <input
              type="input"
              className="form-control"
              id="deposit"
              placeholder="Please enter deposit amount"
              value={deposit}
              onChange={(e) => setDeposit(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleDeposit}
              disabled={isDisabled()}
            >
              Click To Deposit
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another deposit
            </button>
          </>
        )
      }
    />
  );
}

export default Deposit;
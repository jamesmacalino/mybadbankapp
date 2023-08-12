import React, {useState, useContext} from 'react';
import { UserContext } from './context';
import Card from './context';

function Withdraw() {
  const [show, setShow] = useState(true);
  const [withdraw, setWithdraw] = useState("");
  const [status, setStatus] = useState("");
  const ctx = useContext(UserContext);
  const james = ctx.users.find(x => x.name === 'james');

  function validate(field, label) {
    if (!field || isNaN(field) || james.balance < field) {
      setStatus("Error! Can't " + label + " that much!");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handlewithdraw() {
    console.log(withdraw);
    if (!validate(withdraw, "withdraw")) return;
    ctx.users = [{...james, balance: james.balance - withdraw*1}];
    ctx.submissions.push({type: 'New Withdraw', data: {amount: withdraw*1}});
    setShow(false);
  }

  function clearForm() {
    setWithdraw("");
    setShow(true);
  }

  function isDisabled() {
    if (!withdraw) return true;
    return false;
  }

  return (
    <Card
      bgcolor="danger"
      header="Cash Withdrawal"
      status={status}
      body={
        show ? (
          <>
            Balance: ${james.balance}
            <br />
            Withdraw
            <br />
            <input
              type="input"
              className="form-control"
              id="withdraw"
              placeholder="Withdraw Amount"
              value={withdraw}
              onChange={(e) => setWithdraw(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handlewithdraw}
              disabled={isDisabled()}
            >
              Click To withdraw
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another withdraw
            </button>
          </>
        )
      }
    />
  );
}

export default Withdraw;
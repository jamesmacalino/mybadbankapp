// Import necessary modules, hooks, contexts, and components
import React, { useState } from "react";
import Card, { UserContext } from "./context";
import { Link } from "react-router-dom";
import '../App.css'

function Login() {
    const [checkEmail, setCheckEmail] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [show, setShow] = useState(true);
    const [status, setStatus] = useState("");

    const ctx = React.useContext(UserContext);

    function validate(password, email) {
        const user = ctx.users.find((user) => user.email === email);
        if (!user || user.password !== password) {
            setStatus("Error: Invalid login credentails");
            setTimeout(() => setStatus(""), 3000);
            return false;
        }
        return true;
    }

    function handleLogin(e) {
        e.preventDefault();
        if (!validate(checkPassword, checkEmail)) return;

        const user = ctx.users.find(
            (user) => user.email === checkEmail && user.password === checkPassword
        );

        if (user) {
            ctx.setCurrentUser(user);
            setShow(false);
        }
        else {
            setStatus('Error: Invalid email or password');
            setTimeout(() => setStatus(''), 3000);
        }
    }

    // component return
    return (
        show ? (

            <Card
                bgcolor="warning"
                header="Login"
                status={status}
                body=
                <form onSubmit={handleLogin} >
                    <div>
                        <label>Email address</label>
                        <br />
                        <input
                            type="input"
                            className="form-control"
                            id="emailCheck"
                            placeholder="Email"
                            value={checkEmail}
                            onChange={(e) => setCheckEmail(e.currentTarget.value)}
                        />
                        <br />
                        <label>Password</label>
                        <br />
                        <input
                            type="password"
                            className="form-control"
                            id="passwordCheck"
                            placeholder="Password"
                            value={checkPassword}
                            onChange={(e) => setCheckPassword(e.currentTarget.value)}
                        />
                        <br />
                        <button
                            type="submit"
                            className="btn btn-light button-spacing"
                            disabled={!checkEmail || !checkPassword}
                        >
                            Login
                        </button>
                        <button type="button" className="btn btn-light button-spacing">
                            <Link className="nav-link" to="/createaccount/">
                                Create Account
                            </Link>
                        </button>
                    </div>
                </form>
            />

        ) : (
            <Card
                bgcolor="primary"
                header={`Welcome, ${ctx.currentUser.name}`}
                status={status}
                body={
                    <>
                        <div>
                            <text>Balance: ${ctx.currentUser ? ctx.currentUser.balance : '0'}</text>
                        </div>
                        <button type="deposit" className="btn btn-light button-spacing">
                            {" "}
                            <Link className="nav-link" to="/deposit/">
                                Deposit
                            </Link>
                        </button>
                        <button type="withdraw" className="btn btn-light button-spacing">
                            {" "}
                            <Link className="nav-link" to="/withdraw/">
                                Withdraw
                            </Link>
                        </button>

                    </>
                }
            />
        )


    );
}

export default Login
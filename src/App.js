import { Route, HashRouter, Routes, useNavigate } from "react-router-dom";
import CreateAccount from "./components/createaccount";
import Balance from "./components/balance";
import Withdraw from "./components/withdraw";
import Home from "./components/home";
import Deposit from "./components/deposit";
import AllData from "./components/alldata";
import Login from "./components/login";
import NavBar from "./components/navbar";
import { UserContext } from "./components/context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider
        value={{
          users: [
            {
              name: "james",
              email: "james@usafa.edu",
              password: "secret",
              balance: 100,
            },
          ],
          submissions: [
            {
              type: "New User",
              data: {
                name: "james",
                email: "james@usafa.edu",
                password: "secret",
                balance: 100,
              },
            },
          ],
        }}
      >
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/CreateAccount/" element={<CreateAccount />} />
          <Route path="/balance/" element={<Balance />} />
          <Route path="/deposit/" element={<Deposit />} />
          <Route path="/withdraw/" element={<Withdraw />} />
          <Route path="/alldata/" element={<AllData />} />
          <Route path="/login/" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </HashRouter>
  );
}
export default App;
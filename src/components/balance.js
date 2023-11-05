import { useState } from "react";
import Card from "./context";
import { UserContext } from "./context";
import { useContext } from "react";

function Balance(){
    return(
        <Card
            bgcolor="success"
            header="Balance"
            status=""
            body=""
        />
    )
}

export default Balance;
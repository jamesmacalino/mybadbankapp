import React, { useState } from "react";
import Card, { UserContext } from "./context";
import { Link } from "react-router-dom";
import '../App.css'

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
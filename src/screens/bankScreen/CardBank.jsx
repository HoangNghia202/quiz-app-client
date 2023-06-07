import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";

function CardBank({ bank }) {
    console.log("props", bank);
    const numOfQuestion = bank.questions.length;
    return (
        <div className="rounded-lg border border-cyan-50 max-w-xs mb-6 cursor-pointer hover:shadow-md hover:shadow-white">
            <div className="p-3">
                <div className="cart-title py-2 border-b-2 border-b-white">
                    <h3>{bank.bankName}</h3>
                    <p>Desciption: {bank.desc}</p>
                </div>
                <Divider style={{ color: "white" }} />
                <div className="card-body mt-3">
                    <p className=""> Questions: {numOfQuestion}</p>
                    <p className=""> userAccess: {bank.usersAccessed.length}</p>
                </div>
            </div>
        </div>
    );
}

export default CardBank;

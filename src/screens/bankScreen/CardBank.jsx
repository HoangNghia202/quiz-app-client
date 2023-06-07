import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import { useDispatch } from "react-redux";
import { setBankSelected } from "../../redux/bankSlice";
function CardBank({ bank }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const closeAlert = () => {
        setOpenAlert(false);
    };
    const handleOnclickCard = () => {
        console.log("bank Id>>>", bank._id);
        dispatch(setBankSelected(bank));
        navigate(`/bank/${bank._id}`);
    };
    console.log("props", bank);
    const numOfQuestion = bank.questions.length;
    return (
        <>
            <div
                className="rounded-lg border border-cyan-50 max-w-xs mb-6 cursor-pointer hover:shadow-md hover:shadow-white"
                onClick={() => setOpenAlert(true)}
            >
                <div className="p-3">
                    <div className="cart-title py-2 border-b-2 border-b-white">
                        <h3>{bank.bankName}</h3>
                        <p>Desciption: {bank.desc}</p>
                    </div>
                    <Divider style={{ color: "white" }} />
                    <div className="card-body mt-3">
                        <p className=""> Questions: {numOfQuestion}</p>
                        <p className="">
                            {" "}
                            userAccess: {bank.usersAccessed.length}
                        </p>
                    </div>
                </div>
            </div>

            <Notification
                open={openAlert}
                type={"alert"}
                title={"Alert"}
                content={`Start quiz bank ${bank.bankName} ?`}
                handleClose={closeAlert}
                next={handleOnclickCard}
            />
        </>
    );
}

export default CardBank;

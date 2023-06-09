import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import { useDispatch } from "react-redux";
import {
    fetchBanksData,
    setBankSelected,
    setBanks,
} from "../../redux/bankSlice";
import alertImg from "../../assets/img/alert.png";
import { addAccessedUser } from "../../services/bankServices";
import { useSelector } from "react-redux";
function CardBank({ bank }) {
    const token = useSelector((state) => state.user.userReducer.accessToken);
    const currentUser = useSelector((state) => state.user.userReducer.userInfo);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const closeAlert = () => {
        setOpenAlert(false);
    };
    const CheckUserJoined = () => {
        if (bank.usersAccessed.includes(currentUser._id)) {
            return true;
        }
        return false;
    };
    const handleOnclickCard = async () => {
        console.log("bank Id>>>", bank._id);
        const res = await addAccessedUser(token, bank._id, currentUser._id);
        if (res.errCode === 0) {
            await fetchBanksData(token, dispatch);
        }
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
                        <div className="flex flex-row">
                            <div>
                                {" "}
                                <p className=""> Questions: {numOfQuestion}</p>
                                <p className="">
                                    {" "}
                                    Accessed: {bank.usersAccessed.length}
                                </p>
                            </div>

                            <div className="ml-auto">
                                <p className="">
                                    {" "}
                                    {CheckUserJoined() ? "You joined" : ""}
                                </p>
                            </div>
                        </div>
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
                imageUrl={alertImg}
            />
        </>
    );
}

export default CardBank;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { fetchBanksData } from "../redux/bankSlice";
import CardBank from "./bankScreen/CardBank";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user);
    const banks = useSelector((state) => state.bank.banks);
    console.log("currentUser", currentUser);
    const token = useSelector((state) => state.user.accessToken);
    const beginFetchBanksData = async () => {
        await fetchBanksData(token, dispatch);
    };
    useEffect(() => {
        beginFetchBanksData();
    }, []);
    const handleLogout = () => {
        console.log("logout");
        dispatch(logout());
        navigate("/login");
    };

    return (
        <>
            <div className="h-100vh">
                <button onClick={() => handleLogout()}>Logout</button>

                <div className="  grid justify-center sm:grid-cols-2   lg:grid-cols-3 ">
                    {banks.map((bank, index) => {
                        return (
                            <div key={index} className="col-span-1">
                                <CardBank bank={bank} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Home;

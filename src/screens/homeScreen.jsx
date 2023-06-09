import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { fetchBanksData } from "../redux/bankSlice";
import CardBank from "./bankScreen/CardBank";
import NavBar from "./NavBar";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.userReducer);
    const banks = useSelector((state) => state.bank.banks);
    console.log("currentUser", currentUser);
    const token = useSelector((state) => state.user.userReducer.accessToken);
    const beginFetchBanksData = async () => {
        await fetchBanksData(token, dispatch);
    };
    useEffect(() => {
        beginFetchBanksData();
    }, []);

    const handleDownloadTemplate = () => {
        const fileUrl = "/src/assets/template/template.xlsx";
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "template.xlsx";
        link.click();
    };

    return (
        <>
            <div className="h-100vh relative">
                <NavBar
                    userName={
                        currentUser.userInfo.firstName +
                        " " +
                        currentUser.userInfo.lastName
                    }
                />

                <div className=" h-16"></div>
                <div>
                    <div className="  grid justify-center sm:grid-cols-2  px-14  lg:grid-cols-3 mt-10 ">
                        {banks.map((bank, index) => {
                            return (
                                <div key={index} className="col-span-1">
                                    <CardBank bank={bank} />
                                </div>
                            );
                        })}
                    </div>
                    {/* 
                    <button onClick={() => handleDownloadTemplate()}>
                        download
                    </button> */}
                </div>
            </div>
        </>
    );
};

export default Home;

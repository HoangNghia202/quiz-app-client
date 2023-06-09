import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { fetchBanksData } from "../redux/bankSlice";
import CardBank from "./bankScreen/CardBank";
import NavBar from "./NavBar";
import { Button } from "@mui/material";
import { createExcelTemplate, importBank } from "../services/bankServices";
import { toast } from "react-toastify";
import GuideDialog from "./components/GuideDialog";

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

    const [openGuideDialog, setOpenGuideDialog] = useState(false);
    const [reRender, setReRender] = useState(0);
    useEffect(() => {
        beginFetchBanksData();
    }, [reRender]);

    const doReRender = () => {
        setReRender(reRender + 1);
    };

    const handleCloseGuideDialog = () => {
        setOpenGuideDialog(false);
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
                <div style={{ paddingLeft: 56, marginTop: 50 }}>
                    <Button
                        variant="contained"
                        onClick={() => setOpenGuideDialog(true)}
                    >
                        Create your bank
                    </Button>
                </div>
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
                </div>
                {/* <button onClick={() => handleDownloadTemplate()}>
                    Create template file
                </button>
                <button>
                    <input
                        type="file"
                        onChange={handleImportBank}
                        accept=".xlsx"
                    />
                </button> */}
            </div>

            <GuideDialog
                open={openGuideDialog}
                handleClose={handleCloseGuideDialog}
                next={doReRender}
            />
        </>
    );
};

export default Home;

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { importBank } from "../../services/bankServices";
import exampleImg from "../../assets/img/example.png";
import { useSelector } from "react-redux";
export default function GuideDialog(props) {
    const { open, handleClose, next } = props;
    const token = useSelector((state) => state.user.userReducer.accessToken);
    const [scroll, setScroll] = React.useState("paper");

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const handleDownloadTemplate = () => {
        const fileUrl = "/src/assets/template/bank_template.xlsx";
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "template.xlsx";
        link.click();
    };

    const handleImportBank = async (e) => {
        let res = await importBank(e, token);
        handleClose();
        setTimeout(() => {
            console.log("do the reload");
            next();
        }, 1000);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Import guide</DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <div className="step-1 mb-10">
                            <h6 className="text-red-600">
                                *Step 1: Down load file template. Click button
                                below.
                            </h6>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleDownloadTemplate}
                            >
                                {" "}
                                Download
                            </Button>
                        </div>

                        <div className="step-2 mb-10">
                            <h6 className="text-red-600">
                                *Step 2: Edit your bank_template.xlsx file like
                                below example. Your can add more question as you
                                want.
                            </h6>
                            <div className="Sample">
                                <img src={exampleImg} alt="" />
                            </div>
                        </div>

                        <div className="step-3 ">
                            <h6 className="text-red-600">
                                *Step 3: Import your bank_template.xlsx which
                                after adjusted file to add your bank.
                            </h6>
                            <Button variant="">
                                {" "}
                                <input
                                    type="file"
                                    onChange={handleImportBank}
                                    accept=".xlsx"
                                />{" "}
                            </Button>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

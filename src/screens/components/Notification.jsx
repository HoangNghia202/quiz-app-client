import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const Notification = (props) => {
    console.log("props", props);

    const { imageUrl, title, content, type, open, handleClose, next } = props;
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{ textAlign: "center" }}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description"
                    sx={{ width: "200px" }}
                >
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                }}
            >
                {type === "alert" && (
                    <>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleClose}
                        >
                            Disagree
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleClose();
                                next();
                            }}
                            autoFocus
                        >
                            Agree
                        </Button>
                    </>
                )}

                {(type === "correct" || type === "incorrect") && (
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleClose();
                            next();
                        }}
                        autoFocus
                    >
                        Next Question
                    </Button>
                )}

                {type === "end" && (
                    <Button
                        variant="contained"
                        onClick={() => {
                            handleClose();
                            next();
                        }}
                        autoFocus
                    >
                        Continue with other bank
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default Notification;

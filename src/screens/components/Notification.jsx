import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
const Notification = (props) => {
    console.log("props", props);

    const {
        imageUrl,
        title,
        content,
        type,
        open,
        handleClose,
        next,
        otherAction,
    } = props;
    return (
        <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            color="#34495e"
            sx={{ textAlign: "center" }}
        >
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box sx={{ height: 40, width: 40 }}>
                    <img src={imageUrl} alt="" />{" "}
                </Box>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description"
                    sx={{ minWidth: "200px" }}
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
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleClose();
                                next();
                            }}
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
                    <div className="flex justify-between">
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleClose();
                                otherAction();
                            }}
                            color="success"
                            autoFocus
                            sx={{ mr: "10px" }}
                        >
                            Review
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleClose();
                                next();
                            }}
                            autoFocus
                        >
                            other bank
                        </Button>
                    </div>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default Notification;
